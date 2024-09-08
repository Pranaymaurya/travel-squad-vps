import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import "./AllUser.css";
import { toast } from "react-toastify";

// Component for displaying a single blog row
const UserSection = ({ id, name, email, date, onDelete, userId }) => (
  <tr className="border-b border-black text-[0.675rem] sm:text-sm">
    <td className="p-[0.15rem] sm:p-1 md:p-2">{id}</td>
    <td className="p-[0.15rem] sm:p-1 md:p-2">{name}</td>
    <td className="p-[0.15rem] sm:p-1 md:p-2">{email}</td>
    <td className="p-[0.15rem] sm:p-1 md:p-2">{date}</td> 
    {/* <td className="p-[0.15rem] sm:p-1 md:p-2 text-red-600">
      <Link to={`/admin/blog/AllUser/edit/${blogId}`}>
        <i className="bx bx-edit"></i>
      </Link>
    </td> */}
    <td className="p-[0.15rem] sm:p-2 text-red-600">
      <button onClick={onDelete}>
        <i className="bx bx-trash"></i>
      </button>
    </td>
  </tr>
);

// Main component for displaying all blogs
const AllUser = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch blogs from the API
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/admin/user/alluser`, {
          withCredentials: true,
        });
        setUsers(data);
        setLoading(false);

      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/api/admin/user/${id}`, {
        withCredentials: true,
      });
      // Update the state to remove the deleted blog
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully")
    } catch (error) {
      setError(error.message);
      toast.error("Error deleting User")
    }
  };

  return (
    <div className="home-section flex flex-col items-center justify-center h-screen">
      <div className="bg-white m-5 rounded-sm md:w-4/5 w-full py-10 px-2 md:p-10 overflow-y-auto">
        <h1 className="text-[1.5rem] sm:text-3xl font-semibold">All Users</h1>
        <p className="mb-3 text-[11px] sm:text-[16px]">
          
        </p>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="overflow-x-auto">
            
            <table className="w-full border-separate" style={{ borderSpacing: "0 10px" }}>
              <thead>
                <tr>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">#</th>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Name</th>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Email</th>
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Date</th>
                  {/* <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Edit</th> */}
                  <th className="p-[0.15rem] sm:p-1 md:p-2 text-left text-[11px] sm:text-[16px]">Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <UserSection
                    key={user._id}
                    id={index + 1}
                    name={user.name}
                    email={user.email}
                    date={new Date(user.createdAt).toLocaleDateString()}
                    onDelete={() => handleDelete(user._id)} 
                    userId={user._id}
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

export default AllUser;
