const express = require('express');
const router = express.Router();

const {
  acceptRide,
  updateRideStatus,
  getMyRides,
  bookRide,
  getAllRides,
  getDriverInfo,
  getRideById,
  getDriverDetailsForRide,
  getDriverForRide,
  rateRide
} = require('../controllers/rideController');

const { isAuthenticated, protect } = require('../middlewares/authMiddleware');

// Ride booking & status
router.post('/book', isAuthenticated, bookRide);
router.put('/accept/:rideId', isAuthenticated, acceptRide);
router.put('/status/:rideId', isAuthenticated, updateRideStatus);

// Get ride info
router.get('/all', getAllRides);
router.get('/my-rides', isAuthenticated, getMyRides);
router.get('/:rideId', getRideById);

// Driver info (choose one handler per route)
router.get('/driver-info/:rideId', isAuthenticated, getDriverInfo);
router.get('/driver-details/:rideId', getDriverDetailsForRide);
router.get('/driver/:rideId', isAuthenticated, getDriverForRide);

// Rating and payment
router.post('/rate/:rideId', isAuthenticated, rateRide);

module.exports = router;
