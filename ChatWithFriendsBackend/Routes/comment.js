const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

// GET all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new comment
router.post("/", async (req, res) => {
  const { name_user, comment } = req.body;
  try {
    const newComment = new Comment({
      name_user,
      comment,
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
