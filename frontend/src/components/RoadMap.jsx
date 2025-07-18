import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Axios from '../api/Axios';

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 9.9252,  // Madurai latitude
  lng: 78.1198, // Madurai longitude
};

const RideMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD4ZyVVPFOn4RjVWXn4Hd1yeg7EpnH6dfQ", // ✅ Public demo key
  });

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={center}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default RideMap;
