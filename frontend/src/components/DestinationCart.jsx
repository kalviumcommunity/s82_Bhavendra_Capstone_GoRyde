import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DestinationCart = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-[#d0f0f9] min-h-screen flex items-center justify-center px-4">
            <div className="backdrop-blur-md bg-white/30 border border-white/50 rounded-3xl shadow-2xl p-10 w-full max-w-xl space-y-10">
                <h2 className="text-3xl font-bold italic text-gray-800">Your Destination</h2>

                <form className="flex flex-col space-y-6">
                    {/* Pickup */}
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold mb-2 text-gray-800">PickUp:</label>
                        <input
                            type="text"
                            placeholder="Enter pickup location"
                            className="bg-white/70 border border-gray-300 rounded-xl px-5 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200"
                        />
                    </div>

                    {/* Drop */}
                    <div className="flex flex-col">
                        <label className="text-lg font-semibold mb-2 text-gray-800">Drop:</label>
                        <input
                            type="text"
                            placeholder="Enter drop location"
                            className="bg-white/70 border border-gray-300 rounded-xl px-5 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200"
                        />
                    </div>

                    {/* Button */}
                    <div className="pt-4">
                        <Link
                            to="/service"
                            className="inline-block bg-teal-500 text-white px-8 py-3 font-bold rounded-full shadow-md hover:bg-teal-600 transition-all duration-300"
                        >
                            Book a Ride
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DestinationCart;
