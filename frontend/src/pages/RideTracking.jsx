import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const RideTracking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const rideId = location.state?.rideId || localStorage.getItem('rideId');

  const pickup =
    location.state?.pickupCoords ||
    JSON.parse(localStorage.getItem('pickupCoords')) || [12.9716, 77.5946];
  const drop =
    location.state?.dropCoords ||
    JSON.parse(localStorage.getItem('dropCoords')) || [12.9352, 77.6146];

  const [driverPosition, setDriverPosition] = useState(pickup);
  const [eta, setEta] = useState(null);
  const [distance, setDistance] = useState(null);
  const [status, setStatus] = useState('');
  const [driver, setDriver] = useState(null);

 /*useEffect(() => {
    setStatus('accepted');
    setDriver({
      name: 'Driver',
      phoneNumber: '+6305065039',
      vehicleNumber: 'TN 01 AA 1234',
    });
  }, []);*/

  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      if (step <= 1) {
        const lat = pickup[0] + (drop[0] - pickup[0]) * step;
        const lng = pickup[1] + (drop[1] - pickup[1]) * step;
        setDriverPosition([lat, lng]);

        const dist = getDistanceFromLatLonInKm(lat, lng, drop[0], drop[1]);
        setDistance(dist.toFixed(2));
        setEta(Math.ceil((dist / 0.5) * 60));

        step += 0.02;
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [pickup, drop]);

  useEffect(() => {
    if (rideId) {
      axios.get(`/api/ride/${rideId}`)
        .then(res => setStatus(res.data.status))
        .catch(console.error);

      axios.get(`/api/ride/driver/${rideId}`)
        .then(res => setDriver(res.data))
        .catch(console.error);
    }
  }, [rideId]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-start">
      <h2 className="text-2xl font-bold text-center py-4 text-teal-700">Tracking Your Ride...</h2>

      {eta && (
        <p className="text-lg text-gray-700 font-semibold mb-2">
          ETA: {eta} min &bull; Distance: {distance} km
        </p>
      )}

      <MapContainer center={pickup} zoom={14} style={{ height: '60%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={pickup}
          icon={L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            iconSize: [32, 32],
          })}
        />

        <Marker
          position={drop}
          icon={L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            iconSize: [32, 32],
          })}
        />

        <Marker
          position={driverPosition}
          icon={L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
            iconSize: [40, 40],
          })}
        />

        <Polyline positions={[pickup, driverPosition]} color="teal" />
      </MapContainer>

      {['accepted', 'arriving'].includes(status) && driver && (
        <div className="mt-4 bg-white rounded-xl p-5 shadow-md w-[90%] max-w-xl text-left">
          <h3 className="text-xl font-bold mb-2">Driver Details</h3>
          <p><strong>Name:</strong> {driver.name}</p>
          <p><strong>Phone:</strong> {driver.phoneNumber}</p>
          <p><strong>Vehicle:</strong> {driver.vehicleNumber}</p>

          <div className="flex gap-4 mt-4">
            <a
              href={`tel:${driver.phoneNumber}`}
              className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
            >
              Call Driver
            </a>
            <button
              onClick={() => {
                alert('Ride cancelled');
                navigate('/interface');
              }}
              className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
            >
              Cancel Ride
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RideTracking;
