const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;


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

userSchema.pre('save', function(next){
  let user = this;

  if(!user.isModified('password')) return next();

  bcrypt.hash(user.password, SALT_ROUNDS, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  })
});

// userSchema.pre(['updateOne', 'findOneAndUpdate', 'update'], function(next) {
//   // debugger("Update");
//   this.update({}, { $set: {password: bcrypt.hashSync(this.getUpdate().$set.password, SALT_ROUNDS)} } );
//   console.log(this.getUpdate());
//   next();
// });

userSchema.methods.comparePass = function(testPass, callback){
  let user = this;
  bcrypt.compare(testPass, user.password, function(err, isMatch){
    if (err) return callback(err);
    callback(null, isMatch);
  })
}


module.exports = mongoose.model('user', userSchema);
