import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Axios from '../api/Axios';

const MyRides = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    axios.get('/api/ride/my-rides')
      .then(res => setRides(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-teal-700">My Ride History</h2>
      {rides.map((ride, idx) => (
        <div key={ride._id} className="bg-white shadow-md rounded p-4 mb-4">
          <p><strong>Pickup:</strong> {ride.pickup}</p>
          <p><strong>Drop:</strong> {ride.drop}</p>
          <p><strong>Status:</strong> {ride.status}</p>
          <p><strong>Vehicle:</strong> {ride.vehicleType}</p>
          <p><strong>Rating:</strong> {ride.rating || 'Not rated'}</p>
        </div>
      ))}
    </div>
  );
};

export default MyRides;
