import PropTypes from "prop-types";
import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
 
function CabCard({ cab, filters, setFilters }) {

  const navigate = useNavigate();

  const handleSearch = () => {
    console.log(filters)
    navigate(`/cab/booking/${cab._id}`, { state: filters });
  };


  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow bg-white mb-4 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center">
        <img
          //src={cab.imageUrl}
          src={`${backendUrl}${cab.imageUrl}`}
          alt={`Image of ${cab.model}`}
          className="h-24 w-24 object-cover rounded-lg mr-4"
        />
        <div>
          <h3 className="font-bold text-lg">{cab.model}</h3>
          <div className="flex items-center mt-1">
            <span className="text-sm bg-green-100 text-green-800 font-semibold py-1 px-2 rounded mr-2">
              {cab.rating} / 5
            </span>
            <span className="text-sm text-gray-500">
              ({cab.reviewCount} ratings)
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {cab.type} • AC • {cab.seats} Seats • {cab.kmsIncluded} kms included
          </p>
          <p className="text-sm mt-2">Large Car</p>
          <div className="flex items-center mt-2">
            <div className="flex items-center mr-4">
              <i className="fa fa-map-marker-alt text-blue-500 mr-1"></i>
              <p className="text-sm">
                Extra km fare ₹{cab.extraKmFare}/km after {cab.kmsIncluded} kms
              </p>
            </div>
            <div className="flex items-center mr-4">
              <i className="fa fa-gas-pump text-blue-500 mr-1"></i>
              <p className="text-sm">Fuel Type: {cab.fuelType}</p>
            </div>
            <div className="flex items-center">
              <i className="fa fa-times-circle text-blue-500 mr-1"></i>
              <p className="text-sm">Cancellation: {cab.cancellation}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-right mt-4 md:mt-0">
        <p className="text-red-500 text-sm line-through">
          ₹{cab.originalPrice}
        </p>
        <p className="text-lg font-bold text-blue-500">
          ₹{cab.discountedPrice}
        </p>
        <p className="text-sm text-gray-500">
          + ₹{cab.taxes} (Taxes & Charges)
        </p>
        <button onClick={handleSearch} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          BOOK NOW
        </button>
      </div>
    </div>
  );
}
 
CabCard.propTypes = {
  cab: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    seats: PropTypes.number.isRequired,
    kmsIncluded: PropTypes.number.isRequired,
    extraKmFare: PropTypes.number.isRequired,
    fuelType: PropTypes.string.isRequired,
    cancellation: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviewCount: PropTypes.number.isRequired,
    originalPrice: PropTypes.number.isRequired,
    discountedPrice: PropTypes.number.isRequired,
    taxes: PropTypes.number.isRequired,
  }).isRequired,
};
 
function CabList({ filters, setFilters }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [cabData, setCabData] = useState([]); 

  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/cab`, { withCredentials: true});
        const filteredData = data.filter((cab) => {
          const matchesType =
            !filters.type.length ||
            filters.type.some((type) => type.toLowerCase() === cab.type.toLowerCase());
          const matchesFuelType =
            !filters.fuelType.length ||
            filters.fuelType.some((fuelType) => fuelType.toLowerCase() === cab.fuelType.toLowerCase());
          const matchesSeats =
            !filters.seats.length ||
            filters.seats.includes(String(cab.seats));
          return (
      
            //matchesLocation 
            //&&
           // matchesDate &&
           // matchesHours &&
            //matchesMinutes &&
            matchesType &&
            matchesFuelType &&
           matchesSeats
          );
        });
        setCabData(filteredData);
        //console.log(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCabs();
  }, [filters]);

 
  return (
    <div className="w-full md:w-3/4 m-auto bg-white p-4">
      {Array.isArray(cabData) && cabData.map((cab, index) => (
        <CabCard key={index} cab={cab} filters={filters} />
      ))}
    </div>
  );
}

CabList.propTypes = {
  filters: PropTypes.object.isRequired,
};
 
export default CabList;
 