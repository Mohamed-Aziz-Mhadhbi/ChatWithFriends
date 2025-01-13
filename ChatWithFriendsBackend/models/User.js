const mongoose = require('mongoose');

const User = mongoose.model("User", {
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  code: {
    type: String,
  },
});

module.exports = User;