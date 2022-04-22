const express = require('express');
const app = express();
const multer  = require('multer');
const couponsRoutes = express.Router();
const Coupons = require('../model/Coupons');
const bcrypt = require("bcryptjs");
var ObjectId = require('mongodb').ObjectID;
const upload = require('../Middleware/middleware');
//add coupon
couponsRoutes.post('/add', upload.any(), async function (req, res, next) {
  let user = new Coupons(req.body);
  user.save(function (err,users) {
    if(err){
    res.status(400).send({'status': 'failure','message': err.message});
    }
    else{
      res.status(200).json({'status': 'success','message': 'Coupons added successfully','data':req.body});
    }
  })
});


// api to get users
couponsRoutes.route('/').get(function (req, res) {
    Coupons.find(function (err, users){
    if(err){
      res.status(400).send({'status': 'failure','message': err.message});
    }
    else {
      res.status(200).json({'status': 'success','message':'Coupons add successfully','users': users});
    }
  });
});

// api to edit user
couponsRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Coupons.findById(id, function (err, user){
    if(err){
      res.status(400).send({'status': 'failure','message': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','user': user});
    }
  });
});

// api to update route
  couponsRoutes.post('/update/:id', upload.any(), async function (req, res, next) {
    Coupons.findById(req.params.id, function(err, user) {
    if (!user){
      res.status(400).send({'status': 'failure','message': 'Unable to find data'});
    } else {
        const client = req.body;
        Coupons.update({_id: req.params.id}, client, { runValidators: true },function(err, data) {
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
couponsRoutes.route('/delete/:id').get(function (req, res) {
    Coupons.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','message': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','message': 'Delete successfully'});
    }
  });
});

module.exports = couponsRoutes;