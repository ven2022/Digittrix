const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

let Admin = new Schema({
  email: {
    type: String,
    index: true, unique: true, required: true 
  },
  password: {
    type: String,
    required: true
  }
},{
    collection: 'supperadmin'
});
Admin.plugin(uniqueValidator);
module.exports = mongoose.model('Admin',Admin);

