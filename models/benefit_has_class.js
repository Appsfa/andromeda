const mongoose = require('mongoose');

const benefit_has_classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: [true, 'Cant be blank!'],
    match: [/^[a-zA-Z0-9 ]+$/, 'is invalid'],
    min: 3,
  },
  benefit: {
    type: String,
    required: [true, 'Cant be blank!'],
    match: [/^[a-zA-Z0-9 ]+$/, 'is invalid'],
    min: 3,
  }
});

benefit_has_classSchema.index({ className: 1, benefit: 1 }, { unique: true });

module.exports = mongoose.model('benefit_has_class', benefit_has_classSchema);
