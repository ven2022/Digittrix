const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
let Goodwords = new Schema({
  name: {
    type: String,
    required: true,maxLength: 20,minLength: 3,
  },
  image:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true,maxLength: 500,minLength: 5,
  }

},{
    collection: 'goodwords'
});
Goodwords.plugin(uniqueValidator);
module.exports = mongoose.model('Goodwords',Goodwords);

