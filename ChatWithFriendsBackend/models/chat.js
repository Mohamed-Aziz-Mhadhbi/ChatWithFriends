const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  messages: [
    {
      content: {
        type: String,
      },
      isMe: {
        type: Boolean,
      },
      sentAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
module.exports = mongoose.model("Chat", chatSchema);
