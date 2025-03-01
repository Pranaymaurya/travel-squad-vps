import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/users/profile`, {
          withCredentials: true,
        });
        setUser(data);
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
    navigate(user ? "/account" : "/login");
  };

  return (
    <>
      {/* **Top Navbar** */}
      <nav className="bg-white border-b-2 border-gray-300 dark:bg-white">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto p-4">
          {/* **Logo Section** */}
          <div className="rounded-lg overflow-hidden w-24 md:w-32 h-[3rem] md:h-[4rem]">
            <a href="/">
              <img className="w-full h-full object-cover" src={logo} alt="Logo" />
            </a>
          </div>

          {/* **Admin Panel Button** */}
          {user?.isAdmin && (
            <Link to="/admin">
              <button className="bg-blue-500 text-white border-2 border-blue-500 rounded-full px-4 py-2 shadow-md hover:bg-blue-700 hover:border-blue-700 transition duration-300">
                Go to Admin Panel
              </button>
            </Link>
          )}

          {/* **User Authentication Button** */}
          <div className="flex items-center space-x-6">
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

      {/* **Bottom Navigation Bar** */}
      <nav className="bg-white border-b-2 border-gray-300">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* **Hamburger Menu for Mobile** */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-hamburger"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
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

          {/* **Navigation Links** */}
          <div className={`${menuOpen ? "block" : "hidden"} md:flex md:w-auto m-auto`} id="navbar-hamburger">
            <ul className="flex flex-col md:flex-row md:space-x-8 font-medium mt-4 md:mt-0">
              {[
                { path: "/", label: "Home" },
                { path: "/tour", label: "Tour Packages" },
                { path: "/cab", label: "Cabs" },
                { path: "/hotel", label: "Hotels" },
                { path: "/blog", label: "Blogs" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-700 hover:text-white transition-all duration-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
