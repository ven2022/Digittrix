const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Dishes = new Schema({
  name:
  {
    type: String,
    required: true,maxLength: 25,minLength: 3, 
  },
  category_id:
  {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  restu_id:
  {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  images:
  {
    type: Array,
    required: true,
  },
  foodtype:
  {
    type: String,
    required: true,maxLength: 10,minLength: 3,
  },
  memberReq:
  {
    type: Number,
  },
  groupPrice:
  {
    type: Number,
  },
  timeLimit:
  {
    type: Number,
  },
  productType:
  {
    type: Number,
    required: true,maxLength: 1,minLength: 1,
  },
  stockAvail:
  {
    type: Number,
    required: true,maxLength: 10,minLength: 1,
  },
  price:
  {
    type: Number,
    required: true,maxLength: 10,minLength: 1,
  },
  description:{
    type: String,
    required: true,maxLength: 150,minLength: 3,
  },
  ratting:
  {
    type: Number,
    default:2,
  },
},{
    collection: 'dishes'
});
module.exports = mongoose.model('Dishes',Dishes);
