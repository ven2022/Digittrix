const express = require('express');
const app = express();
const goodwordsRoutes = express.Router();
let Goodwords = require('../model/Goodwords');
const bcrypt = require("bcryptjs");
const upload = require('../Middleware/middleware');
var ObjectId = require('mongodb').ObjectID;

// goodwordsRoutes.route('/add').post(function (req, res) {
//   let user = new Goodwords(req.body);
//   user.save(function (err,users) {
//     if(err){
//     res.status(400).send({'status': 'failure','message': err.message});
//     }
//     else{
//       res.status(200).json({'status': 'success','message': 'Goodwords added successfully','data':req.body});
//     }
//   })
// });

goodwordsRoutes.post('/add', upload.any(), async function (req, res, next) {
    let images = req.files;
    let featuredImage = '';
    for (let f = 0; f < images.length; f++) {
        if (images[f].fieldname == 'image') {
            featuredImage = images[f].filename;
        }
    }
    req.body.image=featuredImage;
    let user = new Goodwords(req.body);
    user.save(function (err,users) {
   if(err){
    res.status(400).send({'status': 'failure','message': err.message});
    }
    else{
      res.status(200).json({'status': 'success','message': 'Goodwords added successfully','data':req.body});
    }
  })
});


// api to get users
goodwordsRoutes.route('/').get(function (req, res) {
    Goodwords.find(function (err, users){
    if(err){
      res.status(400).send({'status': 'failure','message': err.message});
    }
    else {
      res.status(200).json({'status': 'success','message':'Goodwords add successfully','users': users});
    }
  });
});

// api to edit user
goodwordsRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Goodwords.findById(id, function (err, user){
    if(err){
      res.status(400).send({'status': 'failure','message': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','user': user});
    }
  });
});

// api to update route
  goodwordsRoutes.post('/update/:id', upload.any(), async function (req, res, next) {
  Goodwords.findById(req.params.id, function(err, user) {
  if (!user){
    res.status(400).send({'status': 'failure','message': 'Unable to find data'});
  } else {
    const client = req.body;
    Goodwords.update({_id: req.params.id}, client, { runValidators: true },function(err, data) {
    if(data)
    {
      res.status(200).json({'status': 'success','message': 'Update successfully'});
    }
    else{
      res.status(400).send({'status': 'failure','message': err.message});
    }
    })
  }
});
});

// api for delete
goodwordsRoutes.route('/delete/:id').get(function (req, res) {
    Goodwords.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = goodwordsRoutes;