const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check } = require("express-validator");

const ProfileController = require("../../controllers/profile");

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required")
        .not()
        .isEmpty(),
      check("skills", "Skills is required")
        .not()
        .isEmpty()
    ]
  ],
  ProfileController.createOrUpdateProfile
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get("/", ProfileController.getAllProfiles);

// @route   GET api/profile/user/:user_id
// @desc    Get user Profile
// @access  Public
router.get("/user/:user_id", ProfileController.getUserProfileById);

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", auth, ProfileController.getCurrentUserProfile);

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete("/", auth, ProfileController.deleteUserData);

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put("/experience",[
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("company", "Company is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  ProfileController.addExperience
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete("/experience/:exp_id", auth, ProfileController.deleteExperience);

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put("/education",[
  auth,
  [
    check("school", "School is required")
      .not()
      .isEmpty(),
    check("degree", "Degree is required")
      .not()
      .isEmpty(),
    check("fieldofstudy", "Field of study is required")
      .not()
      .isEmpty(),
    check("from", "From date is required")
      .not()
      .isEmpty()
  ]
],
ProfileController.addEducation
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete("/education/:edu_id", auth, ProfileController.deleteEducation);

module.exports = router;
