import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "boxicons/css/boxicons.min.css";
import "../Blog/AllBlog.css";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllPackageCategorySection = ({ id, category, description, onDelete, categoryId }) => (
  <tr className="border-b border-black text-[0.675rem] sm:text-sm">
    <td className="p-[0.15rem] sm:p-1 md:p-2">{id}</td>
    <td className="p-[0.15rem] sm:p-1 md:p-2">{category}</td>
    <td className="p-[0.15rem] sm:p-1 md:p-2">{description}</td>
    {/* <td className="p-[0.15rem] sm:p-1 md:p-2 text-red-600">
      <a href="">
        <i className="bx bx-edit"></i>
      </a>
    </td> */}
    <td className="p-[0.15rem] sm:p-1 md:p-2 text-red-600">
      <Link to={`/admin/tour/category/edit/${categoryId}`}>
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

const AllCategory = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [allPackagesData, setAllPackagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/admin/tour/category`,  {withCredentials: true});
        setAllPackagesData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleDelete = async (id) => {
    try {
        await axios.delete(`${backendUrl}/api/admin/tour/category/${id}`, {
          withCredentials: true,
        });
        setAllPackagesData(prevData => prevData.filter(item => item._id !== id));
        toast.success("Category deleted successfully.")
      } catch (error) {
        setError(error.message);
        toast.error("Error deleting category.")
      }
  };


  return (
    <div className="home-section flex flex-col items-center justify-center h-screen">
      <div className="bg-white m-5 rounded-sm md:w-4/5 w-full py-10 px-2 md:p-10 overflow-y-auto">
        <h1 className="text-[1.5rem] sm:text-3xl font-semibold">All Package Categories</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-separate" style={{ borderSpacing: "0 10px" }}>
              <thead>
                <tr>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">S.No</th>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Categories</th>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Description</th>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Edit</th>
                  <th className="p-[0.15rem] sm:p-2 text-left text-[11px] sm:text-[16px]">Delete</th>
                </tr>
              </thead>
              <tbody>
                {allPackagesData.map((item, index) => (
                  <AllPackageCategorySection
                    key={item._id}
                    id={index + 1}
                    category={item.category}
                    description={item.description}
                    onDelete={() => handleDelete(item._id)}
                    categoryId ={item._id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCategory;
