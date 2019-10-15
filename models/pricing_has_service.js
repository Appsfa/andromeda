const mongoose = require('mongoose');

const pricing_has_serviceSchema = new mongoose.Schema({
  pricing: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  },
  service: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  }
});

module.exports = mongoose.model('pricing_has_service', pricing_has_serviceSchema);
