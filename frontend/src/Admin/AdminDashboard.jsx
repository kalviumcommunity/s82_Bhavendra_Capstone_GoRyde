import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3004/api/ride/all') // Backend route to fetch all rides
      .then(res => setRides(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">All Ride Requests</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">User</th>
            <th className="p-3 border">Pickup</th>
            <th className="p-3 border">Drop</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Vehicle</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride, i) => (
            <tr key={i} className="border-t">
              <td className="p-2 border">{ride.userId}</td>
              <td className="p-2 border">{ride.pickup}</td>
              <td className="p-2 border">{ride.drop}</td>
              <td className="p-2 border">{ride.status}</td>
              <td className="p-2 border">{ride.vehicleType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
