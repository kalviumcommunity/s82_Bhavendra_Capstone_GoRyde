import React from "react";
import { useNavigate } from "react-router-dom";
import Axios from '../api/Axios';

const services = [
  { name: "Parcel", icon: "📦" },
  { name: "Auto", icon: "🛺" },
  { name: "Bike", icon: "🏍️" },
  { name: "Taxi-Economy", icon: "🚗" },
  { name: "Bike lite", icon: "🚲" },
  { name: "Taxi-Premium", icon: "🚖" },
];

const Services = () => {
  const navigate = useNavigate();

  const handleServiceClick = (selectedService) => {
  localStorage.setItem("selectedVehicle", selectedService.name); 
  navigate("/finding-driver", { state: { vehicle: selectedService.name } });
};

  return (
    <div className="bg-gradient-to-br from-teal-100 to-teal-300 min-h-screen flex flex-col items-center py-16 px-4">
      <h2 className="text-4xl font-extrabold text-gray-800 bg-white px-10 py-4 rounded-xl shadow-xl mb-12">
        Our Services
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
        {services.map((service, index) => (
          <div
            key={index}
            onClick={() => handleServiceClick(service)}
            className="cursor-pointer w-44 h-52 p-4 bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center space-y-4 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="w-24 h-24 bg-gradient-to-tr from-teal-300 to-yellow-200 rounded-full flex items-center justify-center shadow-inner text-5xl">
              {service.icon}
            </div>
            <span className="text-center text-gray-800 font-semibold text-lg">
              {service.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
