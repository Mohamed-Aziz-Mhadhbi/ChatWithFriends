const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  event_name: {
    type: String,
    required: true,
  },
  event_date: {
    type: Date,
    required: true,
  },
  event_location: String,
  event_description: String,
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participant",
    },
  ],
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
