const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Cant be blank!'],
    min: 3,
  },
  lastName: {
    type: String,
    required: [true, 'Cant be blank!'],
    min: 3,
  },
  username: {
    type: String,
    lowercase: true,
    required: [true, 'Cant be blank!'],
    match: [/^[a-zA-Z0-9.-_]+$/, 'is invalid'],
    index: { unique: true },
    min: 3,
  },
  email: {
    type: String,
    required: [true, 'I need that'],
    match: [/\S+@\S+.\S+/, 'is invalid'],
    index: { unique: true },
  },
  password: {
    type: String,
    required: [true, 'Cant be blank!'],
    min: 6,
  },
  profile: {
    type: String,
    default: "user"
  }
});

module.exports = mongoose.model('user', userSchema);
