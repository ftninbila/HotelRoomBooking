const express = require('express');
const Reservation = require('../models/Reservation');
const router = express.Router();

// Create a reservation
router.post('/', async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('user_id').populate('room_id');
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific reservation by ID
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('user_id').populate('room_id');
    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a reservation
router.put('/:id', async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(200).json(updatedReservation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a reservation
router.delete('/:id', async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!deletedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }
    res.status(200).json({ message: 'Reservation deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
