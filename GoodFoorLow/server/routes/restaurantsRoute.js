const express = require('express');
const app = express();
const multer  = require('multer');
const restaurantsRoutes = express.Router();
const Restaurants = require('../model/Restaurants');
const bcrypt = require("bcryptjs");
const upload = require('../Middleware/middleware');
var ObjectId = require('mongodb').ObjectID;

// api to add user

restaurantsRoutes.post('/add', upload.any(), async function (req, res, next) {
    let images = req.files;
    let featuredImage = '';
    let additionalImages = [];
    let video='';
    for (let f = 0; f < images.length; f++) {
        if (images[f].fieldname == 'banner_image') {
            featuredImage = images[f].filename;
        }
        if (images[f].fieldname == 'featured_images') {
            additionalImages.push(images[f].filename);
        }
    }
    req.body.featured_images=additionalImages;
    req.body.banner_image=featuredImage;
    let usertest={type: "Point",coordinates: [parseFloat(req.body.Longitude) , parseFloat(req.body.Latitude)]};
    req.body.location=usertest;
    let user = new Restaurants(req.body);
    user.save(function (err,users) {
    if(err){
    res.status(400).send({'status': 'failure','message': err.message});
    }
    else{
      res.status(200).json({'status': 'success','message': 'Restaurants added successfully','data':req.body});
    }
  })
});


// api to get users
restaurantsRoutes.route('/').get(function (req, res) {
    Restaurants.find(function (err, users){
    if(err){
      res.status(400).send({'status': 'failure','message': err.message});
    }
    else {
      res.status(200).json({'status': 'success','message':'Restaurants add successfully','users': users});
    }
  });
});

// api to edit user
restaurantsRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Restaurants.findById(id, function (err, user){
    if(err){
      res.status(400).send({'status': 'failure','message': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','user': user});
    }
  });
});

// api to update route
// restaurantsRoutes.route('/update/:id').post(function (req, res) {
restaurantsRoutes.post('/update/:id', upload.any(), async function (req, res, next) {
    Restaurants.findById(req.params.id, function(err, user) {
    if (!user){
      res.status(400).send({'status': 'failure','message': 'Unable to find data'});
      } else {
      let usertest={type: "Point",coordinates: [parseFloat(req.body.Longitude) , parseFloat(req.body.Latitude)]};
      req.body.location=usertest;
      const client = req.body;
      Restaurants.update({_id: req.params.id}, client,function(err, data) {
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
restaurantsRoutes.route('/delete/:id').get(function (req, res) {
    Restaurants.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','message': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','message': 'Delete successfully'});
    }
  });
});


// api to get users
restaurantsRoutes.route('/count').get(function (req, res) {
  Restaurants.count({},function (err, users){
  if(err){
    res.status(400).send({'status': 'failure','message': err.message});
  }
  else {
    res.status(200).json({'status': 'success','message':'Restaurants add successfully','users': users});
  }
});
});


module.exports = restaurantsRoutes;