import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faChevronDown,
  faChevronUp,
  faPerson,
  faCalendarAlt,
  faCheckCircle,
  faCar,
} from "@fortawesome/free-solid-svg-icons";
import "./tc.css";
//import BookTour from "./BookTour";

const TourPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();
  //const tourData = props.data.find((post) => post.name === id);
  const [tourData, setTourData] = useState(null);
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [expandedDays, setExpandedDays] = useState([]);

    useEffect(() => {
    const fetchTour = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/tour/${id}`, { withCredentials: true});
        setTourData(data);
         console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTour();
  }, [id]); // Fetch data when id changes

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    setSlideNumber((prev) =>
      direction === "l"
        ? prev === 0
          ? tourData.photos.length - 1
          : prev - 1
        : prev === tourData.photos.length - 1
        ? 0
        : prev + 1
    );
  };

  const toggleDay = (index) => {
    setExpandedDays((prev) =>
      prev.includes(index)
        ? prev.filter((day) => day !== index)
        : [...prev, index]
    );
  };

    const increment = () => setNumberOfPersons((prev) => prev + 1);

  const decrement = () => {
    if (numberOfPersons > 1) setNumberOfPersons((prev) => prev - 1);
  };

  const handleDateChange = (event) => setSelectedDate(event.target.value);

  if (!tourData) {
        return <div>Loading...</div>; // Display loading state
      }

      

  return (
    <div className="page">
      {/* Image Slider and Overview */}
      <div className="top flex flex-col md:flex-row">
        {/* Image Slider */}
        <div className="relative w-full md:w-9/10 flex flex-wrap justify-between">
          {open && (
            <div className="slider mb-2.5 w-full h-[64vh]">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close top-2 right-2"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow text-4xl"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  //src={tourData.photos[slideNumber] }
                  src={`${backendUrl}${tourData.photos[slideNumber] }`}
                  alt=""
                  className="w-[98%] h-[59vh] object-cover"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow text-4xl"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelImages">
            {tourData.photos.map((photo, i) => (
              <div className="hotelImgWrapper w-[33%] " key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  //src={photo}
                  src={`${backendUrl}${photo}`}
                  alt=""
                  className="hotelImg" 
                />
              </div>
            ))}
          </div>
        </div>
        {/* Tour Details */}
        <div className="context">
          <div className="w-full">
            <h2 className="text-4xl font-extrabold mb-2">{tourData.name}</h2>
            <p className="text-xl text-blue-700 mb-4 font-bold">
              {tourData.price}
            </p>
            <hr className="mb-4" />
            <h3 className="text-2xl font-semibold">Inclusions:</h3>
            <ul className="pl-4 list-disc">
              {tourData.inclusions.map((inclusion, index) => (
                <li key={index} className="text-lg my-2 flex items-center">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="mr-2 text-green-500"
                  />
                  {inclusion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Tour Plan and Booking */}
      <div className="main flex flex-col md:flex-row">
        {/* Tour Plan */}
        <div className="tour_plan md:w-3/4">
          <h2 className="text-3xl font-bold mb-10 ">Tour Plan</h2>
          {tourData.tourPlan.map((day, index) => (
            <li key={index} className="acc">
              <div className="acc-btn" onClick={() => toggleDay(index)}>
                <div className="icon-box"><i className="bx bx-chevron-down"></i></div>
                <span>Day 0{day.day}:</span>
                <h4>{day.description}</h4>
              </div>
              <div className={`acc-content ${expandedDays.includes(index) ? 'active' : ''}`}>
                <div className="text">
                  {expandedDays.includes(index) && (
                    <div className="day_content mt-2 pl-4 border-l-2 border-gray-300 transition-all transform scale-105">
                      {/* Car Details */}
                      {day.car && day.car.length > 0 && (
                        <div className="car_card mb-4">
                          <p className="text-sm pl-3 text-gray-500 mb-2">
                            {day.car[0].checkout}
                          </p>
                          <div className="flex items-baseline">
                            <FontAwesomeIcon icon={faCar} />
                            <h4 className="text-lg font-bold mb-2 ml-3">
                              {day.car[0].destination}
                            </h4>
                            <p></p>
                          </div>
                          <ul className="space-y-2">
                            {day.car.map((car, carIndex) => (
                              <li
                                key={carIndex}
                                className="card flex p-2 border rounded-lg shadow-sm"
                              >
                                <img
                                  //src={car.image}
                                  src={`${backendUrl}${car.image}`}
                                  alt="default-car-image.jpg"
                                  className="card_image w-1/3 mr-4 object-cover rounded-md"
                                />
                                <div className="card_content flex-grow">
                                  <p>Type: {car.type}</p>
                                  <p>Model: {car.model}</p>
                                  <p>Facilities: {car.facilities}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {/* Sightseeing Details */}
                      {day.sightseeing && day.sightseeing.length > 0 && (
                        <div className="sightseeing_card mb-4">
                          <h4 className="text-lg font-bold mb-2">
                            Sightseeing in {day.sightseeing[0].name}
                          </h4>
                          <ul className="space-y-2">
                            {day.sightseeing.map((sight, sightIndex) => (
                              <li
                                key={sightIndex}
                                className="card flex p-2 border rounded-lg shadow-sm"
                              >
                                <img
                                  //src={sight.image }
                                  src={`${backendUrl}${sight.image }`}
                                  alt="default-sightseeing-image.jpg"
                                  className="card_image w-1/3 mr-4 object-cover rounded-md"
                                />
                                <div className="card_content flex-grow">
                                  <p>Location: {sight.location}</p>
                                  <p>Duration: {sight.duration}</p>
                                  <p>Places Covered: {sight.places}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {/* Hotel Details */}
                      {day.hotels && day.hotels.length > 0 && (
                        <div className="hotel_card mb-4">
                          <h4 className="text-lg font-bold mb-2">
                            {day.hotels[0].timming}
                          </h4>
                          <ul className="space-y-2">
                            {day.hotels.map((hotel, hotelIndex) => (
                              <li
                                key={hotelIndex}
                                className="card flex p-2 border rounded-lg shadow-sm"
                              >
                                <img
                                 // src={hotel.image || "default-hotel-image.jpg"}
                                  src={`${backendUrl}${hotel.image }`}
                                  alt="default-hotel-image.jpg"
                                  className="card_image w-1/3 mr-4 object-cover rounded-md"
                                />
                                <div className="card_content flex-grow">
                                  <p>Name: {hotel.name}</p>
                                  <p>Ratings: {hotel.ratings}</p>
                                  <p>Location: {hotel.location}</p>
                                  <p>Stay Date: {hotel["stay date"]}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </div>
        {/* Booking Section */}
        {/* <BookTour /> */}
      </div>
    </div>
  );
};

export default TourPage;
