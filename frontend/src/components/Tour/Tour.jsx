import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { FaStar, FaRegStar, FaCalendarAlt, FaClock, FaRupeeSign, FaSearch } from "react-icons/fa";
import "./TourHero.css";
import vid from "../../assets/video.mp4";

// Star Rating component for visual rating display
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i}>
        {i <= rating ? (
          <FaStar className="text-yellow-500 inline-block" />
        ) : (
          <FaRegStar className="text-yellow-500 inline-block" />
        )}
      </span>
    );
  }
  return <div className="flex">{stars}</div>;
};

// Card component for individual tour cards
const Card = ({ id, name, image, duration, price, location, rating }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <Link to={`/tour/${id}`} className="text-gray-600 hover:text-black no-underline">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg m-4 relative transform hover:scale-105 transition-transform duration-300 flex flex-col h-full">
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src={`${backendUrl}${image}`}
            alt={name}
          />
          <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-blue-500 text-white py-1 px-3 rounded-bl-lg font-medium">
            ₹{price}
          </div>
        </div>
        <div className="p-4 flex-grow">
          <div className="font-bold text-xl mb-2 text-blue-800">{name}</div>
          <div className="flex items-center mb-2 text-gray-600">
            <FaClock className="mr-2 text-blue-500" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center mb-2 text-gray-600">
            <GrLocation className="mr-2 text-blue-500" />
            <span>{location}</span>
          </div>
          <div className="mt-2">
            <StarRating rating={rating} />
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-2 border-t border-gray-100">
          <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

// TourSection component for displaying a section of tours
const TourSection = ({ data, category }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-10">
      <div className="w-[90%] mx-auto p-4">
        <div className="flex items-center mb-8">
          <div className="h-1 bg-blue-500 w-12 mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-800">{category.toUpperCase()}</h2>
          <div className="h-1 bg-blue-500 w-full ml-4"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(data) && data.map((item, i) => (
            <Card
              key={i}
              id={item._id}
              name={item.name}
              image={item.image}
              duration={item.duration}
              price={item.price}
              location={item.location}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Tour component for displaying the tours and search functionality
const Tour = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [tourData, setTourData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState("");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/tour`, { withCredentials: true });
        setTourData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tour data:", error);
        setLoading(false);
      }
    };

    fetchTourData();
  }, []);

  const handleSearch = () => {
    const filtered = tourData.filter(
      (tour) =>
        tour.name.toLowerCase().includes(destination.toLowerCase()) &&
        tour.price <= maxPrice &&
        (selectedDate === "" ||
          (new Date(tour.availableFrom) <= new Date(selectedDate) &&
            new Date(tour.availableTill) >= new Date(selectedDate)))
    );
    setFilteredData(filtered);
  };

  // Group data by tour type, ignoring case
  const groupedData = filteredData.reduce((acc, tour) => {
    const type = tour.type.toLowerCase(); // Normalize case
    acc[type] = acc[type] || [];
    acc[type].push(tour);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="home z-0 relative h-screen">
        <div className="overlay absolute inset-0 bg-black bg-opacity-60 z-10"></div>
        <video
          src={vid}
          muted
          autoPlay
          loop
          type="video/mp4"
          className="absolute inset-0 w-full h-full object-cover"
        ></video>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-white">
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-light uppercase tracking-wider mb-2">
              Discover Your Perfect Getaway
            </h3>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Explore Amazing Destinations
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 w-[90%] max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="w-full">
                <label className="block text-white font-medium mb-2" htmlFor="destination">
                  Destination
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="destination"
                    placeholder="Where do you want to go?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-white bg-opacity-20 border border-gray-300 rounded-lg py-3 px-4 pl-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <GrLocation className="absolute left-3 top-3.5 text-white" />
                </div>
              </div>

              <div className="w-full">
                <label className="block text-white font-medium mb-2" htmlFor="date">
                  Travel Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-white bg-opacity-20 border border-gray-300 rounded-lg py-3 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FaCalendarAlt className="absolute left-3 top-3.5 text-white" />
                </div>
              </div>

              <div className="w-full">
                <label className="block text-white font-medium mb-2">
                  Max Budget: ₹{maxPrice}
                </label>
                <div className="relative mt-2">
                  <input
                    type="range"
                    max="50000"
                    min="1000"
                    step="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span>₹1,000</span>
                    <span>₹50,000</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg font-bold py-3 px-8 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              <FaSearch className="mr-2" />
              Search Tours
            </button>
          </div>
        </div>
      </div>

      {/* Show no results message if no tours found */}
      {Object.keys(groupedData).length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-6">🔍</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">No Tours Found</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            We couldn't find any tours matching your search criteria. Try adjusting your filters or search for something else.
          </p>
        </div>
      )}

      {/* Display tour sections */}
      {Object.keys(groupedData).map((type, index) => (
        <TourSection 
          key={index} 
          data={groupedData[type]} 
          category={type.charAt(0).toUpperCase() + type.slice(1)} 
        />
      ))}
      
      {/* Footer CTA */}
      <div className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready for Your Next Adventure?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Discover amazing destinations and create memories that last a lifetime.
        </p>
        <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300">
          Book Your Tour Today
        </button>
      </div>
    </>
  );
};

export default Tour;