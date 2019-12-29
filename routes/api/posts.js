const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check } = require("express-validator");

const PostsController = require("../../controllers/posts");

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  "/",
  [auth, [check("text", "Text is required").notEmpty()]],
  PostsController.createPost
);

module.exports = router;
