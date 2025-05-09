const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const router = express.Router();

router.get('/signup', async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ message: "Users fetched successfully", data: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/send', async (req, res) => {
  try {
    const getuser = await User.find()
    if (!getuser)
      return res.status(400).json({ msg: "No data" })
    res.status(200).json({ msg: getuser })
  } catch (err) {
    res.status(500).json({ msg: err })
  }
})





// Make sure this is imported at the top

router.post('/signup', async (req, res) => {
  try {
    const { Fullname, Email, PhoneNumber, Password } = req.body;
    if (!Fullname || !Email || !PhoneNumber || !Password)
      return res.status(400).json({ message: "Fields are required" });

    const existingUser = await User.findOne({
      $or: [{ Email }, { PhoneNumber }]
    });

    if (existingUser) {
      return res.status(400).json({ message: "User exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 10)
    const savedb = new User({
      Fullname,
      Email,
      PhoneNumber,
      Password: hashedPassword
    });

    await savedb.save();
    res.status(200).json({ message: "User saved DB", data: savedb });
  } catch (err) {
    console.log("Error occurred", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({ Email });
    if (!user)
      return res.status(400).json({ message: "Invalid email" });
    console.log(user.Password)

    const isMatch = await bcrypt.compare(Password, user.Password)
    console.log(isMatch)
    if (!isMatch)
      return res.status(400).json({ message: "Invalid  password" });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});






router.put('/signup/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated", data: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




router.delete('/signup/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted", data: deletedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router