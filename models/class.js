const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  },
  cost: {
    type: String,
    required: [true, 'Cant be blank!'],
  }
});

module.exports = mongoose.model('class', classSchema);
