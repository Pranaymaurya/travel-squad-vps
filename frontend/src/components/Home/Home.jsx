import Hero from "../Hero";
import WhyChooseUs from "../WhyChooseUs.jsx";
import Testimonial from "../Testimonial";
//import Services from "../Services";
import Recommendation_tour from "../Recommendation_tour";
import Recommendation_hotel from "../Recommendation_hotel";
import Offers from "./Offers/Offers.jsx";
import About_us from "../About_us.jsx";
import ShowBlog from "../ShowBlog.jsx";

function Home() {
  return (
    <>
      <div>
        {/* <Navbar /> */}
        <Hero />
        <Offers />
        <Recommendation_tour />
        <Recommendation_hotel />
        <ShowBlog />
        <WhyChooseUs />
        <About_us />
        <Testimonial />
      </div>
    </>
  );
}

export default Home;
