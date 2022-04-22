const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
let Store = new Schema({
  status:
  {
    type: Number,
    required: true,
  },
  image:
  {
    type: String,
    required: true,
  },
  name:
  {
    type: String,
    index: true, unique: true, required: true,maxLength:25,minLength: 3,
  },

},{
    collection: 'store'
});

Store.plugin(uniqueValidator);
module.exports = mongoose.model('Store',Store);
