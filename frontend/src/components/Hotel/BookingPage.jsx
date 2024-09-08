import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const BookingPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const locationHook = useLocation();
  const initialFilters = locationHook.state || {
    //city: "",
    checkin: "",
    checkout: "",
    guests: "",
    // price: "",
    // location: "",
    // minBudget: "",
    // maxBudget: "",
    // starRating: "",
    // guestRating: "",
    // propertyType: "",
    // amenities: "", 
    // facilities: [],
  };



  const [filters, setFilters] = useState(initialFilters);
  console.log(filters)

  const [hotelData, setHotelData] = useState({});
  const p = useParams();

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/hotel/${p.id}`, { withCredentials: true});
        setHotelData(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };
    fetchHotelData();
  }, [p.id]);

  

  const {
    name,
    location,
    distance,
    hotelPriceHighlight,
    category,
    images = [],
    price,
    taxes,
    inclusions = [],
    hotelDetails = {},
    foodAndDining,
    locationAndSurroundings,
    roomDetailsAndAmenities,
    activitiesAndNearbyAttractions,
    rating
  } = hotelData;

  return (
    <>
      <h2 className="text-2xl p-4 flex justify-center font-bold mb-4">
        Review your Booking
      </h2>
      <div className="flex justify-center items-center mx-auto p-4">
        <div className="bg-white px-20 rounded-lg grid md:grid-cols-2 shadow-lg">
          <div>
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-gray-600">{location}</p>
              <p className="text-blue-600">{category}</p>
              <div className="flex justify-between mt-4">
                <div>
                  <p>
                    <strong>Check-in:</strong> {filters.checkin}
                  </p>
                  <p>
                    <strong>Check-out:</strong> {filters.checkout}
                  </p>
                  <p>2 Nights | 2 Adults | 1 Room</p>
                </div>
                <div>
                  <p className="text-gray-600">
                    Guest room, 2 Queen, Garden view
                  </p>
                  <p>Room Only</p>
                  <p>No meals included</p>
                  <p>15% discount on Spa, Food and Beverages</p>
                  <p className="text-red-600">Non-Refundable</p>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h4 className="text-lg font-semibold mb-2">Upgrade Your Stay</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="radio" name="upgrade" className="mr-2" />
                  Add Breakfast for ₹ 2950 for all guests
                </label>
                <label className="flex items-center">
                  <input type="radio" name="upgrade" className="mr-2" />
                  Add Breakfast + Lunch/Dinner for ₹ 8496 for all guests
                </label>
                <label className="flex items-center">
                  <input type="radio" name="upgrade" className="mr-2" />
                  Add All Meals for ₹ 14160 for all guests
                </label>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h4 className="text-lg font-semibold mb-2">
                Important Information
              </h4>
              <p className="text-gray-600">
                Third Adult/Child charges are not a part of this rate. These
                charges are payable at the hotel directly...
              </p>
            </div>
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h4 className="text-lg font-semibold mb-2">Guest Details</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block mb-2">Mobile Number</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block mb-2">GST Details (Optional)</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
              </div>
            </div>
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h4 className="text-lg font-semibold mb-2">Your State</h4>
              <select className="w-full border-gray-300 rounded-lg p-2 mb-2">
                <option value="Delhi">Delhi</option>
                <option value="Punjab">Punjab</option>
                {/* Add other states here */}
              </select>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Confirm and save billing details to your profile
              </label>
            </div>
            <div className="border-b border-gray-200 pb-4 mb-4">
              <h4 className="text-lg font-semibold mb-2">Trip Secure</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p>24*7 emergency medical assistance...</p>
                  <p>Upto 2.5K for loss of tablets and laptops...</p>
                </div>
                <div className="flex items-center justify-end">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Add for ₹ 158
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Price Breakup</h4>
                <div className="flex justify-between mb-2">
                  <span>1 Room x 2 Nights</span>
                  <span>₹ {price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Hotel Taxes</span>
                  <span>₹ {taxes}</span>
                </div>
                <div className="flex items-center mb-2">
                  <input type="checkbox" className="mr-2" />
                  <span>
                    Donate ₹ 35 to build resilient travel destinations.{" "}
                    <a href="#" className="text-blue-600">
                      T&Cs
                    </a>
                  </span>
                  <span>₹ 0</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total Amount to be paid</span>
                  <span>₹ {price + taxes}</span>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-2">Coupon Codes</h4>
                <p className="text-gray-600 mb-2">
                  No coupon codes applicable for this property.
                </p>
                <p className="text-gray-600 mb-2">
                  MMT Gift Cards can be applied at payment step
                </p>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Have a Coupon Code"
                    className="w-full border-gray-300 rounded-l-lg p-2"
                  />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
                    Apply
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <h4 className="text-lg font-semibold mb-2">
                Why Sign Up or Login
              </h4>
              <ul className="list-disc list-inside text-gray-600">
                <li>Get access to Secret Deals</li>
                <li>Book Faster - we'll save & pre-enter your details</li>
                <li>Manage your bookings from one place</li>
              </ul>
            </div>
            <div className="text-center">
              <button className="bg-yellow-500 text-white px-8 py-2 rounded-lg text-xl">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
