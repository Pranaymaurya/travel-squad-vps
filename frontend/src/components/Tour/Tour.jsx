import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { FaStar, FaRegStar, FaCalendarAlt, FaClock, FaSearch } from "react-icons/fa";
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
const TourCard = ({ id, name, image, duration, price, location, rating }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <Link to={`/tour/${id}`} className="text-gray-600 hover:text-black no-underline">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 flex flex-col h-full">
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src={`${backendUrl}${image}`}
            alt={name}
          />
          <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-600 to-blue-500 text-white py-1 px-3 rounded-bl-lg font-medium">
            ₹{price.toLocaleString()}
          </div>
        </div>
        <div className="p-4 flex-grow">
          <h3 className="font-bold text-xl mb-2 text-blue-800 line-clamp-2">{name}</h3>
          <div className="flex items-center mb-2 text-gray-600">
            <FaClock className="mr-2 text-blue-500 flex-shrink-0" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center mb-2 text-gray-600">
            <GrLocation className="mr-2 text-blue-500 flex-shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <div className="mt-2">
            <StarRating rating={rating} />
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-100">
          <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
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
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <div className="h-1 bg-blue-500 w-12 mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-800">{category}</h2>
          <div className="h-1 bg-blue-500 flex-grow ml-4"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(data) && data.map((item) => (
            <TourCard
              key={item._id}
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
    </section>
  );
};

// Hero section component
const HeroSection = ({ destination, setDestination, maxPrice, setMaxPrice, selectedDate, setSelectedDate, handleSearch }) => {
  return (
    <div className="relative h-screen">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
        <video
          src={vid}
          muted
          autoPlay
          loop
          type="video/mp4"
          className="absolute inset-0 w-full h-full object-cover"
        ></video>
      </div>

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-4 h-full flex flex-col items-center justify-center">
        {/* Heading Section */}
        <div className="text-center mb-10">
          <h3 className="text-xl md:text-2xl font-light uppercase tracking-wider mb-3 text-white">
            Discover Your Perfect Getaway
          </h3>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Explore Amazing Destinations
          </h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-xl p-8 w-full max-w-4xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Destination Field */}
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="destination">
                Destination
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="destination"
                  placeholder="Where do you want to go?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 pl-10 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <GrLocation className="absolute left-3 top-3.5 text-gray-500" />
              </div>
            </div>

            {/* Date Field */}
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="date">
                Travel Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 pl-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaCalendarAlt className="absolute left-3 top-3.5 text-gray-500" />
              </div>
            </div>

            {/* Budget Slider */}
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-2">
                Max Budget: ₹{parseInt(maxPrice).toLocaleString()}
              </label>
              <div className="mt-2">
                <input
                  type="range"
                  max="50000"
                  min="1000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full accent-blue-500 cursor-pointer h-2 rounded-lg appearance-none bg-gray-200"
                />
                <div className="flex justify-between text-xs mt-2 text-gray-600">
                  <span>₹1,000</span>
                  <span>₹50,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Button - Centered */}
          <div className="flex justify-center">
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-lg font-medium py-3 px-12 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 shadow-md"
            >
              <FaSearch className="mr-2" />
              Search Tours
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Empty state component
const EmptyState = () => (
  <div className="text-center py-20 bg-gray-50">
    <div className="text-6xl mb-6">🔍</div>
    <h2 className="text-3xl font-bold text-gray-800 mb-4">No Tours Found</h2>
    <p className="text-gray-600 max-w-md mx-auto">
      We couldn't find any tours matching your search criteria. Try adjusting your filters or search for something else.
    </p>
  </div>
);

// Loading state component
const LoadingState = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Footer CTA component
const FooterCTA = () => (
  <div className="bg-blue-600 text-white py-16 text-center">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-4">Ready for Your Next Adventure?</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Discover amazing destinations and create memories that last a lifetime.
      </p>
      <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300">
        Book Your Tour Today
      </button>
    </div>
  </div>
);

// Main Tour component
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
  }, [backendUrl]);

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
    return <LoadingState />;
  }

  return (
    <main className="min-h-screen">
      <HeroSection 
        destination={destination}
        setDestination={setDestination}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        handleSearch={handleSearch}
      />

      {/* Show no results message if no tours found */}
      {Object.keys(groupedData).length === 0 ? (
        <EmptyState />
      ) : (
        // Display tour sections
        Object.keys(groupedData).map((type, index) => (
          <TourSection 
            key={index} 
            data={groupedData[type]} 
            category={type.charAt(0).toUpperCase() + type.slice(1)} 
          />
        ))
      )}
      
      <FooterCTA />
    </main>
  );
};

export default Tour;