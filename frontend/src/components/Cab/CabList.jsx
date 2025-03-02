import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
function CabCard({ cab, filters }) {
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("Booking with filters:", filters);
    navigate(`/cab/booking/${cab._id}`, { state: filters });
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow bg-white mb-4 flex flex-col md:flex-row justify-between">
      <div className="flex flex-col md:flex-row md:items-center">
        <img
          src={`${backendUrl}${cab.imageUrl}`}
          alt={`Image of ${cab.model}`}
          className="h-32 w-full md:h-24 md:w-24 object-cover rounded-lg md:mr-4 mb-3 md:mb-0"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm">
                ₹{cab.extraKmFare}/km after {cab.kmsIncluded} kms
              </p>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm">Fuel: {cab.fuelType}</p>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <p className="text-sm">Cancellation: {cab.cancellation}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center md:text-right mt-4 md:mt-0 md:ml-4 flex flex-col justify-center">
        <p className="text-red-500 text-sm line-through">
          ₹{cab.originalPrice}
        </p>
        <p className="text-lg font-bold text-blue-500">
          ₹{cab.discountedPrice}
        </p>
        <p className="text-sm text-gray-500">
          + ₹{cab.taxes} (Taxes & Charges)
        </p>
        <button 
          onClick={handleSearch} 
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
        >
          BOOK NOW
        </button>
      </div>
    </div>
  );
}
 
CabCard.propTypes = {
  cab: PropTypes.shape({
    _id: PropTypes.string.isRequired,
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
  filters: PropTypes.object.isRequired,
};
 
function CabList({ filters, setFilters }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [cabData, setCabData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCabs = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${backendUrl}/api/cab`, { withCredentials: true });
        
        const filteredData = data.filter((cab) => {
          // Filter by car type
          const matchesType =
            !filters.type.length ||
            filters.type.some((type) => type.toLowerCase() === cab.type.toLowerCase());
          
          // Filter by fuel type
          const matchesFuelType =
            !filters.fuelType.length ||
            filters.fuelType.some((fuelType) => fuelType.toLowerCase() === cab.fuelType.toLowerCase());
          
          // Filter by seats
          const matchesSeats =
            !filters.seats.length ||
            filters.seats.includes(String(cab.seats));
          
          return matchesType && matchesFuelType && matchesSeats;
        });
        
        setCabData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cab data:", error);
        setError("Failed to load available cabs. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchCabs();
  }, [backendUrl, filters]);

  return (
    <div className="w-full p-4">
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2">Loading available cabs...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : cabData.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg font-semibold">No cabs available matching your filters</p>
          <p className="mt-2 text-gray-500">Try adjusting your filters to see more options</p>
        </div>
      ) : (
        Array.isArray(cabData) && cabData.map((cab, index) => (
          <CabCard key={cab._id || index} cab={cab} filters={filters} />
        ))
      )}
    </div>
  );
}

CabList.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};
 
export default CabList;