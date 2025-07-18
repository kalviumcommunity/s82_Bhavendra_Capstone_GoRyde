const { getAllRides } = require("../controllers/rideController");

router.get("/all-rides", isAuthenticated, isAdmin, getAllRides); // isAdmin middleware required
