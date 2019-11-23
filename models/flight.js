const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  station: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  state: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  country: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  idSpaceship: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  originPlanet: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  arrivalPlanet: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  departureTimeOrigin: {
    type: Date,
    required: [true, 'Cant be blank!'],
  },
  arrivalTimeOrigin: {
    type: new Date("<YYYY-mm-dd>"),
    required: [true, 'Cant be blank!'],
  },
  departureTimeDestination: {
    type: Date,
    required: [true, 'Cant be blank!'],
  },
  arrivalTimeDestination: {
    type: Date,
    required: [true, 'Cant be blank!'],
  },
  travelDuration: {
    type: Number,
    required: [true, 'Cant be blank!'],
  },
  status: {
    type: String,
    required: [true, 'Cant be blank!'],
    default: 'waiting',
  }

});

module.exports = mongoose.model('flight', flightSchema);
