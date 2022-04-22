const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Notifications = new Schema({
  title: {
    type: String,
    required: true, maxLength: 150,minLength: 3 
  },
   description: {
    type: String,
    required: true, maxLength: 500,minLength: 3 
  },
  uid:{
    type: mongoose.Schema.Types.ObjectId,
    required:true,
  },
  utype:{
    type: Number,
    required:true,
  },
   date:{
    type: Date,
    default: Date.now,
    index: true
  }
},{
    collection: 'notifications'
});
module.exports = mongoose.model('Notifications',Notifications);

