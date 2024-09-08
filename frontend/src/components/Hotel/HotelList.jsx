import React from 'react';
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
 
function HotelCard({ hotel, filters, setFilters }) {

  // const {
  //   //city: "",
  //   checkin,
  //   checkout,
  //   guests,
  //   price,
  //   location,
  //   minBudget,
  //   maxBudget,
  //   starRating,
  //   guestRating,
  //   propertyType,
  //   amenities,
  //   facilities,
  // } = filters

  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/hotel/${hotel._id}`, { state: filters });
  };


  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    //<Link to={`/hotel/${hotel._id}`} >
      <div className="border border-red-200 items-center justify-center rounded-lg p-4 shadow bg-white mb-4 flex flex-col md:flex-row ">
      <div className="md:flex-shrink-0  ">
        <img
          //src={hotel.imageUrl}
          src={`${backendUrl}${hotel.imageUrl}`}
          alt={`Image of ${hotel.name}`}
          className="h-48 w-full md:w-48 object-cover md:rounded-lg "
        />
        <div className="flex items-center gap-3 mt-2">
          {hotel.images.map((imgSrc, index) => (
            <img
              key={index}
              // src={imgSrc}
              src={`${backendUrl}${imgSrc}`}
              alt={`Additional view ${index + 1}`}
              className="h-12 w-12 object-cover rounded-lg"
            />
          ))}
          <div className="text-blue-600 text-sm cursor-pointer">View All</div>
        </div>
      </div>
      <div className="mt-4 md:mt-0 md:ml-4 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center">
            <span className="text-xs font-bold bg-gray-200 rounded px-2 py-1">
              MMT Luxe
            </span>
            <h3 className="font-bold text-lg ml-2">{hotel.name}</h3>
          </div>
          <p className="text-sm text-blue-500">
            {hotel.location} | {hotel.distance}
          </p>
          <p className="text-xs bg-gray-200 inline-block rounded px-2 py-1 mt-1">
            {hotel.category}
          </p>
          <p className="text-green-600 text-sm mt-2">Breakfast Included</p>
          <p className="text-brown-600 text-sm mt-2">
            Avail 15% discount on spa, food & beverages
          </p>
        </div>
        <div className="mt-4 flex justify-between items-end">
          <div>
            <span className="bg-blue-100 text-blue-800 font-semibold py-1 px-2 rounded">
              {hotel.rating}
            </span>
            <span className="text-gray-500 text-sm ml-2">
              ({hotel.reviewCount} Ratings)
            </span>
          </div>
          <div>
            <p className="text-lg font-bold">₹ {hotel.price}</p>
            <p className="text-sm text-gray-500">
              + ₹ {hotel.taxes} taxes & fees
            </p>
            <p className="text-sm">Per Night</p>
          </div>
          <button onClick={handleSearch} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login to Book Now & Pay Later!
          </button>
        </div>
      </div>
    </div>
    //</Link>
  );
}

HotelCard.propTypes = {
  hotel: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    distance: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviewCount: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    taxes: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

// export default HotelCard;

function HotelList({ filters, setFilters }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [hotelData, setHotelData] = useState([]); 

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/hotel`, { withCredentials: true});
        const filteredData = data.filter((hotel) => {
          const matchesLocation = hotel.location
            .toLowerCase()
            .includes(filters.location.toLowerCase());
          const matchesBudget =
            (!filters.minBudget || hotel.price >= filters.minBudget) &&
            (!filters.maxBudget || hotel.price <= filters.maxBudget);
          //const matchesStarRating = !filters.starRating || hotel.rating === Number(filters.starRating.charAt(0));
          const matchesStarRating =
            !filters.starRating ||
            (filters.starRating.includes("1") &&
              hotel.star > 0 &&
              hotel.star < 2) ||
            (filters.starRating.includes("2") &&
              hotel.star > 1 &&
              hotel.star < 3) ||
            (filters.starRating.includes("3") &&
              hotel.star > 2 &&
              hotel.star < 4) ||
            (filters.starRating.includes("4") &&
              hotel.star > 3 &&
              hotel.star < 5) ||
            (filters.starRating.includes("5") &&
              hotel.star > 4 &&
              hotel.star < 6) ||
            filters.starRating.includes("Select");
          const matchesGuestRating =
            !filters.guestRating ||
            (filters.guestRating.includes("Excellent") &&
              hotel.rating >= 4.5) ||
            (filters.guestRating.includes("Very Good") &&
              hotel.rating >= 4.0) ||
            (filters.guestRating.includes("Good") && hotel.rating >= 3.5) ||
            (filters.guestRating.includes("Pleasant") && hotel.rating >= 3.0) ||
            filters.guestRating.includes("Select");
          const matchesPropertyType =
            !filters.propertyType ||
            hotel.type.toLowerCase() === filters.propertyType.toLowerCase() ||
            filters.propertyType.includes("Select");
          const matchesAmenities =
            !filters.amenities ||
            filters.amenities.includes("Select") ||
            hotel.amenities.some((amenity) =>
              amenity.toLowerCase().includes(filters.amenities.toLowerCase())
            );
          const matchesFacilities =
            !filters.facilities.length ||
            filters.facilities.every((facility) =>
              hotel.facilities
                .map((hotelFacility) => hotelFacility.toLowerCase())
                .includes(facility.toLowerCase())
            );

          return (
            matchesLocation &&
            matchesBudget &&
            matchesStarRating &&
            matchesGuestRating &&
            matchesPropertyType &&
            matchesAmenities &&
            matchesFacilities
          );
        });
        setHotelData(filteredData);
        //console.log(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHotels();
  }, [filters]);

  return (
    <div className="w-full md:w-3/4 m-auto bg-white p-4">
      {/* {hotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} />
      ))} */}
      {Array.isArray(hotelData) && hotelData?.map((hotel, i) => {
        // console.log(item.id, i);
        return <HotelCard key={hotel._id} hotel={hotel} filters={filters} setFilters={setFilters} />;
      })}
    </div>
  );
}

HotelList.propTypes = {
  filters: PropTypes.object.isRequired,
};

export default HotelList;
