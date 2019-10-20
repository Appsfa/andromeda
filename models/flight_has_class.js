const mongoose = require('mongoose');

const flight_has_classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  idFlight: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  totalSeats:{
    type: Number,
    required: [true, 'Cant be blank!'],
  }
});

flight_has_classSchema.index({ className: 1, idFlight: 1}, { unique: true });

module.exports = mongoose.model('flight_has_class', flight_has_classSchema);
