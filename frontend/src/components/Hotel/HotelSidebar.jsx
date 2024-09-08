import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { GrFormNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function HotelSidebar({ filters, setFilters }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

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
    navigate('/h', { state: filters });
    console.log(filters);
  };


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="absolute ">
        {/* <FontAwesomeIcon icon={faTimes} className="" onClick={toggleSidebar} /> */}
      </div>

      <button
        className="md:hidden absolute mt- bg-blue- w-52 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={toggleSidebar}
      >
        Show Filters
      </button>

      <div
        className={`absolute md:relative z-30 md:z-auto ${
          isSidebarOpen ? "block" : "hidden"
        } md:block bg-white w-full md:w-1/4 p-4 shadow-lg md:shadow-none`}
      >
        <h2 className="font-bold text-lg mb-4">Filters</h2>
        <div className="space-y-3">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div className="space-y-3">
            {/* <label className="block text-gray-700 text-sm font-bold mb-2">
              Price Range
            </label>
            <select 
            name="priceRange"
            value={filters.priceRange}
            onChange={handleChange}
            className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm">
              <option>1000-2000</option>
              <option>2000-4000</option>
              <option>4000-6500 </option>
              <option>6500-8000</option>
              <option>8000+</option>
            </select> */}
            <label className="block text-gray-700 text-sm font-bold space-y-3">
              your budget
            </label>
            <div className="flex justify-center items-center">
              <div>
                <input
                  type="number"
                  name="minBudget"
                  value={filters.minBudget}
                  onChange={handleChange}
                  className="w-[100px] border p-1"
                  placeholder="min"
                />
              </div>
              <span className="mx-2 text-center">to</span>
              <div>
                <input
                  type="number"
                  name="maxBudget"
                  value={filters.maxBudget}
                  onChange={handleChange}
                  className="w-[100px] border p-1"
                  placeholder="max"
                />
              </div>

              {/* <span className="bg-black px-4 py-2 cursor-pointer  rounded-md ml-2">
                <FontAwesomeIcon icon={faArrowRight} className="text-white" />
              </span> */}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-3">
              Star Rating
            </label>
            <select
              name="starRating"
              value={filters.starRating}
              onChange={handleChange}
              className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option>--Select--</option>
              <option>1 Star</option>
              <option>2 Star</option>
              <option>3 Star</option>
              <option>4 Star</option>
              <option>5 Star</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Guest Rating
            </label>
            <select
              name="guestRating"
              value={filters.guestRating}
              onChange={handleChange}
              className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option>--Select--</option>
              <option>Excellent (4.5+)</option>
              <option>Very Good (4.0+)</option>
              <option>Good (3.5+)</option>
              <option>Pleasant (3.0+)</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              property type
            </label>
            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleChange}
              className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option>--Select--</option>
              <option>Hotel</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Resort</option>
              <option>Camp</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Amenities
            </label>
            <select
              name="amenities"
              value={filters.amenities}
              onChange={handleChange}
              className="form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option>--Select--</option>
              <option>Wifi</option>
              <option>Swimming pool</option>
              <option>spa</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Hotel Facilities
            </label>
            <div className="flex flex-col space-y-2">
              <label>
                <input
                  type="checkbox"
                  name="pool"
                  checked={filters.facilities.includes("pool")}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />{" "}
                Pool
              </label>
              <label>
                <input
                  type="checkbox"
                  name="spa"
                  checked={filters.facilities.includes("spa")}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Spa
              </label>
              <label>
                <input
                  type="checkbox"
                  name="gym"
                  checked={filters.facilities.includes("gym")}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                Gym
              </label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className=" mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
        <button
          className="md:hidden mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleSidebar}
        >
          Close Filters
        </button>
      </div>
    </>
  );
}


HotelSidebar.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default HotelSidebar;
