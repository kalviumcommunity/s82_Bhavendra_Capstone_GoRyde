import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSendOtp = async () => {
    try {
      const res = await fetch('http://localhost:3004/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Error sending OTP");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendOtp();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 to-teal-100">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-teal-600 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
