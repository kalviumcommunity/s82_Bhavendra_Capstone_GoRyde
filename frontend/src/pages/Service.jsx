import React from "react";

const services = [
    "Parcel",
    "Auto",
    "Bike",
    "Taxi-Economy",
    "Bike lite",
    "Taxi-Premium",
];

const Services = () => {
    return (
        <div className="bg-[#c9b5b4] min-h-screen flex flex-col items-center py-12">
            <h2 className="text-3xl font-bold bg-white px-6 py-2 rounded mb-12">Services</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
                {services.map((service, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                        <span className="font-semibold text-sm text-center">{service}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;





