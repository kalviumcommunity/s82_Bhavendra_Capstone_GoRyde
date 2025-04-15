import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const InterfacePage = () => {
  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen">

      {/* Header */}
      <header className="bg-teal-500 text-white py-6 px-8 flex justify-between items-center shadow-md sticky top-0 z-50">
        <h1 className="text-4xl font-extrabold italic tracking-wide hover:scale-105 transition-transform duration-300">
          GoRyde
        </h1>
        <nav className="space-x-8 text-lg font-semibold flex items-center">
          <Link to="/features" className="hover:text-yellow-200 transition-colors duration-300">Features</Link>
          <Link to="/book" className="hover:text-yellow-200 transition-colors duration-300">Book a Ride</Link>
          <Link to="/profile" className="hover:text-yellow-200 transition-colors duration-300 text-2xl">
            <FaUserCircle />
          </Link>
        </nav>
      </header>

      {/* Input Section */}
      <section className="flex justify-center items-center gap-6 py-10 flex-wrap bg-teal-50">
        <input
          type="text"
          placeholder="PickUp Location"
          className="bg-white px-5 py-4 w-80 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300"
        />
        <input
          type="text"
          placeholder="Drop Location"
          className="bg-white px-5 py-4 w-80 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300"
        />
      </section>

      {/* Why Choose Section */}
      <section className="text-center py-16 bg-sky-100">
        <h2 className="text-3xl font-extrabold mb-10 text-gray-800">Why Choose GoRyde?</h2>
        <div className="flex justify-center gap-10 flex-wrap px-4">
          {[
            { title: "Quick Booking", desc: "Book your ride in just a few taps" },
            { title: "Safe & Secure", desc: "Verified drivers and real-time tracking" },
            { title: "Affordable Rides", desc: "Competitive pricing for every trip" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 w-64 rounded-3xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
            >
              <h3 className="font-bold text-xl mb-3 text-teal-600">{item.title}</h3>
              <p className="text-sm text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-coral-100 text-center py-16 px-4 rounded-t-3xl shadow-inner">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Experience Comfortable and Affordable Rides
        </h2>
        <p className="text-lg mb-8 text-gray-700">
          Book a ride and enjoy the best service with GoRyde.
        </p>
        <Link
          to="/book"
          className="inline-block bg-teal-500 text-white px-8 py-3 font-bold rounded-full shadow-md hover:bg-teal-600 transition-all duration-300"
        >
          Book a Ride
        </Link>
      </section>

    </div>
  );
};

export default InterfacePage;
