import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HotelSidebar from './HotelSidebar';
import HotelList from './HotelList';

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
  console.log(queryParams.get('guestrating'));
  
  const initialFilters = {
    location: queryParams.get("location") || "",
    checkin: queryParams.get("checkin") || formatDate(new Date()),
    checkout: queryParams.get("checkout") || formatDate(new Date()),
    guests: queryParams.get("guests") || "",
    price: queryParams.get("price") || "",
    minBudget: queryParams.get("price").split('-')[0] || "",
    maxBudget: queryParams.get("price").split('-')[1]  || "",
    starRating: queryParams.get("starrating") || "",
    guestRating: queryParams.get("guestrating") || "",
    propertyType: queryParams.get("propertytype") || "",
    amenities: queryParams.get("amenities") ? queryParams.get("amenities").split(",") : [],
    facilities: queryParams.get("facilities") ? queryParams.get("facilities").split(",") : [],
  };

  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      <aside className="md:w-1/4 w-full md:sticky md:top-0 md:h-screen">
        <HotelSidebar filters={filters} setFilters={setFilters} />
      </aside>
      <main className="md:w-3/4 w-full">
        <HotelList filters={filters} setFilters={setFilters} />
      </main>
    </div>
  );
}

export default HotelPage;
