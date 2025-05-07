import React, { useState, useEffect } from 'react';

const ForgotPassword = () => {
  const [Email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('send'); // 'send' | 'verify'
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSendOtp = async () => {
    if (!Email) return alert('Please enter an email');

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3004/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email }),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        setStep('verify');
        setResendTimer(30);
      }
    } catch (err) {
      console.error(err);
      alert('Error sending OTP');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!otp) return alert('Please enter the OTP');

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3004/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email, otp }),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        // Proceed to reset password or login
        console.log('OTP Verified');
      }
    } catch (err) {
      console.error(err);
      alert('Error verifying OTP');
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 'send') handleSendOtp();
    else handleVerifyOtp();
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    handleSendOtp(); // Same API as initial send
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 to-teal-100">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-teal-600 text-center">
          {step === 'send' ? 'Forgot Password' : 'Verify OTP'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="Enter your registered email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={step === 'verify'}
            required
          />

          {step === 'verify' && (
            <>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />

              <button
                type="button"
                className={`w-full py-2 rounded-xl font-semibold text-sm ${
                  resendTimer > 0
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-yellow-400 hover:bg-yellow-500 text-black'
                }`}
                onClick={handleResendOtp}
                disabled={resendTimer > 0}
              >
                {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
              </button>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold"
            disabled={loading}
          >
            {loading
              ? 'Processing...'
              : step === 'send'
              ? 'Send OTP'
              : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
