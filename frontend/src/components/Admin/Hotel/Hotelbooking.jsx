import React, { useState } from 'react';

const BookingDashboard = () => {
    const bookings = [
        {
          id: "67834840e3eb5135ffc8831a",
          guestName: "nafipeffff",
        //   roomType: "Room Deluxe",
          roomNumber: "101",
          checkInDate: "21/01/2025 05:30",
          checkOutDate: "23/01/2025 05:30",
          totalPrice: "₹ 936.00",
          status: "Pending",
          createdAt: "12/01/2025 10:12"
        },
        {
          id: "67820a49976a3ad7f2bee798",
          guestName: "nafipeffff",
        //   roomType: "Room Deluxe",
          roomNumber: "102",
          checkInDate: "21/01/2025 05:30",
          checkOutDate: "23/01/2025 05:30",
          totalPrice: "₹ 936.00",
          status: "Cancelled",
          createdAt: "11/01/2025 11:36"
        },
        {
          id: "678202515e14b8c3219ec6b8",
          guestName: "nafipeffff",
        //   roomType: "Room Premium",
          roomNumber: "201",
          checkInDate: "21/01/2025 00:00",
          checkOutDate: "23/01/2025 00:00",
          totalPrice: "₹ 11280.00",
          status: "Cancelled",
          createdAt: "11/01/2025 11:02"
        },
        {
          id: "6781f8100bad560bd346580e",
          guestName: "Pranay Maurya",
        //   roomType: "Room Deluxe",
          roomNumber: "103",
          checkInDate: "16/01/2025 00:00",
          checkOutDate: "17/01/2025 00:00",
          totalPrice: "₹ 104.00",
          status: "Cancelled",
          createdAt: "11/01/2025 10:18"
        },
        {
          id: "67815094470f3f26bc2784b3",
          guestName: "nafipeffff",
        //   roomType: "Room Premium",
          roomNumber: "202",
          checkInDate: "21/01/2025 05:30",
          checkOutDate: "23/01/2025 05:30",
          totalPrice: "₹ 28200.00",
          status: "Cancelled",
          createdAt: "10/01/2025 22:23"
        },
        {
          id: "67814fd5c2d7d8bc0844e244",
          guestName: "Arpit Sarkar",
        //   roomType: "Room Premium",
          roomNumber: "203",
          checkInDate: "05/02/2025 00:00",
          checkOutDate: "11/02/2025 00:00",
          totalPrice: "₹ 16920.00",
          status: "Pending",
          createdAt: "10/01/2025 21:20"
        },
        {
          id: "6781411b1c00034c3f79c0",
          guestName: "Arpit Sarkar",
        //   roomType: "Room Deluxe",
          roomNumber: "104",
          checkInDate: "01/02/2025 00:00",
          checkOutDate: "04/02/2025 00:00",
          totalPrice: "₹ 3160.00",
          status: "Pending",
          createdAt: "10/01/2025 21:05"
        }
      ];

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [sortOrder, setSortOrder] = useState('Newest First');

  // Filtered bookings
  const filteredBookings = bookings
    .filter((booking) => 
      booking.id.includes(searchTerm) ||
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomNumber.includes(searchTerm)
    )
    .filter((booking) => 
      statusFilter === 'All Statuses' || booking.status === statusFilter
    )
    .sort((a, b) => 
      sortOrder === 'Newest First' 
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

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

      <p className="text-gray-500 mb-4">Showing {filteredBookings.length} bookings</p>

      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-left">
              <th className="py-3 px-4 font-medium">Booking ID</th>
              <th className="py-3 px-4 font-medium">Hotel Name</th>
              <th className="py-3 px-4 font-medium">Room</th>
              <th className="py-3 px-4 font-medium">Check-in Date</th>
              <th className="py-3 px-4 font-medium">Check-out Date</th>
              <th className="py-3 px-4 font-medium">Total Price</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="border-t">
                <td className="py-3 px-4">{booking.id}</td>
                <td className="py-3 px-4">{booking.guestName}</td>
                <td className="py-3 px-4">{booking.roomType} ({booking.roomNumber})</td>
                <td className="py-3 px-4">{booking.checkInDate}</td>
                <td className="py-3 px-4">{booking.checkOutDate}</td>
                <td className="py-3 px-4">{booking.totalPrice}</td>
                <td className="py-3 px-4">{booking.status}</td>
                <td className="py-3 px-4">{booking.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingDashboard;
