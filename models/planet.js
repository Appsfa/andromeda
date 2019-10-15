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
});

module.exports = mongoose.model('planet', planetSchema);
