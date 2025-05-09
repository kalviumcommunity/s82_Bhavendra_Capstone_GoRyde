import React, { useState } from "react";
import { FaMotorcycle, FaTaxi, FaRupeeSign } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { PiMotorcycleFill } from "react-icons/pi";

const RideSelection = () => {
  const [selectedRide, setSelectedRide] = useState(0);

  const rides = [
    {
      type: "Bike",
      desc: "Quick Bike rides",
      eta: "3 mins",
      drop: "10:26 am",
      price: 31,
      originalPrice: 39,
      fastest: true,
      icon: <FaMotorcycle className="text-3xl text-purple-600" />,
    },
    {
      type: "Auto",
      desc: "Affordable auto rides",
      eta: "3 mins",
      drop: "10:29 am",
      price: 60,
      icon: <PiMotorcycleFill className="text-3xl text-yellow-600" />,
    },
    {
      type: "Cab Economy",
      desc: "Budget-friendly cabs",
      eta: "3 mins",
      drop: "10:29 am",
      price: 108,
      icon: <FaTaxi className="text-3xl text-yellow-500" />,
    },
    {
      type: "Cab Premium",
      desc: "Luxury cab experience",
      eta: "3 mins",
      drop: "10:29 am",
      price: 114,
      icon: <FaTaxi className="text-3xl text-yellow-700" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Map */}
      <div className="relative w-full h-[55vh] bg-gray-200">
        <img
          src="https://maps.googleapis.com/maps/api/staticmap?center=Madurai&zoom=14&size=600x400&key=YOUR_API_KEY"
          alt="Map view"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <div className="bg-white px-3 py-2 rounded-full shadow text-xs font-medium">Madurai Railway Station</div>
          <div className="bg-white px-3 py-2 rounded-full shadow text-xs font-medium">Meenakshi Amman Temple</div>
        </div>
      </div>

      {/* Ride Info Panel */}
      <div className="flex-1 bg-white px-4 py-3 rounded-t-3xl shadow-inner">
        <p className="text-green-600 text-sm mb-2">Saving ₹8 with special discount</p>

        {/* Ride List */}
        {rides.map((ride, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedRide(idx)}
            className={`cursor-pointer flex items-center justify-between p-4 rounded-xl mb-2 transition-colors duration-200 ${
              selectedRide === idx ? "border border-blue-400 bg-blue-50" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-4">
              {ride.icon}
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{ride.type}</h3>
                  {ride.fastest && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">FASTEST</span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{ride.desc || "Reliable ride"}</p>
                <p className="text-xs text-gray-400">{ride.eta} • Drop {ride.drop}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">₹{ride.price}</p>
              {ride.originalPrice && (
                <p className="text-sm text-gray-400 line-through">₹{ride.originalPrice}</p>
              )}
            </div>
          </div>
        ))}

        {/* Bottom Action Bar */}
        <div className="flex justify-between items-center mt-4 border-t pt-4">
          <button className="flex items-center space-x-1 text-sm">
            <FaRupeeSign />
            <span>Cash</span>
          </button>
          <button className="flex items-center space-x-1 text-sm">
            <MdLocalOffer className="text-lg text-green-600" />
            <span>Offers</span>
          </button>
        </div>

        <button className="mt-4 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl">
          Book {rides[selectedRide].type}
        </button>
      </div>
    </div>
  );
};

export default RideSelection;
