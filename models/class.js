const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
    match: [/^[a-zA-Z0-9 ]+$/, 'is invalid'],
    min: 3,
  },
  cost: {
    type: String,
    required: [true, 'Cant be blank!'],
    match: [/^[a-zA-Z0-9 ]+$/, 'is invalid'],
    min: 3,

  }
});

module.exports = mongoose.model('class', classSchema);
