const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  }
});

module.exports = mongoose.model('country', countrySchema);
