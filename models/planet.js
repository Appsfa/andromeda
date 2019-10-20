const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Cant be blank!'],
    index: { unique: true },
  },
  type:{
    type: String,
    required: [true, 'Cant be blank!'],
  },
  goBack:{
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('planet', planetSchema);
