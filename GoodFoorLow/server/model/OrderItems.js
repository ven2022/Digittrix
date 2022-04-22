const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
let OrderItems = new Schema({
  oid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
  },
  dish_name: {
    type: String,
    required: true,maxLength: 50,minLength: 3, 
  },
  image: {
    type: String,
    required: true,maxLength: 50,minLength: 5, 
  },
  isGroup: {
    type: Boolean,
    Default: false,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,minLength: 1, 
  },
  price: {
    type: Number,
    required: true,minLength: 1, 
  },
  date:{
    type: Date,
    default: Date.now,
    index: true
  }
},{
    collection: 'orderItems'
});

module.exports = mongoose.model('OrderItems',OrderItems);

