const mongoose = require("mongoose");

const comment = mongoose.model("comment", {
  name_user: {
    type: String,
  },
  comment: {
    type: String,
  },
 
});

module.exports = comment;
