const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  },
  station: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  },
  planet: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  },
  username: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  },
  spaceship: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  },
  pricing: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  },
  nSeat: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  },
  dateStart: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  },
  dateArrival: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  },
  luggage: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  }

});

module.exports = mongoose.model('flight', flightSchema);
