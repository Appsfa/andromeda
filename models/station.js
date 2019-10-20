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
  }
});

stationSchema.index({ station: 1, state: 1, country: 1 }, { unique: true });

module.exports = mongoose.model('station', stationSchema);
