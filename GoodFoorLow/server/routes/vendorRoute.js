const express = require('express');
const app = express();
const vendorRoutes = express.Router();
const Restaurants = require('../model/Restaurants');
const Categories = require('../model/Categories');
const Pages = require('../model/Pages');
const Tokens = require('../model/Tokens');
const Orders = require('../model/Orders');
const Dishes = require('../model/Dishes');
const Store = require('../model/Store');
const sendpush = require('./sendpush');
const Notifications = require('../model/Notifications');
const bcrypt = require("bcryptjs");
var ObjectId = require('mongodb').ObjectID;
const upload = require('../Middleware/middleware');
const mongoose = require('mongoose');


    vendorRoutes.post('/Rlogin', upload.any(), async function (req, res, next) {
    Restaurants.findOne({ restaurant_email: req.body.email}, function(err, user) {
    let data=user;
    if(user !==null){
    bcrypt.compare(req.body.password, data.password,async function(err, dp) {
      if (dp){
        if(data.status==2){
        try{
          let myobj={'uid':data._id,'device_token':req.body.device_token,'device_type':req.body.device_type,'user_type':2};
          let user2 = new Tokens(myobj);
          let items= await user2.save();
          res.status(200).json({'status': 'success','message': 'User login successfully','data':data});
        }
        catch(e)
        {
          res.status(400).send({'status': 'failure','message': e.message,'result': []});
        }
      }
      else
      {
        res.status(400).send({'status': 'failure','message': 'User Not authorized at the moment'});
      }
      }
      else
      {
        res.status(400).send({'status': 'failure','message': 'Password not match'});
      }
    })
    }
    else{
      res.status(400).send({'status': 'failure','message': 'user not found'});
    }
    });
    });

    vendorRoutes.route('/foodCategories').get(function (req, res) {
    Categories.find(function (err, users){
    if(err){
      res.status(400).send({'status': 'failure','message': err.message});
    }
    else {
      res.status(200).json({'status': 'success','message':'Categories available here','result': users});
    }
    });
    });

    vendorRoutes.post('/adddish', upload.any(), async function (req, res, next) {
      if(req.body.productType==2 && !req.body.timeLimit && !req.body.groupPrice)
      {
         res.status(400).send({'status': 'failure','message': 'Please enter valid fields'});
      }
      let images = req.files;
      let additionalImages = [];
      for (let f = 0; f < images.length; f++) {
          if (images[f].fieldname == 'images') {
              additionalImages.push(images[f].filename);
          }
      }
      req.body.images=additionalImages;
      let user = new Dishes(req.body);
      user.save(function (err,users) {
      if(err){
      res.status(400).send({'status': 'failure','message': err.message});
      }
      else{
        res.status(200).json({'status': 'success','message': 'Dish added successfully','result':users});
      }
      })
    });

    vendorRoutes.post('/fetch_restu_dish', upload.any(), async function (req, res, next) {
    let id = req.body.id;
    Dishes.find({ restu_id: id}, function (err, user){
    if(err){
      res.status(400).send({'status': 'failure','message': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','result': user});
    }
    });
    });

    vendorRoutes.post('/updatedish', upload.any(), async function (req, res, next) {
    Dishes.findOne({$and:[{'restu_id': req.body.restu_id},{'_id': req.body.id}]}, function(err, user) {
    if (!user){
    res.status(400).send({'status': 'failure','message': 'Unable to find data'});
    } else {
    if(req.body.quantity>0)
    {
    const client = {'stockAvail':req.body.quantity};
    Dishes.update({_id: req.body.id}, client,function(err, data) {
    if(data)
    {
    res.status(200).json({'status': 'success','message': 'Update complete'});
    }
    else{
    res.status(400).send({'status': 'failure','message': err.message});
    }
    })
    }
    else
    {
      res.status(400).send({'status': 'failure','message': 'Quantity minimum set with one'});
    }
    }
    });
    });

    vendorRoutes.post('/change_password', upload.any(), async function (req, res, next) {
    Restaurants.findOne({_id: req.body.id}, function(err, user) {
    let data=user;
    if(user !==null){
    bcrypt.compare(req.body.oldPassword, data.password, function(err, dp) {
      if (dp){
        const hash = bcrypt.hashSync(req.body.newPassword, 15);
        const client = {'password':hash};
        Restaurants.findOneAndUpdate({_id: req.body.id}, client,function(err, data) {
        if(data)
        {
        res.status(200).json({'status': 'success','message': 'Update complete'});
        }
        else{
        res.status(400).send({'status': 'failure','message': err.message});
        }
        })
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

    vendorRoutes.post('/update_resutrents', upload.any(), async function (req, res, next) {
        const client={"restaurant_email":req.body.email,'name':req.body.name,'phone_no':req.body.phone};
        Restaurants.findOneAndUpdate({_id: req.body.id}, client,function(err, data) {
        if(data)
        {
        res.status(200).json({'status': 'success','message': 'Update complete'});
        }
        else{
            if (err.keyValue) {
              var error=err.keyValue;
        }else
        {
          var error=err.message;
        }
        res.status(400).send({'status': 'failure','message': error});
        }
        })
    });


    vendorRoutes.post('/resturent_by_id', upload.any(), async function (req, res, next) {
    let id = req.body.id;
    Restaurants.findById(id, function (err, user){
    if(err){
      res.status(400).send({'status': 'failure','message': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','result': user});
    }
    });
    });

    vendorRoutes.post('/fetch_by_pageid', upload.any(), async function (req, res, next) {
    let id = req.body.id;
    Pages.findOne({page_id: req.body.id}, function (err, user){
    if(err){
      res.status(400).send({'status': 'failure','message': 'Page not found'});
    }
    else {
      res.status(200).json({'status': 'success','message': 'Page not found','result': user});
    }
    });
    });

    vendorRoutes.post('/fetch_orders_by_venodor', upload.any(), async function (req, res, next) {
    try{
      let items = await Orders.aggregate([
      { $match: { $and: [{ restu_id: { $eq: mongoose.Types.ObjectId(req.body.id) } },{ order_status: { $eq: 'hold' } } ]}},
      { $lookup:{
      from: 'user',
      localField: 'uid',
      foreignField: '_id',
      pipeline: [{ $project :{_id:1,mobile:1,userName:1,email:1} }],
      as: 'user'
      },},{ $unwind : "$user" }]).exec();
      if(items.length>0){
        res.status(200).json({'status': 'success','message': 'Orders available here','result': items});
      }
      else{
        res.status(200).json({'status': 'success','message': 'Order not available at the moment','result': []});
      }
    }
    catch(e)
    {
      res.status(400).send({'status': 'failure','message':e.message,'result':[]});
    }
    });

    vendorRoutes.post('/order_accept_reject', upload.any(), async function (req, res, next) {
      let action='cancel';
      let actionVal=3;
      let start=0;
      let requireConn=1;
      let end=0;
      let odStatus='hold';
      let noti='canceled';
      let client={order_status:action,vendor_status:actionVal,pickup_start:start,pickup_end:end};
      if(req.body.action==2){
        action='active';
        actionVal=2;
        requireConn=1;
        start=req.body.start;
        end=req.body.end;
        noti='accepted';
        client={order_status:action,vendor_status:actionVal,pickup_start:start,pickup_end:end};
      }
      else if(req.body.action==4){
        action='ready';
        actionVal=4;
        requireConn=2;
        start=req.body.start;
        odStatus='active';
        end=req.body.end;
        noti='Ready';
        client={order_status:action,vendor_status:actionVal,order_ready:true};
      }
      else if(req.body.action==5){
      action='complete';
      actionVal=5;
      requireConn=4;
      start=req.body.start;
      odStatus='ready';
      end=req.body.end;
      client={order_status:action,vendor_status:actionVal};
      noti='Completed';
      }
      
      Orders.findOneAndUpdate({$and: [{ _id: { $eq: mongoose.Types.ObjectId(req.body.oid)} },{ restu_id: { $eq:mongoose.Types.ObjectId(req.body.restu_id)} },{ vendor_status: Number(requireConn) },{order_status:odStatus}]}, client,async function(err, data) {
      if(err){
        res.status(400).send({'status': 'failure','message': err.message});
      }
      else if(data==null) {
        res.status(200).json({'status': 'success','message': 'Orders not found',});
      }
      else{
        try{
        let title='Your Order ' +noti+' from '+req.body.restu_name;
        let description='OrderId '+req.body.oid+' '+noti+' from '+req.body.restu_name;
        let savindobj={'title':title,'description':description,'uid':mongoose.Types.ObjectId(req.body.uid),'utype':1};
        let saveing = new Notifications(savindobj);
        let respo = await saveing.save();
        let tokenu=await Tokens.find({$and: [{
        'uid': { $in:req.body.uid}
          },{'type':1}]}).exec();
         if(tokenu)
         {
          let tokens=[];
          for (var i = tokenu.length - 1; i >= 0; i--) {
            tokens.push(tokenu[i].device_token);
          }
          var message = {
          data: {
          score: '850',
          time: '2:45'
          },
          notification:{
          title : title,
          body : description
          }
          };
          const repo= await sendpush.sendnoti(message, tokens);
          res.status(200).json({'status': 'success','message': 'Orders '+action+' successfully'});
          }
          
          }
          catch(e){
            res.status(200).json({'status': 'failure','message': e.message});
          
          }
        }   
    });
    });

    vendorRoutes.post('/vendor_home', upload.any(), async function (req, res, next) {
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      const fromDate = new Date(year, month, 1);
      const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);
      const condition = {$and: [{"date": {'$gte': fromDate, '$lte': toDate}},{"restu_id":{"$eq":mongoose.Types.ObjectId(req.body.restu_id)}}]};
      Orders.find(condition, function (err, user){
      if(err){
        res.status(400).send({'status': 'failure','message': err.message});
      }
      else{
        let earning=0;
        let total_sale=0;
        let pending=0;
        let complete=0;
        if(user!==null){
          for (var i = user.length - 1; i >= 0; i--) {
            earning+=user[i].vendor_earning
            total_sale+=user[i].sub_total
            if(user[i].order_status=="complete"){
              complete++;
            }
            if(user[i].order_status=="active"){
              pending++;
            }
          }
        }
        const respo={earning:earning,total_sale:total_sale,pending:pending,complete:complete};
        res.status(200).json({'status': 'success','message': 'Orders successfully','data':respo});
      }
      })
    })

    vendorRoutes.post('/vendor_od_list',upload.any(),async function(req,res,next){
      try{
      let condition = {$and: [{"vendor_status": {'$ne': 3,}},{"vendor_status":{'$ne': 1}},{"restu_id":{"$eq":mongoose.Types.ObjectId(req.body.restu_id)}}]};
      if(req.body.type==2)
      {
        condition = {$and: [{"order_status": {'$eq': 'complete'}},{"restu_id":{"$eq":mongoose.Types.ObjectId(req.body.restu_id)}}]};
      }
      else if(req.body.type==3)
      {
        condition = {$and: [{ "order_status": { '$ne': 'complete' }},{ "order_status": { '$ne': 'hold' }},{"order_status": {'$ne': 'cancel'}},{"restu_id":{"$eq":mongoose.Types.ObjectId(req.body.restu_id)}}]};
      }
      let items = await Orders.aggregate([
      { $match: condition},
      { $lookup:{
      from: 'user',
      localField: 'uid',
      foreignField: '_id',
      pipeline: [{ $project :{_id:1,mobile:1,userName:1,email:1} }],
      as: 'user'
      },},{ $unwind : "$user" }]).exec();
      if(items.length>0){
        res.status(200).json({'status': 'success','message': 'Orders available here','result': items});
      }
      else{
        res.status(200).json({'status': 'success','message': 'Order not available at the moment','result': []});
      }
    }
    catch(e)
    {
      res.status(400).send({'status': 'failure','message':e.message,'result':[]});
    }
    })

    vendorRoutes.post('/fetch_earning',upload.any(),async function(req,res,next){
      try{
      // const condition = {$and: [{ "order_status": { '$eq': 'complete' }},{"restu_id":{"$eq":mongoose.Types.ObjectId(req.body.restu_id)}}]};
      // const items = await Orders.aggregate([{ $match: condition},{ $group: { _id: 1, amount: { $sum: "$vendor_earning" } } }]).exec();
      let condition2 = {$and: [{ "order_status": { '$eq': 'complete' }},{"restu_id":{"$eq":mongoose.Types.ObjectId(req.body.restu_id)}}]};
      const toDate = new Date();
      if(req.body.type==1)
      {
      const memory=d.setMonth(d.getMonth() - 1);
      const fromDate = new Date(memory);
      let condition2 = {$and: [{ "order_status": { '$eq': 'complete' }},{"date": {'$gte': fromDate, '$lte': toDate}},{"restu_id":{"$eq":mongoose.Types.ObjectId(req.body.restu_id)}}]};
      }
      if(req.body.type==3)
      {
      const memory=d.setMonth(d.getMonth() - 3);
      const fromDate = new Date(memory);
      let condition2 = {$and: [{ "order_status": { '$eq': 'complete' }},{"date": {'$gte': fromDate, '$lte': toDate}},{"restu_id":{"$eq":mongoose.Types.ObjectId(req.body.restu_id)}}]};
      }
      if(req.body.type==6)
      {
      const memory=d.setMonth(d.getMonth() - 6);
      const fromDate = new Date(memory);
      let condition2 = {$and: [{ "order_status": { '$eq': 'complete' }},{"date": {'$gte': fromDate, '$lte': toDate}},{"restu_id":{"$eq":mongoose.Types.ObjectId(req.body.restu_id)}}]};
      }
      const items = await Orders.aggregate([{ $match: condition2},{ $group: { _id: 1, amount: { $sum: "$vendor_earning" } } }]).exec();
      const items2 = await Orders.aggregate([{ $match: condition2}]).exec();
      const respo={earning:items,record:items2};
      res.status(200).json({'status': 'success','message': 'Earning List','data':respo});
      }
      catch(e){
        res.status(400).json({'status': 'failure','message': e.message,'data':[]});
      }
    })



    vendorRoutes.post('/add_vendor', upload.any(), async function (req, res, next) {
    let additionalImages = [];
    let erros=[];
    let images = req.files;
    let featuredImage = '';
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
    let content='The best food in town at one of the best locations!!!';
    let usertest={type: "Point",coordinates: [parseFloat(req.body.long) , parseFloat(req.body.lat)]};
    let myobj={banner_image:req.body.banner_image,featured_images:req.body.featured_images,name:req.body.name,about_us:req.body.about_us,
    description:req.body.description,commission:10,ratting:3,status:1,timings:req.body.timings,title:req.body.title,
    restaurant_email:req.body.email,location:usertest,restaurant_url:req.body.restaurant_url,password:req.body.password,phone_no:req.body.phone,address:req.body.address,store_id:ObjectId(req.body.store_id)};
    let user = new Restaurants(myobj);
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
      res.status(200).json({'status': 'success','message': 'Restaurants add request sent successfully'});
    }
  })
  });

    vendorRoutes.route('/categories').get(function (req, res) {
    Store.find(function (err, users){
    if(err){
      res.status(400).send({'status': 'failure','message': err.message});
    }
    else {
      res.status(200).json({'status': 'success','message':'Categories available here','users': users});
    }
  });
});


module.exports = vendorRoutes;