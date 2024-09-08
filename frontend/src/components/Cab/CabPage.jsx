import React, { useState } from "react";
import CabSidebar from "./CabSidebar";
import CabList from "./CabList";
import { useLocation } from "react-router-dom";

function CabPage() {
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const location = useLocation();
  const initialFilters = location.state || {
     //city: "",
    //checkin: formatDate(new Date()),
    //checkout: formatDate(new Date()),
    date: formatDate(new Date()),
    hours: new Date().getHours(),
    minutes: new Date().getMinutes(),
    sourceLocation: "",
    destLocation: "",
    model: "",
    type: [],
    seats: [],
    kmsIncluded: "",
    extraKmFare: "",
    fuelType: [],
    cancellation: "",
    rating: "",
    reviewCount: "",
    originalPrice: "",
    discountedPrice : "",
    taxes:"",
  };
  const [filters, setFilters] = useState(initialFilters);
  return (
    <div className="flex ">
      <CabSidebar filters={filters} setFilters={setFilters} />
      <CabList filters={filters} setFilters={setFilters} />
    </div>
  );
}

export default CabPage;
