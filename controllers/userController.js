const {SUser, Post} = require("../models/userModel");
const express = require("express");

const registerUser = async(req, res) => {
    try {
        // create a new user
        const user = new User(req.body);
        await user.save();
        return res.json({ msg: 'User created successfully', user });
      } catch (err) {
        if (err.name === 'ValidationError') {
          console.log(err.errors);
          return res.status(400).json({ msg: 'Invalid input' });
        }
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
      }
}
 
module.exports = {registerUser}