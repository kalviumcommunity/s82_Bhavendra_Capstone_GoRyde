import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage"; 
import "./index.css"
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      

    </Routes>
  );
}

export default App;
