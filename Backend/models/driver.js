const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  vehicleNumber: String,
  email: String,
  password: String
});

module.exports = mongoose.model('Driver', driverSchema);
