const mongoose = require('mongoose');

const benefitSchema = new mongoose.Schema({
  benefit: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  }
});

module.exports = mongoose.model('benefit', benefitSchema);
