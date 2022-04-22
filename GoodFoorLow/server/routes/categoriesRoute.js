const express = require('express');
const app = express();
const categoriesRoutes = express.Router();
let Categories = require('../model/Categories');
const bcrypt = require("bcryptjs");
var ObjectId = require('mongodb').ObjectID;
const upload = require('../Middleware/middleware');

categoriesRoutes.route('/add').post(function (req, res) {
  let user = new Categories(req.body);
  user.save(function (err,users) {
    if(err){
    res.status(400).send({'status': 'failure','message': err.message});
    }
    else{
      res.status(200).json({'status': 'success','message': 'Categories added successfully','data':req.body});
    }
  })
});


// api to get users
categoriesRoutes.route('/').get(function (req, res) {
    Categories.find(function (err, users){
    if(err){
      res.status(400).send({'status': 'failure','message': err.message});
    }
    else {
      res.status(200).json({'status': 'success','message':'Categories add successfully','users': users});
    }
  });
});

// api to edit user
categoriesRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Categories.findById(id, function (err, user){
    if(err){
      res.status(400).send({'status': 'failure','message': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','user': user});
    }
  });
});

// api to update route
  categoriesRoutes.post('/update', upload.any(), async function (req, res, next) {
    Categories.findById(req.body.id, function(err, user) {
    if (!user){
      res.status(400).send({'status': 'failure','message': 'Unable to find data'});
    } else {
        //  var myquery = { name: user.name };
        //  var newvalues = { $set: { name: req.body.name } };
        //  Categories.updateOne(myquery, newvalues,{ runValidators: true }, function(err, data) {
            const client = req.body;
            Categories.update({_id: req.body.id}, client,function(err, data) {
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
categoriesRoutes.route('/delete/:id').get(function (req, res) {
    Categories.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','message': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','message': 'Delete successfully'});
    }
  });
});

module.exports = categoriesRoutes;