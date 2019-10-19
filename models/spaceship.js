const mongoose = require('mongoose');

const spaceshipSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  totalSeats:{
    type: Number,
    required: [true, 'Cant be blank!'],
  }
});

module.exports = mongoose.model('spaceship', spaceshipSchema);
