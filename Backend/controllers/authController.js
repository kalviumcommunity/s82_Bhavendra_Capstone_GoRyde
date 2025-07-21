const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const generateOTP = require('../utils/generateOTP');
const sendEmail = require('../utils/sendEmail');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Send OTP to email
const sendOtpController = async (req, res) => {
  const { Email } = req.body;
  try {
    const user = await User.findOne({ Email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
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
  const { Email, otp } = req.body;
  try {
    const user = await User.findOne({ Email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (String(user.otp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};

// ✅ Define signupUser before exporting it
const signupUser = async (req, res) => {
  console.log("Signup controller hit:", req.body);
  try {
    const { name, email, password, isDriver } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      isDriver,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Define loginUser
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isDriver: user.isDriver,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Export after all are defined
module.exports = {
  sendOtpController,
  verifyOtpController,
  signupUser,
  loginUser,
};
