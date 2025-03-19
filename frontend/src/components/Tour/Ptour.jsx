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
  faMapMarkerAlt,
  faClock,
  faStar,
  faHotel,
  faCamera,
  faMoneyBillWave,
  faCalendarDay,
  faUtensils
} from "@fortawesome/free-solid-svg-icons";
import "./tc.css";

const Ptour = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { id } = useParams();
  const [tourData, setTourData] = useState(null);
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [expandedDays, setExpandedDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState({
    isLoading: false,
    success: false,
    error: null
  });

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${backendUrl}/api/tour/${id}`, { withCredentials: true });
        setTourData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

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

  // New booking function
  const handleBooking = async () => {
    if (!selectedDate) {
      setBookingStatus({
        isLoading: false,
        success: false,
        error: "Please select a booking date"
      });
      return;
    }

    try {
      setBookingStatus({
        isLoading: true,
        success: false,
        error: null
      });

      const response = await axios.post(
        `${backendUrl}/api/tour/booking/create`, 
        {
          tourId: id,
          bookingDate: selectedDate,
          persons: numberOfPersons
        },
        { withCredentials: true }
      );

      setBookingStatus({
        isLoading: false,
        success: true,
        error: null
      });

      // Reset the form
      setSelectedDate("");
      setNumberOfPersons(1);

      // Optional: You can redirect to booking confirmation page here
      // navigate(`/booking-confirmation/${response.data._id}`);
    } catch (error) {
      console.error("Booking error:", error);
      setBookingStatus({
        isLoading: false,
        success: false,
        error: error.response?.data?.message || "Failed to book the tour. Please try again."
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!tourData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Tour not found</h2>
          <p className="text-gray-500 mt-2">The tour you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <img 
          src={`${backendUrl}${tourData.photos[0]}`} 
          alt={tourData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{tourData.name}</h1>
          <div className="flex items-center text-lg">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-blue-400" />
            <span>{tourData.location}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Tour Details */}
          <div className="lg:w-2/3">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <FontAwesomeIcon icon={faCamera} className="mr-3 text-blue-600" />
                Tour Gallery
              </h2>
              
              {/* Fullscreen Image Viewer */}
              {open && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="absolute top-4 right-4 text-white text-3xl cursor-pointer hover:text-gray-300 transition-colors"
                    onClick={() => setOpen(false)}
                  />
                  <FontAwesomeIcon
                    icon={faCircleArrowLeft}
                    className="absolute left-4 text-white text-4xl cursor-pointer hover:text-gray-300 transition-colors"
                    onClick={() => handleMove("l")}
                  />
                  <img
                    src={`${backendUrl}${tourData.photos[slideNumber]}`}
                    alt=""
                    className="max-w-full max-h-[85vh] object-contain"
                  />
                  <FontAwesomeIcon
                    icon={faCircleArrowRight}
                    className="absolute right-4 text-white text-4xl cursor-pointer hover:text-gray-300 transition-colors"
                    onClick={() => handleMove("r")}
                  />
                </div>
              )}
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-3 gap-3">
                {tourData.photos.map((photo, i) => (
                  <div 
                    key={i} 
                    className="relative rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300 shadow-sm" 
                    onClick={() => handleOpen(i)}
                  >
                    <img
                      src={`${backendUrl}${photo}`}
                      alt={`Tour view ${i+1}`}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-0 transition-all duration-300"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tour Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <FontAwesomeIcon icon={faMoneyBillWave} className="mr-3 text-blue-600" />
                Tour Details
              </h2>
              
              <div className="flex flex-wrap mb-6 gap-6">
                <div className="flex items-center bg-blue-50 rounded-full px-4 py-2">
                  <FontAwesomeIcon icon={faCalendarDay} className="text-blue-600 mr-2" />
                  <span className="font-medium">{tourData.duration}</span>
                </div>
                
                <div className="flex items-center bg-blue-50 rounded-full px-4 py-2">
                  <FontAwesomeIcon icon={faMoneyBillWave} className="text-blue-600 mr-2" />
                  <span className="font-medium">₹{tourData.price} per person</span>
                </div>
                
                <div className="flex items-center bg-blue-50 rounded-full px-4 py-2">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2" />
                  <span className="font-medium">{tourData.rating} / 5 rating</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                {tourData.description || "Experience the adventure of a lifetime with our carefully crafted tour package. Explore breathtaking landscapes, immerse yourself in local cultures, and create memories that will last forever."}
              </p>
              
              <h3 className="text-xl font-semibold mb-3 text-blue-700 flex items-center">
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                Inclusions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {tourData.inclusions.map((inclusion, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                    </div>
                    <p>{inclusion}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Tour Itinerary */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <FontAwesomeIcon icon={faCalendarDay} className="mr-3 text-blue-600" />
                Tour Itinerary
              </h2>
              
              <div className="space-y-4">
                {tourData.tourPlan.map((day, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Day Header */}
                    <div 
                      className={`flex items-center justify-between p-4 cursor-pointer ${expandedDays.includes(index) ? 'bg-blue-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                      onClick={() => toggleDay(index)}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="font-bold text-blue-700">{day.day}</span>
                        </div>
                        <h3 className="font-semibold text-lg">{day.description}</h3>
                      </div>
                      <FontAwesomeIcon 
                        icon={expandedDays.includes(index) ? faChevronUp : faChevronDown} 
                        className="text-blue-600"
                      />
                    </div>
                    
                    {/* Day Content */}
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedDays.includes(index) ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-4 border-t border-gray-200">
                        <div className="pl-6 ml-4 border-l-2 border-blue-400">
                          {/* Car Details */}
                          {day.car && day.car.length > 0 && (
                            <div className="mb-6">
                              <h4 className="flex items-center text-lg font-medium mb-3 text-gray-800">
                                <FontAwesomeIcon icon={faCar} className="mr-2 text-blue-600" />
                                Transport to {day.car[0].destination}
                              </h4>
                              <p className="text-sm text-gray-500 mb-3">{day.car[0].checkout}</p>
                              
                              <div className="space-y-3">
                                {day.car.map((car, carIndex) => (
                                  <div key={carIndex} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row">
                                      <div className="md:w-1/3">
                                        <img
                                          src={`${backendUrl}${car.image}`}
                                          alt={`${car.type} ${car.model}`}
                                          className="w-full h-48 md:h-full object-cover"
                                        />
                                      </div>
                                      <div className="p-4 md:w-2/3">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            {car.type}
                                          </span>
                                          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            {car.model}
                                          </span>
                                        </div>
                                        <p className="text-gray-700"><span className="font-medium">Facilities:</span> {car.facilities}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Sightseeing Details */}
                          {day.sightseeing && day.sightseeing.length > 0 && (
                            <div className="mb-6">
                              <h4 className="flex items-center text-lg font-medium mb-3 text-gray-800">
                                <FontAwesomeIcon icon={faCamera} className="mr-2 text-blue-600" />
                                Sightseeing in {day.sightseeing[0].name}
                              </h4>
                              
                              <div className="space-y-3">
                                {day.sightseeing.map((sight, sightIndex) => (
                                  <div key={sightIndex} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row">
                                      <div className="md:w-1/3">
                                        <img
                                          src={`${backendUrl}${sight.image}`}
                                          alt={sight.name}
                                          className="w-full h-48 md:h-full object-cover"
                                        />
                                      </div>
                                      <div className="p-4 md:w-2/3">
                                        <div className="flex justify-between items-start mb-2">
                                          <h5 className="font-semibold text-lg">{sight.location}</h5>
                                          <div className="flex items-center text-gray-600">
                                            <FontAwesomeIcon icon={faClock} className="mr-1" />
                                            <span>{sight.duration}</span>
                                          </div>
                                        </div>
                                        <p className="text-gray-700 mb-2"><span className="font-medium">Places Covered:</span> {sight.places}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Hotel Details */}
                          {day.hotels && day.hotels.length > 0 && (
                            <div className="mb-3">
                              <h4 className="flex items-center text-lg font-medium mb-3 text-gray-800">
                                <FontAwesomeIcon icon={faHotel} className="mr-2 text-blue-600" />
                                Accommodation
                              </h4>
                              <p className="text-sm text-gray-500 mb-3">{day.hotels[0].timming}</p>
                              
                              <div className="space-y-3">
                                {day.hotels.map((hotel, hotelIndex) => (
                                  <div key={hotelIndex} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row">
                                      <div className="md:w-1/3">
                                        <img
                                          src={`${backendUrl}${hotel.image}`}
                                          alt={hotel.name}
                                          className="w-full h-48 md:h-full object-cover"
                                        />
                                      </div>
                                      <div className="p-4 md:w-2/3">
                                        <div className="flex justify-between items-start mb-2">
                                          <h5 className="font-semibold text-lg">{hotel.name}</h5>
                                          <div className="flex items-center">
                                            {[...Array(parseInt(hotel.ratings) || 3)].map((_, i) => (
                                              <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />
                                            ))}
                                          </div>
                                        </div>
                                        <div className="flex items-center text-gray-700 mb-2">
                                          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-gray-500" />
                                          <span>{hotel.location}</span>
                                        </div>
                                        <div className="flex items-center text-gray-700">
                                          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-500" />
                                          <span>Stay Date: {hotel["stay date"]}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Booking Section */}
          <div className="lg:w-1/3">
            <div className="sticky top-6">
              {/* Booking Form */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="bg-blue-600 p-4 text-white">
                  <h2 className="text-xl font-bold">Book This Tour</h2>
                  <p className="text-blue-100">Starting from ₹{tourData.price} per person</p>
                </div>
                <div className="p-6">
                  {/* Date Selection */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-blue-600" />
                      Select Date
                    </label>
                    <input 
                      type="date" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={selectedDate}
                      onChange={handleDateChange}
                      required
                    />
                    {bookingStatus.error && bookingStatus.error.includes("date") && (
                      <p className="text-red-500 text-sm mt-1">{bookingStatus.error}</p>
                    )}
                  </div>
                  
                  {/* Persons Counter */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      <FontAwesomeIcon icon={faPerson} className="mr-2 text-blue-600" />
                      Number of Persons
                    </label>
                    <div className="flex items-center">
                      <button 
                        onClick={decrement}
                        className="w-10 h-10 bg-gray-200 rounded-l-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
                      >
                        -
                      </button>
                      <div className="w-full h-10 flex items-center justify-center border-t border-b border-gray-300 bg-white">
                        {numberOfPersons}
                      </div>
                      <button 
                        onClick={increment}
                        className="w-10 h-10 bg-gray-200 rounded-r-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Total Price */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Price per person</span>
                      <span className="font-medium">₹{tourData.price}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Persons</span>
                      <span className="font-medium">x {numberOfPersons}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Price</span>
                      <span className="text-blue-600">₹{tourData.price * numberOfPersons}</span>
                    </div>
                  </div>
                  
                  {/* Booking Status Messages */}
                  {bookingStatus.success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg flex items-center">
                      <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                      <span>Booking successful! Your tour is now reserved.</span>
                    </div>
                  )}
                  
                  {bookingStatus.error && !bookingStatus.error.includes("date") && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                      <span>{bookingStatus.error}</span>
                    </div>
                  )}
                  
                  {/* Book Now Button */}
                  <button 
                    className={`w-full ${bookingStatus.isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 px-4 rounded-lg font-bold transition-colors flex items-center justify-center`}
                    onClick={handleBooking}
                    disabled={bookingStatus.isLoading}
                  >
                    {bookingStatus.isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                        Book Now
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Additional Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Why Book With Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                    </div>
                    <span>Best Price Guarantee</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                    </div>
                    <span>Customer Support 24/7</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                    </div>
                    <span>Free Cancellation Policy</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                    </div>
                    <span>Handpicked Hotels & Experiences</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ptour;