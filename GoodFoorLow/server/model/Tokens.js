const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
let Tokens = new Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
  },
  device_token: {
    type: String,
    required: true,minLength: 1, 
  },
  device_type: {
    type: String,
    required: true,minLength: 1, 
  },
  user_type:{
    type: Number,
    Default: 1,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now,
    index: true
  }
},{
    collection: 'tokens'
});

module.exports = mongoose.model('Tokens',Tokens);

