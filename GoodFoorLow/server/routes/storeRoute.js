const express = require('express');
const app = express();
const storeRoutes = express.Router();
let Store = require('../model/Store');
const bcrypt = require("bcryptjs");
var ObjectId = require('mongodb').ObjectID;
const upload = require('../Middleware/middleware');


// api add store
  storeRoutes.post('/add', upload.any(), async function (req, res, next) {
    let images = req.files;
    let featuredImage=''
    featuredImage = images[0].filename;
    req.body.image=featuredImage;
    let user = new Store(req.body);
    user.save(function (err,users) {
    if(err){
    res.status(400).send({'status': 'failure','message': err.message});
    }
    else{
      res.status(200).json({'status': 'success','message': 'Store added successfully','data':req.body});
    }
  })
});

// api to get users
storeRoutes.route('/').get(function (req, res) {
    Store.find(function (err, users){
    if(err){
      res.status(400).send({'status': 'failure','message': err.message});
    }
    else {
      res.status(200).json({'status': 'success','message':'Store add successfully','users': users});
    }
  });
});

// api to edit user
storeRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Store.findById(id, function (err, user){
    if(err){
      res.status(400).send({'status': 'failure','message': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','user': user});
    }
  });
});

// api to update route
  storeRoutes.post('/update/:id', upload.any(), async function (req, res, next) {
    Store.findById(req.params.id, function(err, user) {
    if (!user){
      res.status(400).send({'status': 'failure','message': 'Unable to find data'});
    } else {
            if(req.body.image && req.files)
            {
              let images = req.files;
              let featuredImage=''
              featuredImage = images[0].filename;
              req.body.image=featuredImage;
            }
            const client = req.body;
            Store.update({_id: req.params.id}, client,function(err, data) {
           if(data)
           {
            res.status(200).json({'status': 'success','message': 'Update complete'});
           }
           else{
            res.status(400).send({'status': 'failure','message': err.message});
           }
      })
    }
  });
});

// api for delete
storeRoutes.route('/delete/:id').get(function (req, res) {
    Store.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','message': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','message': 'Delete successfully'});
    }
  });
});

module.exports = storeRoutes;