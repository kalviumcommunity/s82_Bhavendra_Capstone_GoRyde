import React from 'react';

const RideTrackingCard = () => {
  return (
    <div className="bg-gray-100 rounded-2xl p-6 m-6 shadow-lg w-full max-w-md mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="bg-white py-2 px-4 rounded-full shadow-sm">
          <p className="text-sm font-semibold text-gray-800">Captain on the way</p>
          <p className="text-xs text-gray-500">240 m away</p>
        </div>
        <div className="bg-white py-2 px-4 rounded-full shadow-sm">
          <p className="text-sm font-semibold text-gray-800">1 min</p>
        </div>
      </div>

      {/* PIN Input */}
      <div className="mb-6 text-center">
        <p className="text-sm text-gray-700 mb-2">Start your order with PIN</p>
        <div className="flex justify-center space-x-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-400 w-6 h-6 rounded-md" />
          ))}
        </div>
      </div>

      {/* Map Preview */}
      <div className="relative bg-gray-300 rounded-xl h-40 mb-6 flex items-center justify-center overflow-hidden">
        <p className="text-gray-500 z-10">Map Preview</p>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.125h15.003M2.25 21.375h.375m19.125-.375h.375m-19.5-1.875h19.5"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Pickup Info & Button */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-800">
          Pickup Point: <span className="text-gray-600">Fra...</span>
        </p>
        <button className="bg-white py-2 px-4 rounded-full text-sm font-semibold text-teal-600 shadow-sm hover:bg-teal-50 transition">
          Trip Details
        </button>
      </div>
    </div>
  );
};

export default RideTrackingCard;
