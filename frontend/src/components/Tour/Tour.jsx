import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import "./TourHero.css";
import vid from "../../assets/video.mp4";

// Card component for individual tour cards
const Card = ({ id, name, image, duration, price, location, rating }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <Link to={`/tour/${id}`} className="text-gray-600 hover:text-black">
      <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 relative transform hover:scale-110 transition-transform duration-300">
        <img
          className="w-full h-46 sm:h-56 object-cover"
          src={`${backendUrl}${image}`}
          alt={name}
        />
        <div className="px-4 py-2 sm:px-6 sm:py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <div className="text-gray-900">{duration}</div>
          <div className="text-gray-900">₹{price} Per Person</div>
          <div className="text-gray-900">{location}</div>
          <div className="text-gray-900">Rating: {rating} / 5</div>
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
    <div className="bg-gray-100">
      <div className="popular w-[90%] mx-auto p-4">
        <h1 className="text-2xl font-bold my-4">{category.toUpperCase()}</h1>
        <hr className="my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          { Array.isArray(data) && data.map((item, i) => (
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
        const response = await axios.get(`${backendUrl}/api/tour`, { withCredentials: true});
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
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="home z-0">
        <div className="overlay"></div>
        <video src={vid} muted autoPlay loop type="video/mp4"></video>

        <div className="homeContent container">
          <div className="textDiv">
            <span className="smallText">Our Packages</span>
            <h1 className="homeTitle">Search your holiday</h1>
          </div>
          <div className="cardDiv grid">
            <div className="destinationInput">
              <label htmlFor="city">Search your destination:</label>
              <div className="input flex items-center">
                <input
                  type="text"
                  placeholder="Enter name here..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
                <GrLocation className="icon " />
              </div>
            </div>
            <div className="dataInput">
              <label htmlFor="date">Search your date:</label>
              <div className="input flex">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>
            <div className="priceInput">
              <div className="label_total flex">
                <label htmlFor="price">Max price:</label>
                <h3 className="total">₹{maxPrice}</h3>
              </div>
              <div className="input flex">
                <input
                  type="range"
                  max="50000"
                  min="0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="searchOptions flex">
              <button
                onClick={handleSearch}
                className=" text-white px-4 py-2 rounded-md"
              >
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </div>
      {Object.keys(groupedData).map((type, index) => (
        <TourSection key={index} data={groupedData[type]} category={type.charAt(0).toUpperCase() + type.slice(1)} />
      ))}
    </>
  );
};

export default Tour;
