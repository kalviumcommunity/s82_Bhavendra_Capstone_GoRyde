const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userschema = mongoose.Schema({
    Fullname: { type: String, unique: true, required: true },
    Email: { type: String, unique: true, required: true, match: [/.+@.+\..+/,] },
    PhoneNumber: { type: Number, unique: true, required: true },
    Password: { type: String, minLength: 8, maxLength: 25, required: true },
});

userschema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('Password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(user.Password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongoose.model('User', userschema);

module.exports = User;
