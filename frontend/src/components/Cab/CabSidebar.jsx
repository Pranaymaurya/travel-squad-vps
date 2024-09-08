import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function CabSidebar({ filters, setFilters }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Determine which field we are updating
    if (type === "checkbox") {
      const currentValues = filters[name] ? filters[name].split(",") : [];
      if (checked) {
        // Add the new value if it's not already included
        if (!currentValues.includes(value)) {
          setFilters({
            ...filters,
            [name]: [...currentValues, value].join(","),
          });
        }
      } else {
        // Remove the value if unchecked
        const updatedValues = currentValues.filter(item => item !== value);
        setFilters({
          ...filters,
          [name]: updatedValues.join(","),
        });
      }
    }
    console.log(filters)
  };

  const handleTypeChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => {
      const type = checked
        ? [...prevFilters.type, name]
        : prevFilters.type.filter((item) => item !== name);
      return { ...prevFilters, type };
    });
    console.log(filters)
  };

  const handleFuelChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => {
      const fuelType = checked
        ? [...prevFilters.fuelType, name]
        : prevFilters.fuelType.filter((item) => item !== name);
      return { ...prevFilters, fuelType };
    });
    console.log(filters)
  };

  const handleSeatChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => {
      const seats = checked
        ? [...prevFilters.seats, name]
        : prevFilters.seats.filter((item) => item !== name);
      return { ...prevFilters, seats };
    });
    console.log(filters)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/c', { state: filters });
    console.log(filters);
  };

  return (
    <>
      <button
        className="md:hidden absolute mt-2 bg-blue-500 w-52 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={toggleSidebar}
      >
        Show Filters
      </button>

      <div
        className={`absolute md:relative z-30 md:z-auto ${
          isSidebarOpen ? "block" : "hidden"
        } md:block bg-white w-full md:w-1/4 p-4 shadow-lg md:shadow-none`}
      >
        <h2 className="font-bold text-lg mb-4">Select Filters</h2>
        <div className="space-y-6">
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Car Type
            </label>
            <div className="flex flex-col space-y-2">
              <label>
                <input
                  type="checkbox"
                  name="SUV"
                  checked={filters.type.includes("SUV")}
                  onChange={handleTypeChange}
                  className="mr-2"
                />{" "}
                SUV
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Sedan"
                  checked={filters.type.includes("Sedan")}
                  onChange={handleTypeChange}
                  className="mr-2"
                />
                Sedan
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Hatchback"
                  checked={filters.type.includes("Hatchback")}
                  onChange={handleTypeChange}
                  className="mr-2"
                />
              Htachback
              </label>
            </div>
         
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Fuel Type
            </label>
            <div className="flex flex-col space-y-2">
              <label>
                <input
                  type="checkbox"
                  name="CNG"
                  checked={filters.fuelType.includes("CNG")}
                  onChange={handleFuelChange}
                  className="mr-2"
                />{" "}
                CNG
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Petrol"
                  checked={filters.fuelType.includes("Petrol")}
                  onChange={handleFuelChange}
                  className="mr-2"
                />
                Petrol
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Diesel"
                  checked={filters.fuelType.includes("Diesel")}
                  onChange={handleFuelChange}
                  className="mr-2"
                />
              Diesel
              </label>
            </div>
         
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Seats
            </label>
            <div className="flex flex-col space-y-2">
              <label>
                <input
                  type="checkbox"
                  name="4"
                  checked={filters.seats.includes("4")}
                  onChange={handleSeatChange}
                  className="mr-2"
                />{" "}
                4
              </label>
              <label>
                <input
                  type="checkbox"
                  name="5"
                  checked={filters.seats.includes("5")}
                  onChange={handleSeatChange}
                  className="mr-2"
                />
                5
              </label>
              <label>
                <input
                  type="checkbox"
                  name="6"
                  checked={filters.seats.includes("6")}
                  onChange={handleSeatChange}
                  className="mr-2"
                />
              6
              </label>
              <label>
                <input
                  type="checkbox"
                  name="7"
                  checked={filters.seats.includes("7")}
                  onChange={handleSeatChange}
                  className="mr-2"
                />
              7
              </label>
            </div>
         
          </div>
        </div>
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

CabSidebar.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default CabSidebar;
