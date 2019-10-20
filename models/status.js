const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  status: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  }
});

module.exports = mongoose.model('status', statusSchema);
