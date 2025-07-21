const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true,
              match: [/.+@.+\..+/, "Please enter a valid email"]
         },
  password: { type: String, required: true },
  isDriver: { type: Boolean, default: false },
  otp: String,
  otpExpires: Date,
});

module.exports = mongoose.model('User', userSchema);
