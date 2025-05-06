const User = require('../models/User'); // Assuming you are using CommonJS

const generateOTP = require('../utils/generateOTP'); // For generating OTP
const sendEmail = require('../utils/sendEmail'); // For sending emails

// Send OTP to email
const sendOtpController = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ Email: email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes expiry
    await user.save();

    await sendEmail(
      user.Email,
      "Your GoRyde OTP",
      `Your OTP is ${otp}. It expires in 5 minutes.`
    );

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP
const verifyOtpController = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ Email: email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.otp = null; // Clear OTP after verification
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};

module.exports = { sendOtpController, verifyOtpController };
