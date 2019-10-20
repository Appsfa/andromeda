const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  className:{
    type: String,
    required: [true, 'Cant be blank!'],
  },
  idFlight:{
    type: String,
    required: [true, 'Cant be blank!'],
  },
  username:{
    type: String,
    required: [true, 'Cant be blank!'],
  },
  luggage:{
    type: Boolean,
    required: [true, 'Cant be blank!'],
  },
  dangerThings:{
    type: Boolean,
    required: [true, 'Cant be blank!'],
  },
  status:{
    type: String,
    required: [true, 'Cant be blank!'],
  },
});

module.exports = mongoose.model('seat', seatSchema);
