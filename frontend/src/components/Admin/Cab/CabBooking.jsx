import React, { useState, useEffect } from 'react';
import axios from 'axios';

const  Bookingcab = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [sortOrder, setSortOrder] = useState('Newest First');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [cab, setCab] = useState(null);
  
  // Backend URL from environment variables
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/users/profile`, {
          withCredentials: true,
        });
        setUser(data);
      } catch (error) {
        console.error("User not authenticated", error);
        setUser(null);
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [backendUrl]);

  // Fetch cab data if user exists
  useEffect(() => {
    const fetchCab = async () => {
      if (!user?._id) return;
      
      try {
        const response = await axios.get(`${backendUrl}/api/cab/user/${user._id}`, {
          withCredentials: true,
        });
        
        const cabData = response.data;
        if (cabData) {
          setCab(cabData);
        }
      } catch (error) {
        console.error("Failed to fetch cab data", error);
        setError("Failed to fetch cab data. Please try again later.");
      }
    };
    
    if (user) {
      fetchCab();
    }
  }, [user, backendUrl]);

  // Fetch bookings when cab is loaded
  useEffect(() => {
    const fetchBookings = async () => {
      if (!cab?._id) return;
      
      try {
        const response = await axios.get(`${backendUrl}/api/cab/booking/cabBook/${cab._id}`, {
          withCredentials: true,
        });
        
        // Transform the booking data to match the expected format
        const formattedBookings = response.data.map(booking => {
          // Format dates from ISO to DD/MM/YYYY HH:MM
          const formatDate = (dateString) => {
            const date = new Date(dateString);
            return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
          };
          
          return {
            id: booking._id,
            guestName: booking.user ? booking.user.name || "Guest" : "Guest",
            pickupLocation: booking.pickupLocation || "N/A",
            dropoffLocation: booking.dropoffLocation || "N/A",
            pickupTime: booking.pickupTime || "N/A",
            totalAmount: `₹ ${booking.totalAmount ? booking.totalAmount.toFixed(2) : "0.00"}`,
            status: booking.status || "Pending",
            createdAt: formatDate(booking.createdAt)
          };
        });
        
        setBookings(formattedBookings);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
        setError("Failed to fetch bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    if (cab) {
      fetchBookings();
    }
  }, [cab, backendUrl]);

  // Update booking status
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.put(
        `${backendUrl}/api/cab/booking/${bookingId}`,
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
      booking.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.dropoffLocation.toLowerCase().includes(searchTerm.toLowerCase())
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
    return <div className="p-6 ml-14">Loading cab bookings data...</div>;
  }

  if (error) {
    return <div className="p-6 ml-14 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 ml-14">
      <h1 className="text-2xl font-bold mb-6">Cab Bookings Management</h1>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by ID, guest name, pickup or dropoff location"
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

      <p className="text-gray-500 mb-4">Showing {filteredBookings.length} cab bookings</p>

      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-left">
              <th className="py-3 px-4 font-medium">Booking ID</th>
              <th className="py-3 px-4 font-medium">Guest Name</th>
              <th className="py-3 px-4 font-medium">Pickup Location</th>
              <th className="py-3 px-4 font-medium">Dropoff Location</th>
              <th className="py-3 px-4 font-medium">Pickup Time</th>
              <th className="py-3 px-4 font-medium">Total Amount</th>
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
                  <td className="py-3 px-4">{booking.pickupLocation}</td>
                  <td className="py-3 px-4">{booking.dropoffLocation}</td>
                  <td className="py-3 px-4">{booking.pickupTime}</td>
                  <td className="py-3 px-4">{booking.totalAmount}</td>
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
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
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
                <td colSpan="9" className="py-8 text-center text-gray-500">
                  No cab bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookingcab;