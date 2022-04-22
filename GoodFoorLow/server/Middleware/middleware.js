
var multer = require('multer');
const fs = require('fs');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'my_uploaded_files/images')
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage })

module.exports = upload;
