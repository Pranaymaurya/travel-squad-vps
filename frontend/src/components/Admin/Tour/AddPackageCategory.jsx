import React, { useState } from 'react';
import axios from 'axios';
import {toast} from "react-toastify"

const AddPackageCategory = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // // Perform client-side validation if necessary
    // if (!category || !description) {
    //   setError('All fields are required.');
    //   return;
    // }

    // Clear previous messages
    setError(null);

    // Create the data object to send
    const categoryData = {
      category,
      description,
    };

 
    try {
      // Send a POST request to the server using Axios
      const response = await axios.post(`${backendUrl}/api/admin/tour/category`, categoryData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      toast.success("Category added successfully.");

      // Clear the form fields after successful submission
      setCategory('');
      setDescription('');
      setError('');  // Clear any previous error messages
    } catch (err) {
      console.error('Error adding category:', err);

      // Check the error response message and set appropriate toast notification
      if (err.response && err.response.data && err.response.data.message) {
        if (err.response.data.message === 'Category already exists') {
          toast.error("Category already exists.");
        } else {
          toast.error("Error adding category.");
        }
      } else {
        toast.error("Error adding category.");
      }

      setError('Error adding category');
    }
  };

  return (
    <div className="home-section flex flex-col items-center h-screen">
      <div className="bg-white m-5 rounded-sm md:w-4/5 w-full py-10 px-2 md:p-10 overflow-y-auto">
        
      {error && <p className="text-red-500"></p>}<h1 className="text-[1.5rem] sm:text-3xl font-semibold">Add Package Category</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="categoryName">Category Name</label>
            <input
              type="text"
              id="categoryName"
              className="border border-gray-300 rounded-md p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium" htmlFor="description">Description</label>
            <textarea
              id="description"
              className="border border-gray-300 rounded-md p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPackageCategory;
