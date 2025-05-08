import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import HomePage from "./pages/HomePage"; 
import "./index.css"
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Service from "./pages/Service";
import Feature from "./pages/Feature";
import Interface from "./pages/Interface"
import Profile from './pages/Profile'
import DestinationCart from "./components/DestinationCart";
import ForgotPassword from "./pages/otp-page";
import RideSelection from "./pages/RideSelection";

function App() {
  return (
    <>
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/interface" element={<Interface/>}/>
      <Route path="/profile" element ={<Profile/>} />
      <Route path="/destination" element={<DestinationCart/>}/>
      <Route path="/features" element={<Feature/>}/>
      <Route path="/forgotpassword" element={<ForgotPassword/>} />
      <Route path="/selectride" element={<RideSelection/>}/>

      

    </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
