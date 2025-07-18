import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Axios from '../api/Axios';


const FindingDriver = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const vehicle = location.state?.vehicle || 'Taxi';

  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate driver found
      navigate('/ride-confirmed', { state: { vehicle } });
    }, 4000); // 4 seconds delay

    return () => clearTimeout(timer);
  }, [navigate, vehicle]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Looking for nearby {vehicle} drivers...</h1>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-500"></div>
      <p className="mt-4 text-sm text-gray-500">Please wait while we connect you with a driver.</p>
    </div>
  );
};

export default FindingDriver;
