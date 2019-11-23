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
    default: true,
  },
  dangerThings:{
    type: Boolean,
    required: [true, 'Cant be blank!'],
    default: false,
  },
  status:{
    type: String,
    required: [true, 'Cant be blank!'],
    default: "waiting",
  },
});

module.exports = mongoose.model('seat', seatSchema);
