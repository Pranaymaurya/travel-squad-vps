import PropTypes from "prop-types";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HotelCard({ hotel, filters }) {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSearch = () => {
    navigate(`/hotel/${hotel._id}`, { state: filters });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow bg-white mb-4 flex flex-col md:flex-row justify-between">
      <div className="flex flex-col md:flex-row md:items-center">
        <img
          src={`${backendUrl}${hotel.imageUrl}`}
          alt={`Image of ${hotel.name}`}
          className="h-32 w-full md:h-24 md:w-24 object-cover rounded-lg md:mr-4 mb-3 md:mb-0"
        />
        <div>
          <h3 className="font-bold text-lg">{hotel.name}</h3>
          <div className="flex items-center mt-1">
            <span className="text-sm bg-green-100 text-green-800 font-semibold py-1 px-2 rounded mr-2">
              {hotel.rating} / 5
            </span>
            <span className="text-sm text-gray-500">
              ({hotel.reviewCount} ratings)
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {hotel.location} | {hotel.distance}
          </p>
          <p className="text-sm mt-2">{hotel.category}</p>
          <p className="text-sm">{hotel.star} Star {hotel.type} </p>
        </div>
      </div>
      <div className="text-center md:text-right mt-4 md:mt-0 md:ml-4 flex flex-col justify-center">
        <p className="text-red-500 text-sm line-through">
          ₹{(hotel.price * 1.1).toFixed(2)}
        </p>
        <p className="text-lg font-bold text-blue-500">
          ₹{hotel.price}
        </p>
        <p className="text-sm text-gray-500">
          + ₹{hotel.taxes} (Taxes & Charges)
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

HotelCard.propTypes = {
  hotel: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    distance: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    star: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    reviewCount: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    taxes: PropTypes.number.isRequired,
  }).isRequired,
  filters: PropTypes.object.isRequired,
};

function HotelList({ filters }) {
  const backendUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL, []);
  const [hotelData, setHotelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHotels = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${backendUrl}/api/hotel`, { withCredentials: true, params: filters });
      setHotelData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hotel data:", error);
      setError(error.response?.data?.message || "Failed to load available hotels. Please try again later.");
      setLoading(false);
    }
  }, [backendUrl, filters]);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  return (
    <div className="w-full p-4">
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2">Loading available hotels...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : hotelData.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg font-semibold">No hotels available matching your filters</p>
          <p className="mt-2 text-gray-500">Try adjusting your filters to see more options</p>
        </div>
      ) : (
        hotelData.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} filters={filters} />)
      )}
    </div>
  );
}

HotelList.propTypes = {
  filters: PropTypes.object.isRequired,
};

export default HotelList;
