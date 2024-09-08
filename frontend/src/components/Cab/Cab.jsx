// import { Link } from "react-router-dom";
// import data from "./TourData";
// import HotelHero from "../Hotel/HotelHero";
import Testimonial from "../Testimonial";
import Whyus from "../Whyus";
import CabHero from "./CabHero";
// import HeroTour from "./";

const Cab = () => {
  return (
    <>
      <CabHero />
      <Whyus />
      <Testimonial />
      {/* <Mountains key={data[0].id} /> */}
      {/* <Beach key={data[1].id} /> */}
      {/* <Desert key={data[2].id} /> */}
      {/* <Camping key={data[3].id} /> */}
    </>
  );
};

export default Cab;
