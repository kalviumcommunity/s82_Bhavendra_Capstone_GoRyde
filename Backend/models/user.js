const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userschema = mongoose.Schema({
    Fullname: { type: String, unique: true, required: true },
    Email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/, "Please enter a valid email"]
    },
    PhoneNumber: { type: Number, unique: true, required: true },
    Password: { type: String, minLength: 4, required: true },


    otp: { type: String },
    otpExpires: { type: Date }
});


module.exports = mongoose.models.User || mongoose.model("User", userschema);
