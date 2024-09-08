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
    //city: "",
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
    navigate("/h", { state: formData });
  };


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };


  return (
    <div className="relative z-0">
      <video
        src={vid}
        muted
        autoPlay 
        loop
        className="absolute inset-0 w-full h-full object-cover"
        type="video/mp4"
      ></video>
      <div className="relative z-10 bg-opacity-50 bg-black py-4 ">
        <div className="container mx-auto px-4 py-12 text-white">
          <div className="text-center mb-8">
            <span className="block text-sm">Our hotels</span>
            <h1 className="text-4xl font-bold">Search your hotels</h1>
          </div>
          <div className="bg-white text-black rounded-lg shadow-lg p-4 grid grid-cols-1 md:grid-cols-4 border gap-4">
            <div className="flex flex-col">
              <label htmlFor="city" className="font-semibold text-sm">
                City, Or Location
              </label>
              <div className="flex items-center relative mt-1">
                <input
                  type="text"
                  id="location"
                  placeholder="Enter name here..."
                  className="border rounded p-2 flex-grow"
                  value={formData.location}
                  onChange={handleChange}
                />
                <GrLocation className="icon absolute top-3 right-2 " />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="checkin" className="font-semibold text-sm">
                Check-In
              </label>
              <div className="relative mt-1">
                <input
                  type="date"
                  id="checkin"
                  className="border rounded p-2 w-full"
                  value={formData.checkin}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="checkout" className="font-semibold text-sm">
                Check-Out
              </label>
              <div className="relative mt-1">
                <input
                  type="date"
                  id="checkout"
                  className="border rounded p-2 w-full"
                  value={formData.checkout}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="guests" className="font-semibold text-sm">
                Rooms & Guests
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="guests"
                  placeholder="1 Room 2 Adults"
                  className="border rounded p-2 w-full"
                  value={formData.guests}
                  onChange={handleChange}
                />
                <FiChevronDown className="absolute top-3 right-2 " />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="price" className="font-semibold text-sm">
                Price Per Night
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  id="price"
                  placeholder="₹0-₹1500, ₹1500-₹2500,..."
                  className="border rounded p-2 w-full"
                  value={formData.price}
                  onChange={handleChange}
                />
                <FiChevronDown className="absolute top-3 right-2 " />
              </div>
            </div>
          </div>
          <div className="text-center mt-[-15px]">
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelHero;
