const express = require('express');
const router = express.Router();
const { acceptRide,updateRideStatus,getMyRides,bookRide,getAllRides,getDriverInfo,getRideById,getDriverDetailsForRide,getDriverForRide} = require('../controllers/rideController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.post('/book', isAuthenticated, bookRide);
router.get('/my-rides', isAuthenticated, getMyRides);
router.put('/accept/:rideId', isAuthenticated, acceptRide);
router.put('/status/:rideId', isAuthenticated, updateRideStatus);
router.get('/all', getAllRides);
router.get('/driver/:rideId', isAuthenticated, getDriverInfo);
router.get('/:rideId', getRideById);
router.get('/driver/:rideId', getDriverDetailsForRide);
router.get('/driver/:rideId', isAuthenticated, getDriverForRide);



module.exports = router;
