const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
  // _id:{
  //   type: Number
  // },
  name: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  type:{
    type: String,
    required: [true, 'Cant be blank!'],
  },
});

module.exports = mongoose.model('planet', planetSchema);
