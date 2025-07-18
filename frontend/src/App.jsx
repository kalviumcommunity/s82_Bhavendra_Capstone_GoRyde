import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Service from "./pages/Service";
import Interface from "./pages/Interface";
import Profile from "./pages/Profile";
import DestinationCart from "./components/DestinationCart";
import ForgotPassword from "./pages/otp-page";
import RoadMap from "./components/RoadMap";
import FindingDriver from "./pages/FindingDriver";
import RideConfirmed from "./pages/RideConfirmed " 
import RideTracking from "./pages/RideTracking";
import Payment from "./pages/Payment";
import MyRides from "./pages/MyRides";


import "./index.css";
import 'leaflet/dist/leaflet.css'; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/interface" element={<Interface />} />
        <Route path="/service" element={<Service />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/destination" element={<DestinationCart />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/map" element={<RoadMap />} />
        <Route path="/finding-driver" element={<FindingDriver/>} />
        <Route path='/ride-confirmed' element={<RideConfirmed/>}/>
        <Route path='/ridetrack' element={<RideTracking/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/my-rides' element={<MyRides/>}/>
  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
