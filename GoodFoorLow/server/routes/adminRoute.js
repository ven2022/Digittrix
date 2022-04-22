const express = require('express');
const app = express();
const adminRoutes = express.Router();
let Admin = require('../model/Admin');
const bcrypt = require("bcryptjs");
// api to add user
adminRoutes.route('/login').post(function (req, res) {
  Admin.findOne({ email: req.body.email}, function(err, user) {
    let data=user;
    if(user !==null){
    bcrypt.compare(req.body.password, data.password, function(err, dp) {
      if (dp){
        res.status(200).json({'status': 'success','message': 'User login successfully','data':data});
      }
      else{
        res.status(400).send({'status': 'failure','message': 'Password not match'});
      }
    })
    }
    else{
      res.status(400).send({'status': 'failure','message': 'user not found'});
    }
  });
});
module.exports = adminRoutes;