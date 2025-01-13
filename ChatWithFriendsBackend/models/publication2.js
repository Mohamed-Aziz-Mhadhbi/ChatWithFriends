const mongoose = require("mongoose");

const publication2 = mongoose.model("Publication2", {
  image_user: {
    type: String,
  },
  name_user: {
    type: String,
  },
  contenu: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = publication2;
