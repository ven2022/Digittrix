const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
let Coupons = new Schema({
  restu:
  {
    type: Array,
    required: true,
  },
  type:
  {
    type: String,
    required: true,
    maxLength: 20,minLength: 3,
  },
  name:
  {
    type: String,
    required: true,
    maxLength: 20,minLength: 3,
  },
  mini:
  {
    type: Number,
    required: true,
    maxLength: 6,minLength: 1,min:1
  },
  max:
  {
    type: Number,
    required: true,
    maxLength: 6,minLength: 1,min:1
  },
  count_limit:
  {
    type: Number,
    required: true,
    maxLength: 6,minLength: 2,min:1
  },
  code:
  {
    type: String,
    index: true, unique: true, required: true,
    maxLength: 20,minLength: 2
  },
  datefrom:
  {
    type: Date,
    required: true
  },
  dateto:
  {
    type: Date,
    required: true
  },
  count:
  {
    type: Number,
    required: true
  },
  amount:{
    type: Number,
    required: true,
    maxLength: 6,minLength: 1,min:1
  }

},{
    collection: 'coupons'
});
Coupons.plugin(uniqueValidator);
module.exports = mongoose.model('Coupons',Coupons);
