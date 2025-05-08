import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [Fullname, Setfullname] = useState("");
  const [Email, SetEmail] = useState("");
  const [PhoneNumber, SetPhoneNumber] = useState("");
  const [Password, SetPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      Fullname: Fullname,
      Email: Email,
      PhoneNumber: PhoneNumber,
      Password: Password,
    };

    try {
      const response = await fetch("http://localhost:3004/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);
        alert("Signup successful!");
        navigate("/interface"); // Navigate to interface page
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      alert("Server error");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-white to-teal-100 px-4 font-sans">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">
          Sign Up to GoRyde
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              value={Fullname}
              onChange={(e) => Setfullname(e.target.value)}
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              value={Email}
              onChange={(e) => SetEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              value={PhoneNumber}
              onChange={(e) => SetPhoneNumber(e.target.value)}
              type="tel"
              placeholder="Enter your phone number"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              value={Password}
              onChange={(e) => SetPassword(e.target.value)}
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 font-medium hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
