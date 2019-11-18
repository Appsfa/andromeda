const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
    match: [/^[a-zA-Z0-9 ]+$/, 'is invalid'],
    min: 3,
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model('country', countrySchema);
