import HotelCard from "../HotelCard";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AllHotels = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [hotelData, sethotelData] = useState([]);

  useEffect(() => { 
    const fetchHotels = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/hotel`, { withCredentials: true});
        sethotelData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="popular w-[90%] mx-auto p-4">
        {/* <h1 className="text-2xl font-bold my-4">Featured Hotels</h1> */}
        <hr className="my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.isArray(hotelData) && hotelData?.map(
            (hotel, i) =>
              (
                <HotelCard key={hotel._id} hotel={hotel} />
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default AllHotels;
