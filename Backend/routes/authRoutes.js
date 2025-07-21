const express = require('express');
const { sendOtpController, verifyOtpController } = require('../controllers/authController');
const { loginUser } = require("../controllers/authController");

const router = express.Router();

// POST request for forgot-password, sending OTP
router.post('/forgot-password', sendOtpController);

// POST request for verify-otp
router.post('/verify-otp', verifyOtpController);

router.post("/login", loginUser);

module.exports = router;
