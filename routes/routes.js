const express = require("express");
const {app, checkAuthenticated} = require('../app');




const {
  registerUser,
  renderRegister,
  renderLogin,
  getUser,
  getFollowers,
  followUser
} = require("../controllers/userController");
const ejs = require("ejs");
const passport = require("passport");
const router = express.Router();




router.route("/users").get(getUser);
router.route("/users/followers").get(getFollowers);
router.route("/users/follow").post(followUser);
router.route("/users/register").post(registerUser);
router.route("/register").get( renderRegister);
router.route("/login").get( renderLogin);
router.route("/login").post(passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}),async(req,res)=>{
    console.log("works");
});

router.route("/search").get((req, res)=>{
    console.log(req.user);
    res.render("search.ejs",{followers:false,user:false});
});

 

module.exports = router ;
