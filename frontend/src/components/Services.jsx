import "./Services.css";

import i1 from "../assets/i1.jpg";
import i2 from "../assets/i2.jpg";
import i3 from "../assets/i3.jpg";
import i4 from "../assets/i4.jpg";

const Services = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className=" my-12 px-4 w-[90%] ">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-semibold capitalize">What we offer</h2>
        </div>
        <div className="programs my-auto mx-20  flex items-center justify-between">
          <div className="program basis-[22rem] relative">
            <img className="w-full rounded-lg block" src={i4} alt="" />
            <div className="caption ">
              <img src={i1} alt="" />
              <p>Tours</p>
            </div>
          </div>
          <div className="program basis-[22rem] relative">
            <img className="w-full rounded-lg block" src={i1} alt="" />
            <div className="caption">
              <img src={i2} alt="" />
              <p>Cabs</p>
            </div>
          </div>
          <div className="program basis-[22rem] relative">
            <img className="w-full rounded-lg block" src={i3} alt="" />
            <div className="caption">
              <img src={i3} alt="" />
              <p>Hotels</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
