import React, { useState } from 'react';
import HotelSidebar from './HotelSidebar';
import HotelList from './HotelList';
import { useLocation } from 'react-router-dom';

function HotelPage() {

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const location = useLocation();
  const initialFilters = location.state || {
    //city: "",
    checkin: formatDate(new Date()),
    checkout: formatDate(new Date()),
    guests: "",
    price: "",
    location: "",
    minBudget: "",
    maxBudget: "",
    starRating: "",
    guestRating: "",
    propertyType: "",
    amenities: "",
    facilities: [],
  };
  const [filters, setFilters] = useState(initialFilters);
  return (
    <div className="flex ">
      <HotelSidebar filters={filters} setFilters={setFilters} />
      <HotelList filters={filters} setFilters={setFilters} />
    </div>
  );
}

export default HotelPage;
