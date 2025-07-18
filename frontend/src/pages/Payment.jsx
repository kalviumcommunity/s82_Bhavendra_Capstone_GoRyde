import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Axios from '../api/Axios';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { rideId, distance, driver } = location.state || {};

  const amount = distance ? (distance * 10).toFixed(2) : '...';

  const [method, setMethod] = useState('card');
  const [rating, setRating] = useState(0);

  const handlePayment = async () => {
    try {
      await axios.post(`/api/ride/rate/${rideId}`, {
        rating,
        paymentMethod: method,
      });
      alert('Payment Successful!');
      navigate('/interface');
    } catch (err) {
      console.error('Error submitting rating/payment:', err);
      alert('Failed to complete payment');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-teal-600 mb-4 text-center">PAYMENT</h2>

        <div className="text-gray-700 space-y-2 mb-6 text-sm sm:text-base">
          <p><strong>Ride ID:</strong> {rideId}</p>
          <p><strong>Distance:</strong> {distance} km</p>
          <p><strong>Driver:</strong> {driver?.name}</p>
          <p><strong>Amount:</strong> ₹{amount}</p>
        </div>

        {/* Payment method selection */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Select Payment Method:</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option value="card">Credit / Debit Card</option>
            <option value="upi">UPI (PhonePe, Paytm, GPay)</option>
            <option value="cash">Cash on Ride</option>
          </select>
        </div>

        {/* Payment Inputs */}
        {method === 'card' && (
          <div className="space-y-2 mb-4 animate-fadeIn">
            <input type="text" placeholder="Card Number" className="w-full border p-2 rounded" />
            <div className="flex gap-2">
              <input type="text" placeholder="MM/YY" className="w-1/2 border p-2 rounded" />
              <input type="text" placeholder="CVV" className="w-1/2 border p-2 rounded" />
            </div>
            <input type="text" placeholder="Card Holder Name" className="w-full border p-2 rounded" />
          </div>
        )}

        {method === 'upi' && (
          <div className="space-y-2 mb-4 animate-fadeIn">
            <input
              type="text"
              placeholder="Enter your UPI ID (e.g., yourname@upi)"
              className="w-full border p-2 rounded"
            />
            <p className="text-sm text-gray-500">OR scan QR code below in your UPI app:</p>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=merchant@upi&pn=RideApp&am=50"
              alt="UPI QR"
              className="mx-auto w-40"
            />
          </div>
        )}

        {method === 'cash' && (
          <div className="mb-4 text-center text-green-700 font-medium">
            Please pay ₹{amount} in cash to the driver after the ride.
          </div>
        )}

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          className="w-full bg-teal-500 text-white py-2 rounded-lg shadow hover:bg-teal-600 transition duration-200"
        >
          {method === 'cash' ? 'Confirm Payment' : 'Pay Now'}
        </button>

        {/* ⭐ Rating Section */}
        {method !== 'cash' && (
          <div className="mt-6 text-left">
            <label className="block font-semibold mb-1">Rate Your Driver:</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileTap={{ scale: 1.2 }}
                  onClick={() => setRating(star)}
                  className={`text-3xl transition ${
                    rating >= star ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Payment;
