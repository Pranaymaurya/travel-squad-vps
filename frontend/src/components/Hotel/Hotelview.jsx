import React, { useState, useEffect } from 'react';
import './Hotelview.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faUtensils,
  faMapMarkerAlt, 
  faTree,
  faBed,
  faCheckCircle,
  faStar,
  faStarHalfAlt,
  faStar as faStarEmpty
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";

const Hotelview = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [hotelData, setHotelData] = useState({});
  const p = useParams();

  const navigate = useNavigate();
  const locationHook = useLocation();


  const handleSearch = () => {
    navigate(`/hotel/booking/${hotelData._id}`, { state: locationHook.state });
  };


  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/hotel/${p.id}`, { withCredentials: true});
        setHotelData(data);
      } catch (error) {
        console.error("Error fetching data:", error); 
      }
    };
    fetchHotels();
  }, [p.id]);

  const {
    name,
    location,
    distance, 
    hotelPriceHighlight,
    category,
    images = [],
    price,
    inclusions = [],
    hotelDetails = {},
    foodAndDining,
    locationAndSurroundings,
    roomDetailsAndAmenities,
    activitiesAndNearbyAttractions,
    rating
  } = hotelData;

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? images.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === images.length - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  const handleModalOpen = (content) => {
    setModalContent(content);
  };

  const renderStars = (rating = 0) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
    return (
      <div className="star-rating">
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} className="star-icon" />
        ))}
        {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="star-icon" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStarEmpty} className="star-icon" />
        ))}
      </div>
    );
  };
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <div>
      <div>
        {open && (
          <div className="slider fixed w-[100vw] h-[100vh]">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close top-5 right-5"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow m-5 text-[50px]"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img
                //src={images[slideNumber]}
                src={`${backendUrl}${images[slideNumber]}`}
                alt=""
                className="w-[80%] h-[80vh]"
              />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow m-5 text-[50px]"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper p-12">
          <h1 className="name">{name}</h1>
          <div className="w-full gap-[30px] pb-[12px] flex flex-col md:flex-row">
            <div className="hotelImages w-[94%] gap-3">
              {images.map((photo, i) => (
                <div className="hotelImgWrapper w-[32%]" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    //src={photo}
                    src={`${backendUrl}${photo}`}
                    alt=""
                    className="hotelImg rounded-md gap-1"
                  />
                </div>
              ))}
            </div>
            <div className="hotelContext">
              <div className="w-full">
                <h5 className="text-xl font-semibold">{category}</h5>
                <p className="text-[15px] text-black font-normal">
                  (Fits 2 Adults)
                </p>
                <hr className="my-4" />
                <h3 className="text-xl font-semibold">Inclusions:</h3>
                <ul className="pl-4 list-disc">
                  {inclusions.map((inclusion, index) => (
                    <li key={index} className="text-lg my-2 flex items-center">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="mr-2 text-green-500"
                      />
                      {inclusion}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs">Per Night</p>
                <h4 className="ml-4 text-3xl font-bold">
                  ₹{price}{" "}
                  <span className="text-xs font-normal">+ All Taxes</span>
                </h4>
                
                  <button onClick={handleSearch} className="bookNow">Reserve or Book Now!</button>
                
              </div>
            </div>
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <p className="hotelDesc">
                {hotelDetails.description}{" "}
                <span
                  className="text-red-600 cursor-pointer"
                  onClick={() => handleModalOpen(hotelData.foodAndDining)}
                >
                  More
                </span>
              </p>
              <div className="more-sections">
                <div className="section-button">
                  <FontAwesomeIcon icon={faUtensils} className="section-icon" />
                  <h5
                    className="text-sm font-normal"
                    onClick={() => handleModalOpen(foodAndDining)}
                  >
                    Food & Dining
                  </h5>
                </div>
                <div className="section-button">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="section-icon"
                  />
                  <h3
                    className="text-sm font-normal"
                    onClick={() => handleModalOpen(locationAndSurroundings)}
                  >
                    Location & Surroundings
                  </h3>
                </div>
                <div className="section-button">
                  <FontAwesomeIcon icon={faBed} className="section-icon" />
                  <h3
                    className="text-sm font-normal"
                    onClick={() => handleModalOpen(roomDetailsAndAmenities)}
                  >
                    Room Details & Amenities
                  </h3>
                </div>
                <div className="section-button">
                  <FontAwesomeIcon icon={faTree} className="section-icon" />
                  <h3
                    className="text-sm font-normal"
                    onClick={() =>
                      handleModalOpen(activitiesAndNearbyAttractions)
                    }
                  >
                    Activities & Nearby Attractions
                  </h3>
                </div>
              </div>
            </div>
            <div className="hotelDetailsPrice">
              <div className="ratings">
                <h3>Rating: {rating} </h3>
                {renderStars(rating)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={!!modalContent}
        onClose={() => setModalContent(null)}
        title={modalContent?.title}
        description={modalContent?.description}
        img={modalContent?.img}
      />
    </div>
  );
};

export default Hotelview;
