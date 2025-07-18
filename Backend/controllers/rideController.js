const Ride = require("../models/ride");
const Driver = require('../models/driver');
const ErrorHandler = require('../utils/ErrorHandler');


exports.bookRide = async (req, res) => {
  try {
    const { pickup, drop, pickupCoords, dropCoords, vehicleType } = req.body;

    if (!pickup || !drop || !vehicleType)
      return res.status(400).json({ message: "All fields are required" });

    const ride = await Ride.create({
      userId: req.user._id,
      pickup,
      drop,
      pickupCoords,
      dropCoords,
      vehicleType
    });

    res.status(201).json({ message: "Ride booked", ride });
  } catch (error) {
    res.status(500).json({ message: "Error booking ride", error });
  }
};

exports.getMyRides = async (req, res) => {
  try {
    const rides = await Ride.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch rides" });
  }
};


exports.acceptRide = async (req, res, next) => {
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (!ride) return next(new ErrorHandler('Ride not found', 404));

    // Assign current logged-in driver
    ride.driver = req.user.id;
    ride.status = 'Driver Accepted';
    await ride.save();

    res.status(200).json({ success: true, message: 'Ride accepted', ride });
  } catch (error) {
    next(error);
  }
};



exports.updateRideStatus = async (req, res) => {
  try {
    const { rideId } = req.params;
    const { status } = req.body;

    const validStatuses = ['arriving', 'started', 'completed', 'cancelled'];
    if (!validStatuses.includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    ride.status = status;
    await ride.save();

    res.status(200).json({ message: "Ride status updated", ride });
  } catch (err) {
    res.status(500).json({ message: "Error updating ride status", err });
  }
  if (status === 'started') {
    ride.startTime = new Date();
    ride.otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
  }

};


exports.getAllRides = async (req, res) => {
  const rides = await Ride.find().populate('userId').populate('driverId');
  res.status(200).json(rides);
};



exports.getDriverInfo = async (req, res) => {
  try {
    const { rideId } = req.params;
    const ride = await Ride.findById(rideId).populate('driverId');
    if (!ride || !ride.driverId) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    const { name, phoneNumber, vehicleNumber } = ride.driverId;
    res.status(200).json({ name, phoneNumber, vehicleNumber });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching driver info', error: err });
  }
};



exports.getRideById = async (req, res, next) => {
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    res.status(200).json(ride);
  } catch (err) {
    next(err);
  }
};



exports.getDriverDetailsForRide = async (req, res) => {
  const ride = await Ride.findById(req.params.rideId).populate('driverId');
  if (!ride || !ride.driverId) return res.status(404).json({ message: "Driver not assigned" });

  res.status(200).json({
    name: ride.driverId.name,
    phoneNumber: ride.driverId.phoneNumber,
    vehicleNumber: ride.driverId.vehicleNumber,
  });
};



exports.getDriverDetails = async (req, res) => {
  const ride = await Ride.findById(req.params.rideId).populate('driverId');
  if (!ride || !ride.driverId) {
    return res.status(404).json({ message: 'Driver not assigned' });
  }

  return res.json({
    name: ride.driverId.name,
    phoneNumber: ride.driverId.phoneNumber,
    vehicleNumber: ride.driverId.vehicleNumber,
  });
};



exports.getDriverForRide = async (req, res, next) => {
  try {
    const ride = await Ride.findById(req.params.rideId).populate('driverId');
    if (!ride || !ride.driverId) return res.status(404).json({ message: 'Driver not found' });

    const { name, phoneNumber, vehicleNumber } = ride.driverId;

    res.status(200).json({ name, phoneNumber, vehicleNumber });
  } catch (err) {
    next(err);
  }
};


exports.rateRide = async (req, res) => {
  const { rideId } = req.params;
  const { rating } = req.body;

  try {
    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    ride.rating = rating;
    await ride.save();

    res.status(200).json({ message: 'Rating submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving rating', error: err });
  }
};


exports.getMyRides = async (req, res) => {
  try {
    const rides = await Ride.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch rides', error: err });
  }
};


exports.rateRide = async (req, res) => {
  const { rideId } = req.params;
  const { rating, paymentMethod } = req.body;

  try {
    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    ride.rating = rating;
    ride.paymentMethod = paymentMethod;
    await ride.save();

    res.status(200).json({ message: 'Rating and payment method saved' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving data', error: err });
  }
};



