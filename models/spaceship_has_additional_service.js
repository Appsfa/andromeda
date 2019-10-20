const mongoose = require('mongoose');

const spaceship_has_additional_serviceSchema = new mongoose.Schema({
  idSpaceship: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  nameService: {
    type: String,
    required: [true, 'Cant be blank!'],
  }
});

spaceship_has_additional_serviceSchema.index({ idSpaceship: 1, nameService: 1 }, { unique: true });

module.exports = mongoose.model('spaceship_has_additional_service', spaceship_has_additional_serviceSchema);
