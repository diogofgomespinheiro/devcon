const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check } = require("express-validator");

const AuthController = require("../../controllers/auth");

// @route   GET api/auth
// @desc    Test route
// @access  Private
router.get("/", auth, AuthController.getUserData);

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password","Password is required").exists()
  ],
  AuthController.authenticateUser
);


module.exports = router;