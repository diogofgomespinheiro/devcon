const { validationResult } = require("express-validator");

const User = require("../models/User");
const Profile = require("../models/Profile");
const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    })

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) return res.status(404).json({ msg: "Post not found" });

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Server Error");
  }
}

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized"});
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Server Error");
  }
}