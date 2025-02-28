import HotelCard from "../HotelCard";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const AllHotels = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [hotelData, setHotelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHotels = useCallback(async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/hotel`, { withCredentials: true });
      setHotelData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load hotels. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  return (
    <div className="bg-gray-100">
      <div className="popular w-[90%] mx-auto p-4">
        <hr className="my-4" />
        
        {loading && <p className="text-center text-gray-600">Loading hotels...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {hotelData.length > 0 ? (
              hotelData.map((hotel) => <HotelCard key={hotel._id} hotel={hotel} />)
            ) : (
              <p className="text-center col-span-full text-gray-500">No hotels found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllHotels;
