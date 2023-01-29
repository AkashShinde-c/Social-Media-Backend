const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const express = require("express");
const checkNotAuthenticated = require("../app").checkNotAuthenticated;

const registerUser = async (req, res) => {
  try {
    // create a new user

    console.log(req.body);
    console.log(req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const user = new User.SUser(req.body);
    await user.save();
    return res.json({ msg: "User created successfully", user });
  } catch (err) {
    if (err.name === "ValidationError") {
      console.log(err.errors);
      return res.status(400).send(err);
    }
    console.error(err.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

const renderRegister = async (req, res) => {
  try {
    res.render("register.ejs");
  } catch (error) {}
};

const renderLogin = async (req, res) => {
  try {
    res.render("login.ejs");
  } catch (error) {}
};

const getUser = async (req, res) => {
  const searcheduser = await User.SUser.findOne(
    { username: req.query.username },
    function (err, obj) {
      if (err) console.log(err);
    }
  )
    .clone()
    .catch(function (err) {
      console.log(err);
    });
  if (!searcheduser) {
    return res.send("User Not Found");
  }

  res.render("search.ejs", { user: searcheduser, followers:false });
};

const getFollowers = async (req, res) => {
  const searcheduser = await User.SUser.findOne(
    { username: req.query.username },
    function (err, obj) {
      if (err) console.log(err);
    }
  )
    .clone()
    .catch(function (err) {
      console.log(err);
    });
  if (!searcheduser) {
    return res.send("User Not Found");
  }

  console.log(searcheduser.followers);
  res.render("search.ejs", { user: false, followers: searcheduser.followers });
};

const followUser = async (req, res) => {
  try {
    const username = req.body.username;
    const currentUser = req.user;

    
    console.log(req.user);
    const user = await User.SUser.findOne({ username: username });
    if (!user) return res.status(404).send({ message: 'User not found' });

    // const isFollowing = user.followers.find(follower => follower.username === currentUser.username);
    // if (isFollowing) return res.status(400).send({ message: 'You are already following this user' });
    
    user.followers.push(currentUser._id);
    await user.save();

    res.send(`You started following ${username}`);
  } catch (err) {
    res.status(500).send("Error following user");
  }
};
module.exports = {
  registerUser,
  renderRegister,
  renderLogin,
  getUser,
  getFollowers,
  followUser,
};
