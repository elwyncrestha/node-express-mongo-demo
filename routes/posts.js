const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Get All
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

/*router.post('/', (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  post.save()
  .then(data => res.json(data))
  .catch(err => res.json({message: err}));
});*/

// Save post
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

// Get Specific Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

// Delete Post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.remove({ _id: req.params.id });
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

// Update Post
router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } }
    );
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
