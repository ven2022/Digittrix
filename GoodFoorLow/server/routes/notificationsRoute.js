const express = require('express');
const app = express();
const notificationsRoutes = express.Router();
let Notifications = require('../model/Notifications');
let Tokens = require('../model/Tokens');
const bcrypt = require("bcryptjs");
var ObjectId = require('mongodb').ObjectID;
const upload = require('../Middleware/middleware');
// var fcm = require('fcm-notification');
var path = require("path");
// var FCM = require('fcm-notification');
const sendpush = require('./sendpush');
// var FCM = new fcm(path.resolve(__dirname,'./privatekey.json'));
  notificationsRoutes.post('/add', upload.any(), async function (req, res, next) {
  let user = new Notifications(req.body);
  user.save(function (err,users) {
    if(err){
    res.status(400).send({'status': 'failure','message': err.message});
    }
    else{
      res.status(200).json({'status': 'success','message': 'Notifications added successfully','data':req.body});
    }
  })
});


// api to get users
notificationsRoutes.route('/get/:id').get(function (req, res) {
  let id=req.params.id;
    Notifications.find({pageid:id},function (err, users){
    if(err){
      res.status(400).send({'status': 'failure','message': err.message});
    }
    else {
      res.status(200).json({'status': 'success','message':'Notifications add successfully','users': users});
    }
  });
});

// api to edit user
notificationsRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Notifications.findById(id, function (err, user){
    if(err){
      res.status(400).send({'status': 'failure','message': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','user': user});
    }
  });
});

// api to update route
  notificationsRoutes.post('/update', upload.any(), async function (req, res, next) {
    const client = req.body;
    Notifications.findOneAndUpdate({id: req.body.id}, client,function(err, data) {
     if(data)
     {
      res.status(200).json({'status': 'success','message': 'Update complete'});
     }
     else{
      res.status(400).send({'status': 'failure','message': err.message});
     }
    })
  });


  notificationsRoutes.post('/send', upload.any(), async function (req, res, next) {
    let type=1;
    if(req.body.type=='restu')
    {
      type=2;
    }
    Tokens.find({$and: [{
    'uid': { $in:req.body.users}
      },{'type':type}]},async function(err, docs){
     if(docs)
     {
      let tokens=[];
      for (var i = docs.length - 1; i >= 0; i--) {
        tokens.push(docs[i].device_token);
      }
      var message = {
      data: {
      score: '850',
      time: '2:45'
      },
      notification:{
      title : req.body.title,
      body : req.body.description
      }
      };
      const repo= await sendpush.sendnoti(message, tokens);
      if(repo=='error')
      {
        res.status(400).send({'status': 'failure','message': 'Notifications Send failure','result': []});
      }
      else{
        res.status(200).json({'status': 'success','message': 'Notifications Send successfully','data':response});
      }

     }
     else{
      res.status(400).send({'status': 'failure','message': err.message});
     }
    })
  });

// api for delete
notificationsRoutes.route('/delete/:id').get(function (req, res) {
    Notifications.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','message': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','message': 'Delete successfully'});
    }
  });
});

module.exports = notificationsRoutes;