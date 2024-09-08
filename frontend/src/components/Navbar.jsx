import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify"; 

const Navbar = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle menu visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/users/profile`,{ withCredentials: true }); // Endpoint to fetch user profile
        setUser(data); // Assuming response contains user data when authenticated
      } catch (error) {
        console.error("Not authenticated");
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/users/logout`, {}, { withCredentials: true });
      window.location.reload();
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error logging out.");
    }
  };

  const handleAccountClick = () => {
    if (user) {
      // Navigate to the user's account page if logged in
      navigate("/account");
    } else {
      // Navigate to the login page if not logged in
      navigate("/login");
    }
  };

  return (
    <>
    
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="rounded-lg overflow-hidden w-24 md:w-32 h-[3rem] md:h-[4rem]">
            <a href="/">
              <img className="w-full h-full object-cover" src={logo} alt="Logo" />
            </a>
          </div>
          {user?.isAdmin === true && (
            <Link to={"/admin"}>
             <button
             //onClick={handleAdmin}
             className="bg-blue-500 text-white border-2 border-blue-500 rounded-full px-4 py-2 shadow-md hover:bg-blue-700 hover:border-blue-700 transition duration-300"
           >
             Go to amdin panel
           </button>
            </Link>
          )}
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-green-500 text-white border-2 border-green-500 rounded-full px-4 py-2 shadow-md hover:bg-green-700 hover:border-green-700 transition duration-300"
              >
                Logout {user.firstName}
              </button>
            ) : (
              <button
                onClick={handleAccountClick}
                className="bg-green-500 text-white border-2 border-green-500 rounded-full px-4 py-2 shadow-md hover:bg-green-700 hover:border-green-700 transition duration-300"
              >
                <i className="bx bxs-user pr-2"></i> Login
              </button>
            )}
          </div>
        </div>
      </nav>
   
    <nav >
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 px-12">
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="md:hidden inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-hamburger"
      aria-expanded={menuOpen}
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>
    <div className={`${menuOpen ? "block" : "hidden"} w-full md:flex md:w-auto m-auto`} id="navbar-hamburger">
      <ul className="flex flex-col md:flex-row md:space-x-8 font-medium mt-4 md:mt-0 rounded-lg bg-gray dark:bg-gray-800 dark:border-gray-700 md:bg-transparent md:dark:bg-transparent">
      <li>
          <a href="/" className="block py-2 px-1 text-gray-900 rounded hover:bg-blue-700 hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Home</a>
        </li>
        <li>
          <a href="/tour" className="block py-2 px-1 text-gray-900 rounded hover:bg-blue-700 hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Tour Packages</a>
        </li>
        <li>
          <a href="/cab" className="block py-2 px-1 text-gray-900 rounded hover:bg-blue-700 hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Cabs</a>
        </li>
        <li>
          <a href="/hotel" className="block py-2 px-1 text-gray-900 rounded hover:bg-blue-700 hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Hotels</a>
        </li>
        <li>
          <a href="/blog" className="block py-2 px-1 text-gray-900 rounded hover:bg-blue-700 hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Blogs</a>
        </li>
      </ul>
    </div>
  </div>
</nav>




    </>
  );
};

export default Navbar;
