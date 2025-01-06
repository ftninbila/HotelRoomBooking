const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    room_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    check_in: { type: Date, required: true },
    check_out: { type: Date, required: true },
    guests: { type: Number, required: true, min: 1 },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model('Reservation', ReservationSchema);
