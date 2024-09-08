import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const HotelSection = ({ hotel, index, id, onDelete }) => (
  <tr className="border-b border-black text-[0.675rem] sm:text-sm">
    <td className="p-[0.15rem] sm:p-1 md:p-2 ">{index}</td>
    <td className="p-[0.15rem] sm:p-1 md:p-2 ">{hotel.name}</td>
    <td className="p-[0.15rem] sm:p-1 md:p-2 ">{hotel.location}</td>
    <td className="p-[0.15rem] sm:p-1 md:p-2  text-green-600">
      <a href={`/admin/hotel/allhotel/${id}`}>
        <i className='bx bx-low-vision'></i>
      </a> 
    </td>
    <td className="p-[0.15rem] sm:p-1 md:p-2 text-red-600">
      <Link to={`/admin/hotel/edit/${id}`}>
        <i className="bx bx-edit"></i>
      </Link>
    </td>
    <td className="p-[0.15rem] sm:p-2 text-red-600 ">
      <button onClick={onDelete}>
        <i className="bx bx-trash"></i>
      </button>
    </td>
  </tr>
);

const AllHotel = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/admin/hotel/allhotel`,  {withCredentials: true});
        setHotels(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/admin/hotel/allhotel/${id}`, {
        withCredentials: true,
      });
      setHotels(hotels.filter((hotel) => hotel._id !== id));
      toast.success("Hotel deleted successfully.")
    } catch (error) {
      setError(error.message);
      toast.error("Error deleting hotel.")
    }
  };

  let index = 1;

  return (
    <div className="home-section flex flex-col items-center justify-center h-screen">
      <div className="bg-white m-5 rounded-sm md:w-4/5 w-full py-10 px-2 md:p-10 overflow-y-auto">
        <h1 className="text-[1.5rem] sm:text-3xl font-semibold">All Hotels</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-separate" style={{ borderSpacing: "0 10px" }}>
              <thead>
                <tr>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">S No.</th>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Name</th>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Location</th>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">View</th>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Edit</th>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Delete</th>
                </tr>
              </thead>
              <tbody>
                {hotels.map((hotel) => 
                  
                    <HotelSection 
                      key={hotel._id}
                      index={index++}
                      hotel = {hotel}
                      id={hotel._id}
                      onDelete={() => handleDelete(hotel._id)}
                    />
                 
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllHotel;
