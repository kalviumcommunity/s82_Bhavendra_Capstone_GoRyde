exports.getAllRides = async (req, res) => {
  try {
    const rides = await Ride.find()
      .populate("userId", "Fullname Email")
      .populate("driverId", "Fullname PhoneNumber");

    res.status(200).json(rides);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch rides" });
  }
};
