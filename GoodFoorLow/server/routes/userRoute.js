const express = require('express');
const app = express();
const userRoutes = express.Router();
let User = require('../model/User');
let Tokens = require('../model/Tokens');
const bcrypt = require("bcryptjs");
const upload = require('../Middleware/middleware');
// api to add user
  userRoutes.post('/add', upload.any(), async function (req, res, next) {
    req.body.refral_code=Math.floor(100000 + Math.random() * 900000);
  let user = new User(req.body);
  let erros=[];
  user.save(function (err,users) {
    if(err){
      if (err.name == 'ValidationError') {
        for (field in err.errors) {
          erros.push(err.errors[field].message);
        }
    }
    res.status(400).send({'status': 'failure','message': erros});
    }
    else{
      res.status(200).json({'status': 'success','message': 'user registration successfully','data':req.body});
    }
  })
});

  userRoutes.post('/login', upload.any(), async function (req, res, next) {
    let compare={$or:[{userName:req.body.userName},{email:req.body.userName}]};
    User.findOne(compare,async function(err, user) {
    let data=user;
    if(user !==null){
    bcrypt.compare(req.body.password, data.password,async function(err, dp) {
      if (dp){
        try{
        let myobj={'uid':data._id,'device_token':req.body.device_token,'device_type':req.body.device_type,'user_type':1,'refral_code':req.body.refral_code};
        let user2 = new Tokens(myobj);
        let items= await user2.save();
        res.status(200).json({'status': 'success','message': 'User login successfully','data':data});
        }
        catch(e)
        {
        res.status(400).send({'status': 'failure','message': e.message,'result': []});
        }
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

    userRoutes.post('/social', upload.any(), async function (req, res, next) {

      if(req.body.email && req.body.firstName && req.body.auth_id && req.body.type)
      {
        let update={auth_id:req.body.auth_id,type:req.body.type};
        let doc = await User.findOneAndUpdate({email:req.body.email},update,{
        returnOriginal: false
        });
        if(doc)
        {
          res.status(200).json({'status': 'success','message': 'User login successfully','data':doc});
        }
        else{
          let username= req.body.firstName+'_'+Math.round(Math.random() * 400);
          let Password =Math.floor(Math.random() * 10000000) + 90000000;
          let Mobile='1234567890';
          let refral=Math.floor(100000 + Math.random() * 900000);
          let userdetail={refral_code:refral,firstName:req.body.firstName,lastName:req.body.lastName,email:req.body.email,userName:username,password:Password,auth_id:req.body.auth_id,type:req.body.type,mobile:Mobile};
            let user = new User(userdetail);
            let erros=[];
            user.save(function (err,users) {
              if(err){
                if (err.name == 'ValidationError') {
                  for (field in err.errors) {
                    erros.push(err.errors[field].message);
                  }
              }
              res.status(400).send({'status': 'failure','message': erros});
              }
              else{
                res.status(200).json({'status': 'success','message': 'User login successfully','data':users});
              }
          })
        }
      }else{
        res.status(400).send({'status': 'failure','message': 'Please fill valid details'});
      }
  });

// api to get users
userRoutes.route('/').get(function (req, res) {
  User.find(function (err, users){
    if(err){
      res.status(400).send({'status': 'failure','message': err.message});
    }
    else {
      res.status(200).json({'status': 'success','message':'user add successfully','users': users});
    }
  });
});

// api to edit user
userRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, user){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','user': user});
    }
  });
});

// api to update route
userRoutes.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function(err, user) {
    if (!user){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        user.name = req.body.name;
        user.email = req.body.email;
        user.phone_number = req.body.phone_number;

        user.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
userRoutes.route('/delete/:id').get(function (req, res) {
  User.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

userRoutes.post('/logout', upload.any(), async function (req, res, next) {
 Tokens.remove({device_token: req.body.device_token}, function(err,user){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Logout successfully'});
    }
  });
});

userRoutes.post('/verify_refral', upload.any(), async function (req, res, next) {
 User.findOne({refral_code: req.body.code}, function(err,user){
    if(err || user ==null){
      res.status(400).send({'status': 'failure','mssg': 'Code mismatch'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Code available here','id':user._id});
    }
  });
});





module.exports = userRoutes;