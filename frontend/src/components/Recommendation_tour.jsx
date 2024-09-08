// import React from "react";
import TourCard from "./TourCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Recommendation_tour = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [tourData, setTourData] = useState([]);

  useEffect(() => { 
    const fetchTours = async () => { 
      try {
        const { data } = await axios.get(`${backendUrl}/api/tour`,{ withCredentials: true });
        setTourData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTours();
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="popular w-[90%] mx-auto p-4">
        <h1 className="text-2xl font-bold my-4">Featured Tours</h1>
        <hr className="my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.isArray(tourData) && tourData?.map((item, i) => {
            return (
              item.featured == true &&
              <TourCard
                key={i}
                id={item._id}
                name={item.name}
                image={item.image} 
                nights={item.nights}
                days={item.days}
                price={item.price}
                ratings={item.ratings}
                description={item.description}
              />
            );
          })}
        </div>
        <div className="flex  mt-6 justify-center">
            <a href="/tour">
          <button className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all">
           View More
          </button>
            </a>
        </div>
      </div>
    </div>
  );
};

export default Recommendation_tour;
