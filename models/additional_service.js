const mongoose = require('mongoose');

const additional_serviceSchema = new mongoose.Schema({
  nameService: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  }
});

module.exports = mongoose.model('additional_service', additional_serviceSchema);
