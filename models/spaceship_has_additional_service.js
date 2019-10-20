const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  idSpaceship: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  nameService: {
    type: String,
    required: [true, 'Cant be blank!'],
  }
});

countrySchema.index({ idSpaceship: 1, nameService: 1 }, { unique: true });

module.exports = mongoose.model('country', countrySchema);
