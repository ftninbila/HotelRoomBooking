const express = require('express');
const Room = require('../models/Room');
const router = express.Router();

// Add a room
router.post('/', async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a room
router.put('/:roomId', async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.roomId, req.body, { new: true });
    if (!updatedRoom) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(updatedRoom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

// Delete a room
router.delete('/:roomId', async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
