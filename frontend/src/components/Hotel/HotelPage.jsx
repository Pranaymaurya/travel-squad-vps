import React, { useState, useEffect } from 'react';
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
  const queryParams = new URLSearchParams(location.search);

  const initialFilters = {
    location: queryParams.get("location") || "",
    checkin: queryParams.get("checkin") || formatDate(new Date()),
    checkout: queryParams.get("checkout") || formatDate(new Date()),
    guests: queryParams.get("guests") || "",
    price: queryParams.get("price") || "",
    minBudget: queryParams.get("minBudget") || "",
    maxBudget: queryParams.get("maxBudget") || "",
    starRating: queryParams.get("starRating") || "",
    guestRating: queryParams.get("guestRating") || "",
    propertyType: queryParams.get("propertyType") || "",
    amenities: queryParams.get("amenities") || "",
    facilities: queryParams.get("facilities") ? queryParams.get("facilities").split(",") : [],
  };

  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setFilters(initialFilters); // Update filters when URL changes
  }, [location.search]);

  return (
    <div className="flex">
  <HotelSidebar filters={filters} setFilters={setFilters} className="w-3/10" />
  <HotelList filters={filters} setFilters={setFilters} className="w-7/10" />
</div>

  );
}

export default HotelPage;
