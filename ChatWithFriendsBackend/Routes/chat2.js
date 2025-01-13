const express = require("express");
const router = express.Router();
const Chat2 = require("../models/chat2");

// GET /chat2
router.get("/", async (req, res) => {
  try {
    const chats = await Chat2.find();
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /chat2
router.post("/", async (req, res) => {
  const { name_usr, message_content } = req.body;

  try {
    const chat = new Chat2({ name_usr, message_content });
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
