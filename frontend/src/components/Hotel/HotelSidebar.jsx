import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

function HotelSidebar({ filters, setFilters }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to extract query parameters and update state
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newFilters = {
      location: searchParams.get("location") || "",
      minBudget: searchParams.get("minBudget") || "",
      maxBudget: searchParams.get("price") || "", // Note: This uses "price" instead of "maxBudget"
      starRating: searchParams.get("starRating") || "",
      guestRating: searchParams.get("guestRating") || "",
      propertyType: searchParams.get("propertyType") || "",
      amenities: searchParams.get("amenities") || "",
      facilities: searchParams.get("facilities") ? searchParams.get("facilities").split(",") : [],
    };
    console.log(newFilters)
    setFilters(newFilters);
  }, [location.search, setFilters]);
  console.log(filters.maxBudget)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => {
      const facilities = checked
        ? [...prevFilters.facilities, name]
        : prevFilters.facilities.filter((facility) => facility !== name);
      return { ...prevFilters, facilities };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        if (Array.isArray(filters[key])) {
          if (filters[key].length > 0) {
            queryParams.set(key, filters[key].join(","));
          }
        } else {
          queryParams.set(key, filters[key]);
        }
      }
    });

    // Fix: rename maxBudget to price in the query params to match the backend expectation
    // if (queryParams.has("maxBudget")) {
    //   const maxBudgetValue = queryParams.get("maxBudget");
    //   queryParams.delete("maxBudget");
    //   queryParams.set("price", maxBudgetValue);
    // }

    console.log("Generated Query String:", queryParams.toString());
    navigate(`/h?${queryParams.toString()}`);
    
    // Close sidebar on mobile after submitting
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Define hotel facilities with proper capitalization
  const facilityOptions = [
    { id: "pool", label: "Swimming Pool" },
    { id: "spa", label: "Spa" },
    { id: "gym", label: "Gym" }
  ];

  return (
    <>
      {/* Mobile toggle button with fixed styling */}
      <button
  className="md:hidden fixed bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
  onClick={toggleSidebar}
>
  Filters
</button>

      {/* Sidebar container with fixed positioning on mobile */}
      <div
        className={`fixed md:static top-0 left-0 h-full md:h-auto z-30 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out md:block bg-white w-64 md:w-1/4 p-5 shadow-lg md:shadow-md overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Filters</h2>
          <button
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={toggleSidebar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Your Budget</label>
            <div className="flex justify-between items-center space-x-2">
              <input
                type="number"
                name="minBudget"
                value={filters.minBudget}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Min"
                min="0"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                name="maxBudget"
                value={filters.maxBudget}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Max"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Star Rating</label>
            <select
              name="starRating"
              value={filters.starRating}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">--Select--</option>
              <option>1 Star</option>
              <option>2 Star</option>
              <option>3 Star</option>
              <option>4 Star</option>
              <option>5 Star</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Guest Rating</label>
            <select
              name="guestRating"
              value={filters.guestRating}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">--Select--</option>
              <option>Excellent (4.5+)</option>
              <option>Very Good (4.0+)</option>
              <option>Good (3.5+)</option>
              <option>Pleasant (3.0+)</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Property Type</label>
            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">--Select--</option>
              <option>Hotel</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Resort</option>
              <option>Camp</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Amenities</label>
            <select
              name="amenities"
              value={filters.amenities}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">--Select--</option>
              <option>Wifi</option>
              <option>Swimming Pool</option>
              <option>Spa</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Hotel Facilities</label>
            <div className="flex flex-col space-y-2">
              {facilityOptions.map((facility) => (
                <label key={facility.id} className="flex items-center">
                  <input
                    type="checkbox"
                    name={facility.id}
                    checked={filters.facilities.includes(facility.id)}
                    onChange={handleCheckboxChange}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{facility.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
          >
            Search
          </button>
          
          <button
            className="md:hidden w-full border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
            onClick={toggleSidebar}
          >
            Close Filters
          </button>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}

HotelSidebar.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default HotelSidebar;