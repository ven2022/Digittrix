const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
let Orders = new Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
  },
  restu_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
  },
  grand_total: {
    type: Number,
    required: true,minLength: 1, 
  },
  sub_total: {
    type: Number,
    required: true,minLength: 1, 
  },
  vendor_status:{
    type: Number,
    Default: 1,
    required: true,
  },
  order_ready:{
    type: Boolean,
    Default: false,
    required: true,
  },
  pickup_start:{
    type:Number
  },
  pickup_end:{
    type:Number
  },
  order_status:{
    type:String,
    required: true
  },
  cancel_by_customer:{
    type: Boolean,
    Default: false,
    required: true,
  },
  food_inst:{
    type:String,
  },
  admin_earning:{
    type:Number
  },
  vendor_earning:{
    type:Number
  },
  payment_status:{
    type: String,
  },
  payment_method:{
    type: String,
    Default: 'COD',
    required: true,
  },
  trans_id:{
    type: String,
  },
  payment_time:{
    type: Date,
  },
  date:{
    type: Date,
    default: Date.now,
    index: true
  }
},{
    collection: 'orders'
});

module.exports = mongoose.model('Orders',Orders);

