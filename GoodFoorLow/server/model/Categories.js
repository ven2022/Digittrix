const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
let Categories = new Schema({
  name: {
    type: String,
    index: true, unique: true, required: true, maxLength: 20,minLength: 3 
  },
},{
    collection: 'categories'
});
Categories.plugin(uniqueValidator);
module.exports = mongoose.model('Categories',Categories);

