import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CabSidebar from './CabSidebar';
import CabList from './CabList';

function CabPage() {
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Initialize filters from URL query parameters or set default values
  const initialFilters = {
    date: queryParams.get("date") || formatDate(new Date()),
    hours: queryParams.get("hours") || new Date().getHours(),
    minutes: queryParams.get("minutes") || new Date().getMinutes(),
    sourceLocation: queryParams.get("sourceLocation") || "",
    destLocation: queryParams.get("destLocation") || "",
    model: queryParams.get("model") || "",
    type: queryParams.get("type") ? queryParams.get("type").split(",") : [],
    seats: queryParams.get("seats") ? queryParams.get("seats").split(",") : [],
    kmsIncluded: queryParams.get("kmsIncluded") || "",
    extraKmFare: queryParams.get("extraKmFare") || "",
    fuelType: queryParams.get("fuelType") ? queryParams.get("fuelType").split(",") : [],
    cancellation: queryParams.get("cancellation") || "",
    rating: queryParams.get("rating") || "",
    reviewCount: queryParams.get("reviewCount") || "",
    originalPrice: queryParams.get("originalPrice") || "",
    discountedPrice: queryParams.get("discountedPrice") || "",
    taxes: queryParams.get("taxes") || "",
  };

  const [filters, setFilters] = useState(initialFilters);

  // Update filters when URL query parameters change
  useEffect(() => {
    setFilters(initialFilters); // Update filters whenever the URL changes
  }, [location.search]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      <aside className="md:w-1/4 w-full md:sticky md:top-0 md:h-screen">
        <CabSidebar filters={filters} setFilters={setFilters} />
      </aside>
      <main className="md:w-3/4 w-full">
        <CabList filters={filters} setFilters={setFilters} />
      </main>
    </div>
  );
}

export default CabPage;
