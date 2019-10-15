const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  lastName: {
    type: String,
    required: [true, 'Cant be blank!'],
  },
  username: {
    type: String,
    lowercase: true,
    required: [true, 'Cant be blank!'],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: { unique: true },
  },
  email: {
    type: String,
    required: [true, 'I need that'],
    match: [/\S+@\S+.\S+/, 'is invalid'],
    index: { unique: true },
  },
  password: {
    type: String,
    required: [true, 'Cant be blank!']
  },
  profile: {
    type: String,
    default: "user"
  }
});

module.exports = mongoose.model('user', userSchema);
