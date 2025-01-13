const mongoose = require("mongoose");

const Publication = mongoose.model("Publication", {
  contenu: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = Publication;
