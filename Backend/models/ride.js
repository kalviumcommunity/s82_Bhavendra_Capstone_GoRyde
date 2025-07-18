const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickup: { type: String, required: true },
  drop: { type: String, required: true },
  pickupCoords: {
    lat: Number,
    lng: Number
  },

  dropCoords: {
    lat: Number,
    lng: Number
  },

  vehicleType: { type: String, required: true },
  status: {
    type: String,
    enum: ['requested', 'accepted', 'arriving', 'in_progress', 'completed', 'cancelled'],
    default: 'requested'
  },

    otp: { type: String }, 
  fare: { type: Number }, 
  startTime: { type: Date }, 
  endTime: { type: Date },  

  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', default: null },
  status: {
  type: String,
  enum: ['requested', 'accepted', 'arriving', 'started', 'completed', 'cancelled'],
  default: 'requested'},
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Ride', rideSchema);
