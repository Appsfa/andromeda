const mongoose = require('mongoose');

const benefitSchema = new mongoose.Schema({
  benefit: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
    match: [/^[a-zA-Z0-9 ]+$/, 'is invalid'],
    min: 3,
  }
});

module.exports = mongoose.model('benefit', benefitSchema);
