import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const Offers = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Offers");

  useEffect(() => {
    // Fetch offers from the server
    axios.get(`${backendUrl}/api/offer`, { withCredentials: true})
      .then(response => {
        setOffers(response.data);
        setFilteredOffers(response.data); // Initially show all offers
      })
      .catch(error => {
        console.error("Error fetching offers:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory === "All Offers") {
      setFilteredOffers(offers);
    } else {
      setFilteredOffers(
        offers.filter(offer => offer.relatedTo === selectedCategory)
      );
    }
  }, [selectedCategory, offers]);

  const handleCategoryClick = (event, category) => {
    event.preventDefault(); // Prevent the default anchor tag behavior
    setSelectedCategory(category);
  };

  // Divide filteredOffers into chunks of 4 for each slide
  const chunks = [];
  for (let i = 0; i < filteredOffers.length; i += 4) {
    chunks.push(filteredOffers.slice(i, i + 4));
  }

  return (
    <div className="offer-container bg-gray-100 rounded-2xl h-fit p-8 mt-5 mx-4 md:mx-20 mb-12">
      <div className="offer-heading flex items-center gap-8">
        <h1 className="font-bold text-4xl">Offers</h1>
        <div className="tags flex gap-11 border-b-2 pb-1">
          <a href="#" onClick={(event) => handleCategoryClick(event, "All Offers")}>All Offers</a>
          <a href="#" onClick={(event) => handleCategoryClick(event, "Hotel")}>Hotels</a>
          <a href="#" onClick={(event) => handleCategoryClick(event, "Cab")}>Cabs</a>
          <a href="#" onClick={(event) => handleCategoryClick(event, "Tour")}>Tours</a>
        </div>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {Array.isArray(chunks) && chunks.map((chunk, index) => (
          <SwiperSlide style={{ height: 'fit-content' }} key={index}>
            <div 
              className="grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                ...(window.innerWidth <= 768 && {
                  gridTemplateColumns: '1fr',
                })
              }}
            >
              {Array.isArray(chunk) && chunk.map(item => (
                <div key={item._id} className="offer-item bg-white w-full rounded-2xl text-right p-5">
                  <div className="flex gap-5 text-left">
                    <div className="image rounded-lg w-32 h-32 overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        //src={offer.image}
                         src={`${backendUrl}${item.image}`}
                        alt={item.title}
                      />
                    </div>
                    <div className="text">
                      <h2 className="uppercase text-2xl font-bold mb-2 w-[303px]">
                        {item.title}
                      </h2>
                      <hr className="w-12" style={{ borderColor: 'red' }} />
                      <p className="mt-3">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {item.relatedTo.toLowerCase() === 'cab'?(
                  <Link to={`/${item.relatedTo.toLowerCase()}/booking/${item.relatedId}`}>
                  <button className="font-semibold text-right text-sky-700 hover:text-sky-500 text-xl mt-2">
                    View Details
                  </button>
                  </Link>
                  ): (
                    <Link to={`/${item.relatedTo.toLowerCase()}/${item.relatedId}`}>
                    <button className="font-semibold text-right text-sky-700 hover:text-sky-500 text-xl mt-2">
                      View Details
                    </button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Offers;
