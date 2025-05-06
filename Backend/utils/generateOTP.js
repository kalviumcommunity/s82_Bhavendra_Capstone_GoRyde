const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);  // Generate a random 6-digit OTP
  return otp;
};

// Export the function using CommonJS
module.exports = generateOTP;
