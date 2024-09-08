// import React from "react";
const Item = (props) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 relative transform hover:scale-110 transition-transform duration-300">
      <img
        className="w-full h-46 sm:h-56 object-cover"
        src={props.image}
        alt={props.name}
      />
      <div className="px-4 py-2 sm:px-6 sm:py-4">
        <div className="font-bold text-xl mb-2">{props.name}</div>
        <div className="flex items-center mb-2">
          <div className="text-gray-900 font-bold">
            {props.nights} Nights - {props.days} Days
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
