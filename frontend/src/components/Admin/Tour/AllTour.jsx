import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const TourSection = ({ tour, index, id, onDelete }) => (
  <tr className="border-b border-black text-[0.675rem] sm:text-sm">
    <td className="p-[0.15rem] sm:p-1 md:p-2 ">{index}</td>
    <td className="p-[0.15rem] sm:p-1 md:p-2 ">{tour.name}</td>
    <td className="p-[0.15rem] sm:p-1 md:p-2 ">{tour.type}</td>
    <td className="p-[0.15rem] sm:p-1 md:p-2  text-green-600">
      <a href={`/admin/tour/alltour/${id}`}>
        <i className='bx bx-low-vision'></i>
      </a> 
    </td>
    <td className="p-[0.15rem] sm:p-1 md:p-2 text-red-600">
      <Link to={`/admin/tour/edit/${id}`}>
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

const AllTour = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/admin/tour/alltour`,  {withCredentials: true});
        setTours(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/admin/tour/alltour/${id}`, {
        withCredentials: true,
      });
      setTours(tours.filter((tour) => tour._id !== id));
      toast.success("Package deleted successfully.")
    } catch (error) {
      setError(error.message);
      toast.error("Error deleting package.")
    }
  };

  let index = 1;

  return (
    <div className="home-section flex flex-col items-center justify-center h-screen">
      <div className="bg-white m-5 rounded-sm md:w-4/5 w-full py-10 px-2 md:p-10 overflow-y-auto">
        <h1 className="text-[1.5rem] sm:text-3xl font-semibold">All Packages</h1>
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
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Title</th>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Category</th>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">View</th>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Edit</th>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Delete</th>
                </tr>
              </thead>
              <tbody>
                {tours.map((tour) => 
                  
                    <TourSection 
                      key={tour._id}
                      index={index++}
                      tour = {tour}
                      id={tour._id}
                      onDelete={() => handleDelete(tour._id)}
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

export default AllTour;
