const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  service: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  }
});

module.exports = mongoose.model('service', serviceSchema);
