const express = require('express');
const {
  sendOtpController,
  verifyOtpController,
  loginUser,
  signupUser
} = require('../controllers/authController');

const router = express.Router();

// Auth Routes
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/forgot-password', sendOtpController);
router.post('/verify-otp', verifyOtpController);

module.exports = router;
