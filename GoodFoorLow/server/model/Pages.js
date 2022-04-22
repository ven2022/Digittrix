const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
let Pages = new Schema({
  title:
  {
    type: String,
    required: true,
  },
  page_id:
  {
    type: String,
    required: true,
  },
  description:
  {
    type: String,
    required: true,
  },
},{
    collection: 'pages'
});

Pages.plugin(uniqueValidator);
module.exports = mongoose.model('Pages',Pages);
