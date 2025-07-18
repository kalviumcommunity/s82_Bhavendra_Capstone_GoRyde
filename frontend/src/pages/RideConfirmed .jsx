import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Axios from '../api/Axios';
<Link to="/ridetrack">Track Your Ride</Link>

const RideConfirmed = () => {
  const location = useLocation();
  const vehicle = location.state?.vehicle || 'Taxi';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">🎉 Ride Confirmed!</h1>
      <p className="text-xl mb-6">Your Captain is on the way...</p>
      <Link to="/ridetrack" className="bg-teal-600 text-white px-6 py-3 rounded-full shadow hover:bg-teal-700 transition">
        Track Your Ride
      </Link>
    </div>
  );
};

export default RideConfirmed;
