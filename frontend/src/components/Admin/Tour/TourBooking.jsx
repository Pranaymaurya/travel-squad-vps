import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TourBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [sortOrder, setSortOrder] = useState('Newest First');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Backend URL from environment variables
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/admin/tour/booking`, {
          withCredentials: true,
        });
        
        // Transform the booking data to match the expected format
        const formattedBookings = response.data.map(booking => {
          // Format dates from ISO to DD/MM/YYYY HH:MM
          const formatDate = (dateString) => {
            const date = new Date(dateString);
            return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
          };
          
          // Format booking date (just date, no time)
          const formatBookingDate = (dateString) => {
            const date = new Date(dateString);
            return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
          };
          
          return {
            id: booking._id,
            guestName: booking.user ? booking.user.name || "Guest" : "Guest",
            tourName: booking.tour ? booking.tour.name || "Tour" : "Tour",
            bookingDate: formatBookingDate(booking.bookingDate),
            amount: `₹ ${booking.ammount ? booking.ammount.toFixed(2) : "0.00"}`,
            status: booking.status || "Pending",
            createdAt: formatDate(booking.createdAt)
          };
        });
        
        setBookings(formattedBookings);
      } catch (error) {
        console.error("Failed to fetch tour bookings", error);
        setError("Failed to fetch tour bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
      fetchBookings();
  }, [backendUrl]);

  // Update booking status
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.put(
        `${backendUrl}/api/tour/booking/update/status/${bookingId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      
      // Update local state after successful API call
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: newStatus } 
            : booking
        )
      );
    } catch (error) {
      console.error("Failed to update booking status", error);
      alert("Failed to update booking status. Please try again.");
    }
  };

  // Filtered bookings
  const filteredBookings = bookings
    .filter((booking) => 
      booking.id.includes(searchTerm) ||
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tourName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((booking) => 
      statusFilter === 'All Statuses' || booking.status.toLowerCase() === statusFilter.toLowerCase()
    )
    .sort((a, b) => {
      // Parse dates for comparison
      const dateA = new Date(a.createdAt.split(' ')[0].split('/').reverse().join('-') + ' ' + a.createdAt.split(' ')[1]);
      const dateB = new Date(b.createdAt.split(' ')[0].split('/').reverse().join('-') + ' ' + b.createdAt.split(' ')[1]);
      
      return sortOrder === 'Newest First' 
        ? dateB - dateA
        : dateA - dateB;
    });

  if (loading) {
    return <div className="p-6 ml-14">Loading tour bookings data...</div>;
  }

  if (error) {
    return <div className="p-6 ml-14 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 ml-14">
      <h1 className="text-2xl font-bold mb-6">Tour Bookings Management</h1>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by ID, guest name, or tour name"
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border border-gray-300 rounded-md p-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Cancelled</option>
        </select>

        <select
          className="border border-gray-300 rounded-md p-2"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option>Newest First</option>
          <option>Oldest First</option>
        </select>
      </div>

      <p className="text-gray-500 mb-4">Showing {filteredBookings.length} tour bookings</p>

      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-left">
              <th className="py-3 px-4 font-medium">Booking ID</th>
              <th className="py-3 px-4 font-medium">Guest Name</th>
              <th className="py-3 px-4 font-medium">Tour Name</th>
              <th className="py-3 px-4 font-medium">Booking Date</th>
              <th className="py-3 px-4 font-medium">Amount</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Created At</th>
              <th className="py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-t">
                  <td className="py-3 px-4">{booking.id}</td>
                  <td className="py-3 px-4">{booking.guestName}</td>
                  <td className="py-3 px-4">{booking.tourName}</td>
                  <td className="py-3 px-4">{booking.bookingDate}</td>
                  <td className="py-3 px-4">{booking.amount}</td>
                  <td className="py-3 px-4">
                    <select
                      className={`px-2 py-1 rounded text-sm border ${
                        booking.status.toLowerCase() === 'confirmed' ? 'bg-green-100 border-green-300' :
                        booking.status.toLowerCase() === 'cancelled' ? 'bg-red-100 border-red-300' :
                        'bg-yellow-100 border-yellow-300'
                      }`}
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">{booking.createdAt}</td>
                  <td className="py-3 px-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-8 text-center text-gray-500">
                  No tour bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TourBooking;