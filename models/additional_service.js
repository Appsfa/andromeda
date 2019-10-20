const mongoose = require('mongoose');

const additional_serviceSchema = new mongoose.Schema({
  nameService: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
    match: [/^[a-zA-Z0-9 ]+$/, 'is invalid'],
    min: 3,
  }
});

module.exports = mongoose.model('additional_service', additional_serviceSchema);
