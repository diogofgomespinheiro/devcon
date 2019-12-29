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

    if (!user) return res.status(404).json({ msg: "User doesn´t exist" });

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
    if (err.kind === "ObjectId") return res.status(404).json({ msg: "User doesn´t exist" });
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

exports.addLikeToPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (post.likes.filter(like => like.user.toString() === req.user.id ).length > 0) {
      return res.status(400).json({ msg: "Post already liked"});
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Server Error");
  }
}

exports.removeLikeFromPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (post.likes.filter(like => like.user.toString() === req.user.id ).length === 0) {
      return res.status(400).json({ msg: "Post has not yet been liked"});
    }

    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

    if (removeIndex !== -1) {
      post.likes.splice(removeIndex, 1);
      await post.save();
    }

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Server Error");
  }
}

exports.addCommentToPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User doesn´t exist" });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };

    post.comments.unshift(newComment);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Server Error");
  }
}

exports.deleteCommentFromPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    const comment = post.comments.find(comment => comment.id === req.params.comment_id);

    if (!comment) return res.status(404).json({ msg: "Comment does not exist"});

    if (comment.user.toString() !== req.user.id) return res.status(401).json({ msg: "User not authorized"});

    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

    if (removeIndex !== -1) {
      post.comments.splice(removeIndex, 1);
      await post.save();
    }

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") return res.status(404).json({ msg: "Post not found" });
    res.status(500).send("Server Error");
  }
}