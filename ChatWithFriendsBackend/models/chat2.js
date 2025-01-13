const mongoose = require("mongoose");

const chat2 = mongoose.model("chat2", {
  name_usr: {
    type: String,
  },
  message_content: {
    type: String,
  },
});

module.exports = chat2;
