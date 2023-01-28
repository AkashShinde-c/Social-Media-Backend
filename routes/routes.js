const express = require("express");
const {registerUser} = require('../controllers/userController')
const router = express.router();


router.route("/users").post(registerUser);

module.exports = router;