const mongoose = require('mongoose');

// Define the schema for a room
const RoomSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: [true, 'Room type is required'], 
    trim: true 
  },
  price: { 
    type: Number, 
    required: [true, 'Room price is required'],
    min: [0, 'Price must be a positive number']
  },
  amenities: { 
    type: [String], 
    default: [] 
  },
  availability: { 
    type: Boolean, 
    default: true 
  },
  images: { 
    type: [String], 
    default: [] 
  },
}, { timestamps: true });

// Create and export the Room model
module.exports = mongoose.model('Room', RoomSchema);
