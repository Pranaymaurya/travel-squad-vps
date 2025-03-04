import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function CabSidebar({ filters, setFilters }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract filters from query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const initialFilters = {
      type: searchParams.getAll("type") || [],
      fuelType: searchParams.getAll("fuelType") || [],
      seats: searchParams.getAll("seats") || [],
    };
    setFilters(initialFilters);
  }, [location.search, setFilters]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFilterChange = (category, value, checked) => {
    setFilters((prevFilters) => {
      const currentValues = [...prevFilters[category]];

      if (checked) {
        // Add value if checked and not already included
        if (!currentValues.includes(value)) {
          return { ...prevFilters, [category]: [...currentValues, value] };
        }
      } else {
        // Remove value if unchecked
        return {
          ...prevFilters,
          [category]: currentValues.filter((item) => item !== value),
        };
      }

      return prevFilters;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate the query string based on the filters
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach((category) => {
      if (filters[category].length > 0) {
        filters[category].forEach((value) => {
          queryParams.append(category, value);
        });
      }
    });
    navigate(`/c?${queryParams.toString()}`);
    console.log("Applied filters:", filters);

    // On mobile, close the sidebar after applying filters
    if (isSidebarOpen) toggleSidebar();
  };

  return (
    <div className="w-full h-full relative">
      {/* Mobile filter toggle button */}
      <div className="md:hidden flex justify-center items-center h-full">
        <button
          className="md:hidden bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg w-24 mt-5"
          onClick={toggleSidebar}
        >
          Filters
        </button>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar content */}
      <div
        className={`${
          isSidebarOpen ? "fixed inset-0 pt-16" : "hidden"
        } md:block bg-white w-full h-full md:h-auto overflow-y-auto p-4 z-40 md:z-auto md:pt-0`}
      >
        <h2 className="font-bold text-lg mb-4">Select Filters</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Car Type Filters */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Car Type
              </label>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="SUV"
                    checked={filters.type.includes("SUV")}
                    onChange={(e) => handleFilterChange("type", "SUV", e.target.checked)}
                    className="mr-2"
                  />
                  <span>SUV</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="Sedan"
                    checked={filters.type.includes("Sedan")}
                    onChange={(e) => handleFilterChange("type", "Sedan", e.target.checked)}
                    className="mr-2"
                  />
                  <span>Sedan</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="Hatchback"
                    checked={filters.type.includes("Hatchback")}
                    onChange={(e) => handleFilterChange("type", "Hatchback", e.target.checked)}
                    className="mr-2"
                  />
                  <span>Hatchback</span>
                </label>
              </div>
            </div>

            {/* Fuel Type Filters */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Fuel Type
              </label>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="CNG"
                    checked={filters.fuelType.includes("CNG")}
                    onChange={(e) => handleFilterChange("fuelType", "CNG", e.target.checked)}
                    className="mr-2"
                  />
                  <span>CNG</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="Petrol"
                    checked={filters.fuelType.includes("Petrol")}
                    onChange={(e) => handleFilterChange("fuelType", "Petrol", e.target.checked)}
                    className="mr-2"
                  />
                  <span>Petrol</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="Diesel"
                    checked={filters.fuelType.includes("Diesel")}
                    onChange={(e) => handleFilterChange("fuelType", "Diesel", e.target.checked)}
                    className="mr-2"
                  />
                  <span>Diesel</span>
                </label>
              </div>
            </div>

            {/* Seats Filters */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Seats
              </label>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="4"
                    checked={filters.seats.includes("4")}
                    onChange={(e) => handleFilterChange("seats", "4", e.target.checked)}
                    className="mr-2"
                  />
                  <span>4</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="5"
                    checked={filters.seats.includes("5")}
                    onChange={(e) => handleFilterChange("seats", "5", e.target.checked)}
                    className="mr-2"
                  />
                  <span>5</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="6"
                    checked={filters.seats.includes("6")}
                    onChange={(e) => handleFilterChange("seats", "6", e.target.checked)}
                    className="mr-2"
                  />
                  <span>6</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="7"
                    checked={filters.seats.includes("7")}
                    onChange={(e) => handleFilterChange("seats", "7", e.target.checked)}
                    className="mr-2"
                  />
                  <span>7</span>
                </label>
              </div>
            </div>
          </div>

          {/* Apply Filters Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Apply Filters
          </button>
        </form>

        {/* Mobile only close button at the bottom */}
        <button
          className="md:hidden mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          onClick={toggleSidebar}
        >
          Close Filters
        </button>
      </div>
    </div>
  );
}

CabSidebar.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default CabSidebar;
