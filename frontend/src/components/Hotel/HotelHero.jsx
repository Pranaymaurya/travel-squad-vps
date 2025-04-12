import React, { useState } from "react";
import { GrLocation } from "react-icons/gr";
import { FiChevronDown } from "react-icons/fi";
import vid from "../../assets/hotelvideo.mp4";
import { useNavigate } from "react-router-dom";

const HotelHero = () => {
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    checkin: formatDate(new Date()),
    checkout: formatDate(new Date()),
    guests: "",
    price: "",
    location: "",
    minBudget: "",
    maxBudget: "",
    starRating: "",
    guestRating: "",
    propertyType: "",
    amenities: "",
    facilities: [],
  });

  const navigate = useNavigate();

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      location: formData.location,
      checkin: formData.checkin,
      checkout: formData.checkout,
      guests: formData.guests,
      price: formData.price,
      guestrating: formData.guestRating,
      starrating: formData.starRating,
      propertytype: formData.propertyType,
      amenities: formData.amenities,
    }).toString();

    navigate(`/hotels?${queryParams}`);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className="relative z-0">
      <video
        src={vid}
        muted
        autoPlay
        loop
        className="absolute inset-0 w-full h-full object-cover brightness-75"
        type="video/mp4"
      />
      <div className="relative z-10 py-16 bg-black bg-opacity-50">
        <div className="container mx-auto px-4 text-white">
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-wider text-gray-300">Our Hotels</p>
            <h1 className="text-4xl font-extrabold mt-2">Search Your Dream Stay</h1>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-black">
            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-1">City or Location</label>
              <div className="relative">
                <input
                  type="text"
                  id="location"
                  placeholder="Enter city or location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <GrLocation className="absolute top-3 right-3 text-gray-500" />
              </div>
            </div>

            {/* Check-in */}
            <div>
              <label htmlFor="checkin" className="block text-sm font-medium mb-1">Check-In</label>
              <input
                type="date"
                id="checkin"
                value={formData.checkin}
                onChange={handleChange}
                className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Check-out */}
            <div>
              <label htmlFor="checkout" className="block text-sm font-medium mb-1">Check-Out</label>
              <input
                type="date"
                id="checkout"
                value={formData.checkout}
                onChange={handleChange}
                className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Guests */}
            <div>
              <label htmlFor="guests" className="block text-sm font-medium mb-1">Rooms & Guests</label>
              <div className="relative">
                <input
                  type="text"
                  id="guests"
                  placeholder="1 Room, 2 Adults"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full border rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FiChevronDown className="absolute top-3 right-3 text-gray-500" />
              </div>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-1">Price Range</label>
              <input
                type="text"
                id="price"
                placeholder="e.g. ₹0-₹1500"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Star Rating */}
            <div>
              <label htmlFor="starRating" className="block text-sm font-medium mb-1">Star Rating</label>
              <select
                id="starRating"
                value={formData.starRating}
                onChange={handleChange}
                className="w-full border rounded-lg py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">--Select--</option>
                <option value="1">1 Star</option>
                <option value="2">2 Star</option>
                <option value="3">3 Star</option>
                <option value="4">4 Star</option>
                <option value="5">5 Star</option>
              </select>
            </div>

            {/* Guest Rating */}
            <div>
              <label htmlFor="guestRating" className="block text-sm font-medium mb-1">Guest Rating</label>
              <select
                id="guestRating"
                value={formData.guestRating}
                onChange={handleChange}
                className="w-full border rounded-lg py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">--Select--</option>
                <option value="4.5">Excellent (4.5+)</option>
                <option value="4.1">Very Good (4.0+)</option>
                <option value="3.5">Good (3.5+)</option>
                <option value="3.1">Pleasant (3.0+)</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium mb-1">Property Type</label>
              <select
                id="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full border rounded-lg py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">--Select--</option>
                <option value="Hotel">Hotel</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Resort">Resort</option>
                <option value="Camp">Camp</option>
              </select>
            </div>

            {/* Amenities */}
            <div>
              <label htmlFor="amenities" className="block text-sm font-medium mb-1">Amenities</label>
              <select
                id="amenities"
                value={formData.amenities}
                onChange={handleChange}
                className="w-full border rounded-lg py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">--Select--</option>
                <option value="Wifi">WiFi</option>
                <option value="Swimming-Pool">Swimming Pool</option>
                <option value="Spa">Spa</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="text-center mt-8">
          <button
  onClick={handleSearch}
  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-l px-10 py-3 rounded-md transition duration-300 transform hover:scale-105"
>
  SEARCH HOTELS
</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelHero;
