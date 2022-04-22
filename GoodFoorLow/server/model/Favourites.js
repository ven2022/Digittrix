const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
let Favourites = new Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
  },
  product_id:
  {
    type: mongoose.Schema.Types.ObjectId,
    required: true,maxLength: 20,minLength: 5,
  },
  date: 
  {
    type: Date,
    default: Date.now,
    index: true
  }
},{
    collection: 'favourites'
});
module.exports = mongoose.model('Favourites',Favourites);
