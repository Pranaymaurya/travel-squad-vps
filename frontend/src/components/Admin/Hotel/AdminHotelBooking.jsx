import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminHotelBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [sortOrder, setSortOrder] = useState('Newest First');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState({});
  
  // Backend URL - replace with your actual backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch bookings when hotel is loaded
  useEffect(() => {
    fetchBookings();
  }, [backendUrl]); // Only depends on backend URL
  
  // Function to fetch bookings - extracted to reuse after status updates
  const fetchBookings = async () => {
    if (!backendUrl) return; // Ensure backend URL is available

    setLoading(true); // Start loading
    setError(null); // Reset errors before fetching

    try {
      const response = await axios.get(`${backendUrl}/api/admin/hotel/booking`, {
        withCredentials: true,
      });

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Invalid data format received");
      }

      const formattedBookings = response.data.map(booking => {
        const formatDate = (dateString) => {
          const date = new Date(dateString);
          return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        };

        return {
          id: booking._id,
          guestName: booking.user?.name || "Guest",
          roomType: "Room",
          roomNumber: booking.roomCount ? `${booking.roomCount} rooms` : "N/A",
          checkInDate: booking.checkInDate ? formatDate(booking.checkInDate) : "N/A",
          checkOutDate: booking.checkOutDate ? formatDate(booking.checkOutDate) : "N/A",
          totalPrice: `₹ ${booking.ammount ? booking.ammount.toFixed(2) : "0.00"}`,
          status: booking.status || "Pending",
          createdAt: formatDate(booking.createdAt)
        };
      });

      setBookings(formattedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to fetch bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle status change
  const handleStatusChange = async (bookingId, newStatus) => {
    // Don't update if the status is the same as current
    const booking = bookings.find(b => b.id === bookingId);
    if (booking.status === newStatus) return;
    
    // Set loading state for this specific booking
    setUpdateLoading(prev => ({ ...prev, [bookingId]: true }));
    
    try {
      await axios.put(
        `${backendUrl}/api/booking/status/${bookingId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      
      // Refresh the bookings list
      await fetchBookings();
      
      // Show success message (you could implement a toast notification here)
      alert(`Booking ${bookingId} status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating booking status:", error);
      setError(`Failed to update booking status. ${error.response?.data?.message || error.message}`);
    } finally {
      setUpdateLoading(prev => ({ ...prev, [bookingId]: false }));
    }
  };

  // Filtered bookings
  const filteredBookings = bookings
    .filter((booking) => 
      booking.id.includes(searchTerm) ||
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.roomNumber && booking.roomNumber.includes(searchTerm))
    )
    .filter((booking) => 
      statusFilter === 'All Statuses' || booking.status === statusFilter
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
    return <div className="p-6 ml-14">Loading bookings data...</div>;
  }

  if (error) {
    return <div className="p-6 ml-14 text-red-500">{error}</div>;
  }

  // Status options and color mapping
  const statusOptions = ['Pending', 'Confirmed', 'Cancelled'];
  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Confirmed': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800',
  };

  return (
    <div className="p-6 ml-14">
      <h1 className="text-2xl font-bold mb-6">Bookings Management</h1>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by ID, guest name, or room number"
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
          {statusOptions.map(status => (
            <option key={status}>{status}</option>
          ))}
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

      <p className="text-gray-500 mb-4">Showing {filteredBookings.length} bookings</p>

      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-left">
              <th className="py-3 px-4 font-medium">Booking ID</th>
              <th className="py-3 px-4 font-medium">Guest Name</th>
              <th className="py-3 px-4 font-medium">Room</th>
              <th className="py-3 px-4 font-medium">Check-in Date</th>
              <th className="py-3 px-4 font-medium">Check-out Date</th>
              <th className="py-3 px-4 font-medium">Total Price</th>
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
                  <td className="py-3 px-4">{booking.roomNumber}</td>
                  <td className="py-3 px-4">{booking.checkInDate}</td>
                  <td className="py-3 px-4">{booking.checkOutDate}</td>
                  <td className="py-3 px-4">{booking.totalPrice}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusColors[booking.status] || 'bg-gray-100 text-gray-800'}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{booking.createdAt}</td>
                  <td className="py-3 px-4 flex items-center">
                    <button className="text-blue-500 hover:text-blue-700 mr-4">
                      View
                    </button>
                    <div className="relative">
                      <select
                        className="border border-gray-300 rounded-md p-1 text-sm bg-white"
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        disabled={updateLoading[booking.id]}
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      {updateLoading[booking.id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                          <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-8 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHotelBooking;