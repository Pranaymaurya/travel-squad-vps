// // import "./TourHero.css";
// // import { GrLocation } from "react-icons/gr";
// // import { HiFilter } from "react-icons/hi";
// // import vid from "../../assets/video.mp4";
// // console.log(vid);

// // const TourHero = () => {
// //   return (
// //     <div className="home z-0">
// //       <div className="overlay"></div>
// //       <video src={vid} muted autoPlay loop type="video/mp4"></video>

// //       <div className="homeContent container">
// //         <div className="textDiv">
// //           <span className="smallText">Our Packages</span>
// //           <h1 className="homeTitle">Search your holiday</h1>
// //         </div>
// //         <div className="cardDiv grid">
// //           <div className="destinationInput">
// //             <label htmlFor="city">Search your destination:</label>
// //             <div className="input flex items-center">
// //               <input type="text" placeholder="Enter name here..." />
// //               <GrLocation className="icon " />
// //               <HiFilter className="icon" />
// //             </div>
// //           </div>
// //           <div className="dataInput">
// //             <label htmlFor="date">Search your date:</label>
// //             <div className="input flex">
// //               <input type="date" />
// //             </div>
// //           </div>
// //           <div className="priceInput">
// //             <div className="label_total flex">
// //               <label htmlFor="price">Max price:</label>
// //               <h3 className="total">₹50,000</h3>
// //             </div>
// //             <div className="input flex">
// //               <input type="range" max="50,000" min="5,000" />
// //             </div>
// //           </div>
// //           <div className="searchOptions flex">
// //             <span>SEARCH</span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TourHero;

// // import React, { useState } from 'react';
// // import { GrLocation } from 'react-icons/gr';
// // import { HiFilter } from 'react-icons/hi';
// // import vid from "../../assets/video.mp4";
// // import "./TourHero.css";

// // const TourHero = () => {
// //   const [maxPrice, setMaxPrice] = useState(50000);

// //   const handlePriceChange = (event) => {
// //     setMaxPrice(event.target.value);
// //   };

// //   return (
// //     <div className="home z-0">
// //       <div className="overlay"></div>
// //       <video src={vid} muted autoPlay loop type="video/mp4"></video>

// //       <div className="homeContent container">
// //         <div className="textDiv">
// //           <span className="smallText">Our Packages</span>
// //           <h1 className="homeTitle">Search your holiday</h1>
// //         </div>
// //         <div className="cardDiv grid">
// //           <div className="destinationInput">
// //             <label htmlFor="city">Search your destination:</label>
// //             <div className="input flex items-center">
// //               <input type="text" placeholder="Enter name here..." />
// //               <GrLocation className="icon " />
// //               <HiFilter className="icon" />
// //             </div>
// //           </div>
// //           <div className="dataInput">
// //             <label htmlFor="date">Search your date:</label>
// //             <div className="input flex">
// //               <input type="date" />
// //             </div>
// //           </div>
// //           <div className="priceInput">
// //             <div className="label_total flex">
// //               <label htmlFor="price">Max price:</label>
// //               <h3 className="total">₹{maxPrice}</h3> {/* Display current price */}
// //             </div>
// //             <div className="input flex">
// //               <input
// //                 type="range"
// //                 max="50000"
// //                 min="5000"
// //                 value={maxPrice}
// //                 onChange={handlePriceChange}
// //               />
// //             </div>
// //           </div>
// //           <div className="searchOptions flex">
// //             <span>SEARCH</span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TourHero;

// import React, { useState } from 'react';
// import { GrLocation } from 'react-icons/gr';
// import { HiFilter } from 'react-icons/hi';
// import vid from "../../assets/video.mp4";
// import "./TourHero.css";

// const TourHero = () => {
//   const [maxPrice, setMaxPrice] = useState(50000);

//   const handlePriceChange = (event) => {
//     setMaxPrice(event.target.value);
//   };

//   return (
//     <div className="home z-0">
//       <div className="overlay"></div>
//       <video src={vid} muted autoPlay loop type="video/mp4"></video>

//       <div className="homeContent container">
//         <div className="textDiv">
//           <span className="smallText">Our Packages</span>
//           <h1 className="homeTitle">Search your holiday</h1>
//         </div>
//         <div className="cardDiv grid">
//           <div className="destinationInput">
//             <label htmlFor="city">Search your destination:</label>
//             <div className="input flex items-center">
//               <input type="text" placeholder="Enter name here..." />
//               <GrLocation className="icon " />
//               <HiFilter className="icon" />
//             </div>
//           </div>
//           <div className="dataInput">
//             <label htmlFor="date">Search your date:</label>
//             <div className="input flex">
//               <input type="date" />
//             </div>
//           </div>
//           <div className="priceInput">
//             <div className="label_total flex">
//               <label htmlFor="price">Max price:</label>
//               <h3 className="total">₹{maxPrice}</h3> {/* Display current price */}
//             </div>
//             <div className="input flex">
//               <input
//                 type="range"
//                 max="50000"
//                 min="0"  
//                 value={maxPrice}
//                 onChange={handlePriceChange}
//               />
//             </div>
//           </div>
//           <div className="searchOptions flex">
//             <span>SEARCH</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TourHero;
import "./TourHero.css";
import { GrLocation } from "react-icons/gr";
import { HiFilter } from "react-icons/hi";
import vid from "../../assets/video.mp4";
console.log(vid);

const TourHero = () => {
  return (
    <div className="home z-0">
      <div className="overlay"></div>
      <video src={vid} muted autoPlay loop type="video/mp4"></video>

      <div className="homeContent container">
        <div className="textDiv">
          <span className="smallText">Our Packages</span>
          <h1 className="homeTitle">Search your holiday</h1>
        </div>
        <div className="cardDiv grid">
          <div className="destinationInput">
            <label htmlFor="city">Search your destination:</label>
            <div className="input flex items-center">
              <input type="text" placeholder="Enter name here..." />
              <GrLocation className="icon " />
              <HiFilter className="icon" />
            </div>
          </div>
          <div className="dataInput">
            <label htmlFor="date">Search your date:</label>
            <div className="input flex">
              <input type="date" />
            </div>
          </div>
          <div className="priceInput">
            <div className="label_total flex">
              <label htmlFor="price">Max price:</label>
              <h3 className="total">₹50,000</h3>
            </div>
            <div className="input flex">
              <input type="range" max="50,000" min="5,000" />
            </div>
          </div>
          <div className="searchOptions flex">
            <span>SEARCH</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourHero;
