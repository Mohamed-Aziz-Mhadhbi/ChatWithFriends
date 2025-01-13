const express = require("express");
const router = express.Router();
const Event = require("../models/event");

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching events' });
  }
});

// GET a single event by ID
router.get("/:id", async (req, res) => {
  const eventId = req.params.id;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the event' });
  }
});

// POST a new event
router.post("/", async (req, res) => {
  const { event_name, event_date, event_location, event_description } = req.body;
  try {
    const newEvent = new Event({ event_name, event_date, event_location, event_description });
    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create the event' });
  }
});

// PUT (Update) an existing event by ID
router.put("/:id", async (req, res) => {
  const eventId = req.params.id;
  const { event_name, event_date, event_location, event_description } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { event_name, event_date, event_location, event_description },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update the event' });
  }
});

// DELETE an event by ID
router.delete("/:id", async (req, res) => {
  const eventId = req.params.id;
  try {
    const deletedEvent = await Event.findByIdAndRemove(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully', event: deletedEvent });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the event' });
  }
});

// Search events based on criteria
router.get("/search", async (req, res) => {
  const { keyword } = req.query;

  // Define your search criteria based on the 'keyword' parameter or any other criteria
  const searchCriteria = {
    event_name: { $regex: new RegExp(keyword, 'i') }, // 'i' for case-insensitive search
  };

  try {
    const events = await Event.find(searchCriteria);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for events' });
  }
});

module.exports = router;
