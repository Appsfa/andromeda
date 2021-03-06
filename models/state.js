const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  state: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  },
  dateCreated:{
    type: Date,
    default: Date.now()
  }
});

stateSchema.index({ state: 1, country: 1 }, { unique: true });

module.exports = mongoose.model('state', stateSchema);
