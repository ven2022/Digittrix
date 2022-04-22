const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
let Carts = new Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
  },
  restu_ids: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
  },
  product_id:
  {
    type: mongoose.Schema.Types.ObjectId,
    required: true,maxLength: 20,minLength: 5,
  },
  isGroup: {
    type: Boolean,
    Default: false,
    required: true,
  },
  quantity:
  {
    type: Number,
    required: true,minLength:1,min: 1,
  },
  date: 
  {
    type: Date,
    default: Date.now,
    index: true
  }
},{
    collection: 'carts'
});
module.exports = mongoose.model('Carts',Carts);
