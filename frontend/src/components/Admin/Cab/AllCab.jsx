import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CabSection = ({ cab, index, id, onDelete }) => (
  <tr className="border-b border-black text-[0.675rem] sm:text-sm">
    <td className="p-[0.15rem] sm:p-1 md:p-2 ">{index}</td>
    <td className="p-[0.15rem] sm:p-1 md:p-2 ">{cab.model}</td>
    <td className="p-[0.15rem] sm:p-1 md:p-2 ">{cab.type}</td>
    {/* <td className="p-[0.15rem] sm:p-1 md:p-2  text-green-600">
      <a href={`/admin/cab/allcab/booking/${id}`}>
        <i className='bx bx-low-vision'></i>
      </a>
    </td> */}
    <td className="p-[0.15rem] sm:p-1 md:p-2 text-red-600">
      <Link to={`/admin/cab/edit/${id}`}>
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

const AllCab = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/admin/cab/allcab`, {withCredentials: true});
        setCabs(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCabs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/admin/cab/allcab/${id}`, {
        withCredentials: true, 
      });
      setCabs(cabs.filter((cab) => cab._id !== id));
      toast.success("Cab deleted successfully.")
    } catch (error) {
      setError(error.message);
      toast.error("Error deleting cab.")
    }
  };

  let index = 1;

  return (
    <div className="home-section flex flex-col items-center justify-center h-screen">
      <div className="bg-white m-5 rounded-sm md:w-4/5 w-full py-10 px-2 md:p-10 overflow-y-auto">
        <h1 className="text-[1.5rem] sm:text-3xl font-semibold">All Cabs</h1>
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
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Model</th>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Type</th>
                  {/* <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">View</th> */}
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Edit</th>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Delete</th>
                </tr>
              </thead>
              <tbody>
                {cabs.map((cab) => 
                  
                    <CabSection 
                      key={cab._id}
                      index={index++}
                      cab = {cab}
                      id={cab._id}
                      onDelete={() => handleDelete(cab._id)}
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

export default AllCab;
