const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
let User = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  userName: {
    type: String,
    index: true, unique: true, required: true,maxLength: 25,minLength: 3, 
  },
  refral_code: {
    type: String,
    index: true, unique: true, required: true,maxLength: 25,minLength: 3, 
  },
  email:{
    type: String,
    index: true, unique: true, required: true
  },
  mobile: {
    type: String,
    required: true,maxLength: 10,minLength: 6,
  },
  password: {
    type: String,
    required: true,maxLength: 25,minLength: 6,
  },
  type: {
    type: String,
    default:'custome'
  },
  auth_id: {
    type: String,
  },
  profile_image:
  {
    type: String,
  },
},{
    collection: 'user'
});

User.pre("save", function (next) {
  const user = this
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function(hashError, hash) {
          if (hashError) {
            return next(hashError)
          }
          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})
User.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};
User.plugin(uniqueValidator);
module.exports = mongoose.model('User',User);

