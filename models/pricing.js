const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  pricing: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  },
  cost: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  }
});

module.exports = mongoose.model('pricing', pricingSchema);
