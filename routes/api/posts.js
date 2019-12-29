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

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete("/:id",auth,PostsController.deletePost);

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put("/like/:id", auth, PostsController.addLikeToPost);

// @route   PUT api/posts/unlike/:id
// @desc    Remove like from post
// @access  Private
router.put("/unlike/:id", auth, PostsController.removeLikeFromPost);

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").notEmpty()]],
  PostsController.addCommentToPost
);

// @route   Delete api/posts/comment/:id/:comment_id
// @desc    Delete comment from post
// @access  Private
router.delete("/comment/:id/:comment_id", auth, PostsController.deleteCommentFromPost)

module.exports = router;
