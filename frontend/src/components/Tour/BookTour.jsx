import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faPerson, faCar } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

const BookTour = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');

  const handleDateChange = (e) => setSelectedDate(e.target.value);
  const handlePickupChange = (e) => setPickupLocation(e.target.value);
  const handleDropChange = (e) => setDropLocation(e.target.value);
  const decrement = () => setNumberOfPersons(Math.max(1, numberOfPersons - 1));
  const increment = () => setNumberOfPersons(numberOfPersons + 1);

  return (
    <div className="book bg-gray-200 p-8 rounded-lg md:w-1/3 shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Book this Tour</h2>
      <div className="flex items-center mb-4">
        <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-xl" />
        <label htmlFor="date" className="mr-2">Select Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="bg-gray-300 px-2 py-1 rounded-md cursor-pointer"
        />
      </div>
      <div className="flex items-center mb-4">
        <FontAwesomeIcon icon={faPerson} className="mr-2 text-xl" />
        <h4 className="pr-5">Persons:</h4>
        <button
          onClick={decrement}
          className="bg-gray-300 px-2 py-1 rounded-md mr-2"
        >
          -
        </button>
        <span className="text-lg font-semibold">{numberOfPersons}</span>
        <button
          onClick={increment}
          className="bg-gray-300 px-2 py-1 rounded-md ml-2"
        >
          +
        </button>
      </div>
      <div className="mb-4">
        <FontAwesomeIcon icon={faCar} className="mr-2 text-xl" />
        <label htmlFor="pickup" className="mr-2">Pickup Location:</label>
        <select
          id="pickup"
          value={pickupLocation}
          onChange={handlePickupChange}
          className="bg-gray-300 px-2 py-1 rounded-md w-full"
        >
          <option value="">Select a pickup location</option>
          <option value="PointA">Point A</option>
          <option value="PointB">Point B</option>
          <option value="PointC">Point C</option>
        </select>
      </div>
      <div className="mb-4">
        <FontAwesomeIcon icon={faCar} className="mr-2 text-xl" />
        <label htmlFor="drop" className="mr-2">Drop Location:</label>
        <select
          id="drop"
          value={dropLocation}
          onChange={handleDropChange}
          className="bg-gray-300 px-2 py-1 rounded-md w-full"
        >
          <option value="">Select a drop location</option>
          <option value="PointX">Point X</option>
          <option value="PointY">Point Y</option>
          <option value="PointZ">Point Z</option>
        </select>
      </div>
      <div className="flex items-center justify-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BookTour;
