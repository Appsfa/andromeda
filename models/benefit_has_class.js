const mongoose = require('mongoose');

const benefit_has_classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  benefit: {
    type: String,
    required: [true, 'Cant be blank!'],
  }
});

benefit_has_classSchema.index({ className: 1, benefit: 1 }, { unique: true });

module.exports = mongoose.model('benefit_has_class', benefit_has_classSchema);
