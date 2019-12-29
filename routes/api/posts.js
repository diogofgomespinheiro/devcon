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

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get("/",auth,PostsController.getAllPosts);

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private
router.get("/:id",auth,PostsController.getPostById);

module.exports = router;
