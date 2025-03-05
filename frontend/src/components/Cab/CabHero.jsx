// import "./HotelHero.css";
import { GrLocation } from "react-icons/gr";
import React, { useState } from "react";
import { HiFilter } from "react-icons/hi";
import vid from "../../assets/cab.mp4";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CabHero = () => {

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    //city: "",
    //checkin: formatDate(new Date()),
    //checkout: formatDate(new Date()),
    date: formatDate(new Date()),
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    sourceLocation: "",
    destLocation: "",
    model: "", 
    type: [],
    seats: [],
    kmsIncluded: "",
    extraKmFare: "",
    fuelType: [],
    cancellation: "",
    rating: "",
    reviewCount: "",
    originalPrice: "",
    discountedPrice : "",
    taxes:"",
  });

  const navigate = useNavigate();

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
  
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (Array.isArray(value)) {
        value.forEach((item) => queryParams.append(key, item)); // Append array values
      } else {
        queryParams.append(key, value);
      }
    });
  
    navigate(`/c?${queryParams.toString()}`);
  };
  
  

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  return (
    <div className="home z-0">
      <div className="overlay"></div>
      <video src={vid} muted autoPlay loop type="video/mp4"></video>
 
      <div className="homeContent container">
        <div className="textDiv">
          <span className="smallText">Cabs</span>
          <h1 className="homeTitle">Search Cab</h1>
        </div>
        <div className="cardDiv grid">
          <div className="destinationInput">
            <label htmlFor="city">From your location:</label>
            <div className="input flex items-center">
              {/* <input type="text" placeholder="Enter location..." /> */}
              <input
                  type="text"
                  id="sourceLocation"
                  placeholder="Enter name here..."
                  className="border rounded p-2 flex-grow"
                  value={formData.sourceLocation}
                  onChange={handleChange}
                />
              <GrLocation className="icon " />
              <HiFilter className="icon" />
            </div>
          </div>
          <div className="destinationInput">
            <label htmlFor="city">To Where:</label>
            <div className="input flex items-center">
              {/* <input type="text" placeholder="Enter location..." /> */}
              <input
                  type="text"
                  id="destLocation"
                  placeholder="Enter name here..."
                  className="border rounded p-2 flex-grow"
                  value={formData.destLocation}
                  onChange={handleChange}
                />
              <GrLocation className="icon " />
              <HiFilter className="icon" />
            </div>
          </div>
          <div className="dataInput">
            <label htmlFor="date">Search your date:</label>
            <div className="input flex">
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="border rounded p-2 flex-grow"
              />
            </div>
          </div>
          <div className="timeInput">
            <label>Search your time:</label>
            <div className="input flex items-center">
              <input
                type="number"
                id="hours"
                value={formData.hours}
                onChange={handleChange}
                className="border rounded p-2 w-20"
                placeholder="HH"
                min="0"
                max="23"
              />
              <span className="mx-2 text-black">:</span>
              <input
                type="number"
                id="minutes"
                value={formData.minutes}
                onChange={handleChange}
                className="border rounded p-2 w-20"
                placeholder="MM"
                min="0"
                max="59"
              />
            </div>
            </div>
          {/* <div className="dataInput">
            <label htmlFor="date">Search your date and time:</label>
            <div className="input flex">
              <input type="datetime-local" />
            </div>
          </div> */}
          {/* <div className="priceInput">
            <div className="label_total flex">
              <label htmlFor="price">Max price:</label>
              <h3 className="total">₹50,000</h3>
            </div>
            <div className="input flex">
              <input type="range" max="50,000" min="5,000" />
            </div>
          </div> */}

          
          {/* <div className="searchOptions flex">
            <span>SEARCH</span>
          </div> */}
          <button
              onClick={handleSearch}
              className="searchOptions flex"
            >
              SEARCH
            </button>

        </div>
      </div>
    </div>
  );
};

export default CabHero;
