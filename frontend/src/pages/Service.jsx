import React from "react";
import { useNavigate } from "react-router-dom";

const services = [
    "Parcel",
    "Auto",
    "Bike",
    "Taxi-Economy",
    "Bike lite",
    "Taxi-Premium",
];

const Services = () => {
    const navigate = useNavigate();

    const handleServiceClick = (service) => {
        navigate("/destination");
    };

    return (
        <div className="bg-gradient-to-br from-teal-100 to-teal-300 min-h-screen flex flex-col items-center py-16 px-4">
            <h2 className="text-4xl font-extrabold text-gray-800 bg-white px-8 py-3 rounded-xl shadow-md mb-16">
                Our Services
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12">
                {services.map((service, index) => (
                    <div
                        key={index}
                        onClick={() => handleServiceClick(service)}
                        className="cursor-pointer flex flex-col items-center space-y-4 p-4 bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
                    >
                        <div className="w-20 h-20 bg-gradient-to-tr from-teal-200 to-teal-100 rounded-xl flex items-center justify-center text-2xl text-teal-700 shadow-inner">
                            🚗
                        </div>
                        <span className="font-semibold text-sm text-center text-gray-700">
                            {service}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
