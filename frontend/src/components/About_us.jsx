import React from "react";
import cab from '../assets/i1.jpg';
import hotel from '../assets/i3.jpg';
import tour from '../assets/i4.jpg';
import png1 from '../assets/tourism.png';
import choice from '../assets/choice.png';

const About_us = () => {
  return (
    <div className=" flex flex-col justify-between md:flex-row container">
        <div className="text w-full md:w-3/6 my-12 px-4">
        <h2 className="text-4xl font-semibold capitalize text-cyan-900">About Us</h2>
            <h3 className="text-4xl my-4 font-bold font-serif">Planning a trip should be very exciting adventure</h3>
            <p className="my-4 text-zinc-700">We're dedicated to offering exceptional value for your travel
                investment. Our relationships with trusted travel partners
            </p>
            <div className="cards mt-3 ">
                <div className="card flex items-center p-2 ">
                    <div className="logo  bg-zinc-200 rounded-full max-w-12 max-h-12 mr-5">
                      <img className="p-2" src={png1} alt=""/>
                    </div>
                    <div className="cards-details">
                      <h5 className="text-2xl font-semibold text-zinc-950">National Tours</h5>
                      <p className="text-zinc-700">
                        Our team of travel professional brings a wealth of knowledge and
                        expertise to the table.
                      </p>
                    </div>
                </div>
                <div className="card flex mt-4 items-center p-2">
                    <div className="logo  bg-zinc-200 rounded-full max-w-12 max-h-12 mr-5">
                      <img className="p-2" src={choice} alt="" />
                    </div>
                    <div className="cards-details">
                      <h5 className="text-2xl font-semibold text-zinc-950">Multiple Options to Choose</h5>
                      <p className="text-zinc-700">
                        OPlanning trip should be an exciting adventure, not stressful
                        ordeal. Let us handle the logistics
                      </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="images w-full md:w-3/6 my-12 px-4 flex flex-col justify-between items-center gap-5 md:gap-0 md:flex-row ">
            <div className="img1 w-full h-36 md:w-72 md:h-96 rounded-lg overflow-hidden md:mr-5 my-0  relative ">
                <img src={tour} alt="" className="w-full h-full object-cover cursor-pointer transition-transform transform-gpu hover:scale-105" />
            </div>
            <div className="img2 w-full h-36 md:w-72 md:h-96 rounded-lg overflow-hidden md:mr-5 my-0 relative">
                <img src={cab} alt="" className="w-full h-full object-cover cursor-pointer transition-transform transform-gpu hover:scale-105"/>
            </div>
            <div className="img3 w-full h-36 md:w-72 md:h-96 rounded-lg overflow-hidden md:mr-5 my-0 relative">
                <img src={hotel} alt="" className="w-full h-full object-cover cursor-pointer transition-transform transform-gpu hover:scale-105"/>
            </div>
        </div>
    </div>
  );
};

export default About_us;