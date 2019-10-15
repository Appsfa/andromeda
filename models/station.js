const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  state: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  station:{
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  }
});

module.exports = mongoose.model('station', stationSchema);
