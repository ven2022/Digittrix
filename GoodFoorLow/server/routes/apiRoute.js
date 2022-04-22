const express = require('express');
const app = express();
const apiRoutes = express.Router();
const Store = require('../model/Store');
const Restaurants = require('../model/Restaurants');
const Categories = require('../model/Categories');
const Carts = require('../model/Carts');
const bcrypt = require("bcryptjs");
var ObjectId = require('mongodb').ObjectID;
const upload = require('../Middleware/middleware');
const Dishes = require('../model/Dishes');
const User = require('../model/User');
const Favourites = require('../model/Favourites');
const Orders = require('../model/Orders');
const OrderItems = require('../model/OrderItems');
const mongoose = require('mongoose');
const Notifications = require('../model/Notifications');


// api to get homepage
    apiRoutes.post('/home', upload.any(), async function (req, res, next) {
      const longitude = parseFloat(req.body.long);
      const latitude = parseFloat(req.body.lat);
      let resturent=[];
      let store=[];
      let discover=[];
      let topofweek=[];
      let group_day=[];
      try{
        resturent = await Restaurants.find({location: {$near : {$geometry : {type : "Point",coordinates:[ longitude , latitude ]},$minDistance: 100,}}});
        discover = await Restaurants.find({discover:true});
        store = await Store.find();
        topofweek = await Restaurants.aggregate([
        { $geoNear: { near: { type: 'Point', coordinates: [longitude * 1, latitude * 1] },distanceField: 'distance'} },
        { $match: { ratting: { $gte: 3 } } },
        { $match: { status: { $gte: 2 } } },
        { $match: { top_week: true } },
        { $project :{name:1,location:1} },
        { $lookup:
          {
            localField: '_id',
            from: 'dishes',
            foreignField: 'restu_id',
            pipeline: [{ $match: { productType: { $lte: 1 } } }],
            as: 'user_detail'
          }
        },
        { $unwind: { path: '$user_detail', preserveNullAndEmptyArrays: true } },
          { $lookup:
          {
            from: 'carts',
            localField: 'user_detail._id',
            foreignField: 'product_id',
            pipeline: [{ $match: { uid: mongoose.Types.ObjectId(req.body.uid) } }],
            as: 'user_detail.carts'
          }
        },
        {
          $lookup: {
          from: 'favourites',
          localField: 'user_detail._id',
          foreignField: 'product_id',
          pipeline: [{ $match: { uid: mongoose.Types.ObjectId(req.body.uid) } },{ $project :{_id:1} }],
          as: 'user_detail.likes',
        },
        },
        {
          $group: {
          _id: '$user_detail._id',
          restu_name: { $first:'$name'},
          dish_name: { $first: '$user_detail.name' },
          restu_id: { $first: '$user_detail.restu_id' },
          images: {$first:'$user_detail.images'},
          foodtype: { $first: '$user_detail.foodtype' },
          memberReq: { $first: '$user_detail.memberReq' },
          productType: { $first: '$user_detail.productType' },
          stockAvail: { $first: '$user_detail.stockAvail' },
          price: { $first: '$user_detail.price' },
          description: { $first: '$user_detail.description' },
          ratting: { $first: '$user_detail.ratting' },
          cart: { $first: '$user_detail.carts' },
          like: { $first: '$user_detail.likes' },
          location: { $first: '$location' },
          },
        }
        ]).exec();
        group_day = await Restaurants.aggregate([
        { $geoNear: { near: { type: 'Point', coordinates: [longitude * 1, latitude * 1] },distanceField: 'distance'} },
        { $match: { ratting: { $gte: 3 } } },
        { $match: { status: { $gte: 2 } } },
        { $match: { group_of_day: true } },
        { $project :{name:1,location:1} },
        { $lookup:
          {
            from: 'dishes',
            localField: '_id',
            foreignField: 'restu_id',
            pipeline: [{ $match: { productType: { $gte: 2 } } }],
            as: 'user_detail'
          }
        },
        { $unwind: { path: '$user_detail', preserveNullAndEmptyArrays: true } },
        { $lookup:
          {
            from: 'carts',
            localField: 'user_detail._id',
            foreignField: 'product_id',
            pipeline: [{ $match: { uid: mongoose.Types.ObjectId(req.body.uid) } }],
            as: 'user_detail.carts'
          }
        },
        {
          $lookup: {
          from: 'favourites',
          localField: 'user_detail._id',
          foreignField: 'product_id',
          pipeline: [{ $match: { uid: mongoose.Types.ObjectId(req.body.uid) } },{ $project :{_id:1} }],
          as: 'user_detail.likes',
        },
        },
        {
          $group: {
          _id: '$user_detail._id',
          restu_name: { $first:'$name'},
          dish_name: { $first: '$user_detail.name' },
          images: {$first:'$user_detail.images'},
          restu_id: { $first: '$user_detail.restu_id' },
          foodtype: { $first: '$user_detail.foodtype' },
          memberReq: { $first: '$user_detail.memberReq' },
          productType: { $first: '$user_detail.productType' },
          stockAvail: { $first: '$user_detail.stockAvail' },
          price: { $first: '$user_detail.price' },
          description: { $first: '$user_detail.description' },
          ratting: { $first: '$user_detail.ratting' },
          cart: { $first: '$user_detail.carts' },
          like: { $first: '$user_detail.likes' },
          location: { $first: '$location' },
          },
        }
        ]).exec();
        let final={'resturents':resturent,'stores':store,'discover':discover,'topofweek':topofweek,'group_day':group_day};
        res.status(200).json({'status': 'success','message':'Home Results','result': final});
         }
      catch (err) {
        res.status(400).send({'status': 'failure','message': err.message});
      }
    });

  // fetch restu by store id

  apiRoutes.post('/fetch_with_store', upload.any(), async function (req, res, next) {
    let id = req.body.store_id;
    Restaurants.find({store_id:id}, function (err, user){
    if(err){
      res.status(400).send({'status': 'failure','message': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','result': user});
    }
    });
  });

  apiRoutes.post('/fetch_with_restu_id', upload.any(), async function (req, res, next) {
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

  apiRoutes.post('/seaching', upload.any(), async function (req, res, next) {
    let search = req.body.search;
    let dish=[];
    let restu=[];
    let myquery={$or:[
    {name:{$regex:new RegExp("^" + req.body.search, "i")}},
    {description:{$regex:new RegExp("^" + req.body.search, "i")}}]};
    try{
    restu = await Restaurants.find(myquery);
    dish = await Dishes.find(myquery);
    const final = restu.concat(dish);
      res.status(200).json({'status': 'success','message':'Home Results','result': final});
    }
    catch (err) {
      res.status(400).send({'status': 'failure','message': err.message});
    }
  });

  apiRoutes.post('/add_to_cart', upload.any(), async function (req, res, next) {
  const filter={$and: [{ uid: req.body.uid }, { product_id: req.body.product_id }]};
  let user = new Carts(req.body);
  let erros=[];
  let matching = await Carts.findOne({uid:mongoose.Types.ObjectId(req.body.uid)});
  if(matching==null)
  {
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
      req.body._id=users._id;
      res.status(200).json({'status': 'success','message': 'Add to cart successfully','data':req.body});
    }
    })
  }
  else if(matching!==null && matching!=={} && matching.restu_ids==req.body.restu_ids)
  {
    let doc = await Carts.findOneAndUpdate(filter, {$inc: {quantity: 1}},{
    returnOriginal: false
    });
    if(doc==null)
    {
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
        req.body._id=users._id;
        res.status(200).json({'status': 'success','message': 'Add to cart successfully','data':req.body});
      }
      })
    }
    else
    {
      req.body._id=doc._id;
      req.body.quantity=doc.quantity;
      res.status(200).json({'status': 'success','message': 'Cart Update successfully','data':req.body});
    }
  }
  else
  {
    res.status(200).json({'status': 'success','message': 'Please remove previous store cart items','data':req.body});
  }
  });

  apiRoutes.post('/delete_cart_item', upload.any(), async function (req, res, next) {
    Carts.findByIdAndRemove({_id: req.body.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
  });

   apiRoutes.post('/delete_cart_items', upload.any(), async function (req, res, next) {
    Carts.remove({uid: mongoose.Types.ObjectId(req.body.id)}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
  });


   apiRoutes.post('/update_cart_quantity', upload.any(), async function (req, res, next) {
    const filter={_id:req.body.id};
    let quty=1;
    if(req.body.quantity && Number(req.body.quantity)>0 && req.body.type == 2)
    {
      quty=Number(req.body.quantity)+1;
    }
    else if(req.body.quantity && Number(req.body.quantity)>1 && req.body.type == 1)
    {
      quty=req.body.quantity-1;
    }
    let update={quantity:quty};
    try{
    let doc = await Carts.findOneAndUpdate(filter, update,{
    returnOriginal: false
    });
    if(doc!==null)
    {
      res.status(200).json({'status': 'success','message':'Cart update successfully','result': doc});
    }
    else
    {
      res.status(400).json({'status': 'failure','message':'Something went wrong','result': []});
    }
    
    }
    catch (err) {
      res.status(400).send({'status': 'failure','message': err.message,'result': []});
    }
  });

  apiRoutes.post('/fetch_cart_items', upload.any(), async function (req, res, next) {
    let id = mongoose.Types.ObjectId(req.body.uid);
    try{
   let items = await Carts.aggregate([
        { $match: { uid: { $eq: id } } },
        { $lookup:
          {
            from: 'dishes',
            localField: 'product_id',
            foreignField: '_id',
            as: 'item'
          }
        },
        ]).exec();
   res.status(200).json({'status': 'success','message':'Carts items is available here','result': items});
 }
     catch (err) {
      res.status(400).send({'status': 'failure','message': err.message,'result': []});
    }
  });


  apiRoutes.post('/fetch_dishes', upload.any(), async function (req, res, next) {
    const longitude = parseFloat(req.body.long);
    const latitude = parseFloat(req.body.lat);
    const uid = mongoose.Types.ObjectId(req.body.user_id);
    let dishes=[];
    let query=[];
    if(req.body.cat_id!=="" && req.body.user_id!=="")
    {
      let id = mongoose.Types.ObjectId(req.body.cat_id);
      query=[{ $match: { category_id: id } }];
    }
    try{
    dishes = await Restaurants.aggregate([
        { $geoNear: { near: { type: 'Point', coordinates: [longitude * 1, latitude * 1] },distanceField: 'distance'} },
        { $match: { status: { $gte: 2 } } },
        { $lookup:
          {
            from: 'dishes',
            localField: '_id',
            foreignField: 'restu_id',
            pipeline: query,
            as: 'user_detail'
          }
        },
        {$unwind:'$user_detail'},
        { $lookup:
          {
            from: 'carts',
            localField: 'user_detail._id',
            foreignField: 'product_id',
            pipeline: [{ $match: { uid: uid } }],
            as: 'user_detail.carts'
          }
        },
         {
          $lookup: {
          from: 'favourites',
          localField: 'user_detail._id',
          foreignField: 'product_id',
          pipeline: [{ $match: { uid: uid } },{ $project :{_id:1} }],
          as: 'user_detail.likes',
        }
        },
         {
          $group: {
          _id: '$user_detail._id',
          restu_name: { $first:'$name'},
          dish_name: { $first: '$user_detail.name' },
          images: {$first:'$user_detail.images'},
          restu_id:{$first:'$user_detail.restu_id'},
          foodtype: { $first: '$user_detail.foodtype' },
          memberReq: { $first: '$user_detail.memberReq' },
          productType: { $first: '$user_detail.productType' },
          stockAvail: { $first: '$user_detail.stockAvail' },
          price: { $first: '$user_detail.price' },
          description: { $first: '$user_detail.description' },
          ratting: { $first: '$user_detail.ratting' },
          cart: { $first: '$user_detail.carts' },
          like: { $first: '$user_detail.likes' },
          location: { $first: '$location' },
          },
        }
        ]).exec();
        res.status(200).json({'status': 'success','message':'Dishes is available here','result': dishes});
      }
       catch (err) {
      res.status(400).send({'status': 'failure','message': err.message,'result': []});
    }
  });

    apiRoutes.post('/fetch_dish_by_id', upload.any(), async function (req, res, next) {
      let id = mongoose.Types.ObjectId(req.body.id);
      let uid = mongoose.Types.ObjectId(req.body.user_id);
      try{
      let items = await Dishes.aggregate([
      { $match: { _id: { $eq: id } } },
      { $lookup:
        {
          from: 'restaurants',
          localField: 'restu_id',
          foreignField: '_id',
          pipeline: [{ $project :{name:1,address:1,phone_no:1,timings:1,ratting:1,title:1,location:1,restaurant_url:1}}],
          as: 'store'
        },
        },
        { $unwind : "$store" },
      ]).exec();
      let itemss = await Dishes.aggregate([
        { $match: { category_id: { $eq: mongoose.Types.ObjectId(items[0].category_id) } } },
        { $lookup:
        {
          from: 'carts',
          localField: '_id',
          foreignField: 'product_id',
          pipeline: [{ $match: { uid: { $eq: uid } } }],
          as: 'cart'
        }
      }, {
          $lookup: {
          from: 'favourites',
          localField: '_id',
          foreignField: 'product_id',
          pipeline: [{ $match: { uid: uid } },{ $project :{_id:1} }],
          as: 'likes',
        }
        },
      ]).exec();

      let cart=await Carts.aggregate([{ $match: { $and: [{ uid: { $eq: uid } },{ product_id: { $eq: id } } ]}}]).exec();
      let likes=await Favourites.aggregate([{ $match: { $and: [{ uid: { $eq: uid } },{ product_id: { $eq: id } } ]}}]).exec();
      let final={Dish:items,related:itemss,dishCart:cart,dishLike:likes};
      if(items && items!=[])
      {
        res.status(200).send({'status': 'success','message': 'Dishes items is available here','result': final});
      }
      else
      {
        res.status(400).json({'status': 'failure','message':'Dishes items is not available here','result': final});
      }
      
      }
      catch (err) {
      res.status(400).send({'status': 'failure','message': err.message,'result': {}});
      }
    });

    apiRoutes.post('/fetch_restu_dish_byid', upload.any(), async function (req, res, next) {
    try{
    let id = mongoose.Types.ObjectId(req.body.id);
    let uid = mongoose.Types.ObjectId(req.body.user_id);
    let itemss = await Dishes.aggregate([
        { $match: { restu_id: { $eq: id } } },
        { $lookup:
        {
          from: 'carts',
          localField: '_id',
          foreignField: 'product_id',
          pipeline: [{ $match: { uid: { $eq: uid } } }],
          as: 'cart'
        }
      }, {
          $lookup: {
          from: 'favourites',
          localField: '_id',
          foreignField: 'product_id',
          pipeline: [{ $match: { uid: uid } },{ $project :{_id:1} }],
          as: 'likes',
        }
        },
      ]).exec();
     if(itemss && itemss!=[])
      {
        res.status(200).send({'status': 'success','message': 'Dishes items is available here','result': itemss});
      }
      else
      {
        res.status(400).json({'status': 'failure','message':'Dishes items is not available here','result': []});
      }
      
    }
    catch (err) {
    res.status(400).send({'status': 'failure','message': err.message,'result': {}});
    }
    });

      apiRoutes.post('/fetch_user_by_id', upload.any(), async function (req, res, next) {
      let id = req.body.id;
        User.findById(id, function (err, user){
        if(err){
          res.status(400).send({'status': 'failure','message': 'Something went wrong'});
        }
        else {
          res.status(200).json({'status': 'success','message': 'Dish is available here','result': user});
        }
        });
      });

      apiRoutes.post('/change_password', upload.any(), async function (req, res, next) {
        User.findOne({_id: req.body.id}, function(err, user) {
        let data=user;
        if(user !==null){
        bcrypt.compare(req.body.oldPassword, data.password, function(err, dp) {
          if (dp){
            const hash = bcrypt.hashSync(req.body.newPassword, 15);
            const client = {'password':hash};
            User.findOneAndUpdate({_id: req.body.id}, client,function(err, data) {
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

      apiRoutes.post('/update_users', upload.any(), async function (req, res, next) {
        if(req.files[0] && req.files[0].fieldname == 'images')
        {
        req.body.images=req.files[0].filename;
        }
        const client={"userName":req.body.username,'mobile':req.body.phone,'profile_image':req.body.images};
        User.findOneAndUpdate({_id: req.body.id}, client,function(err, data) {
        if(data)
        {
        res.status(200).json({'status': 'success','message': 'Update complete'});
        }
        else{
        if (err) {
               res.status(400).send({'status': 'failure','message': err});
        }else
        {
          var error=err;
        }
        res.status(400).send({'status': 'failure','message': error});
        }
        })
      });

    apiRoutes.post('/addfavourite', upload.any(), async function (req, res, next) {
    const check= await Favourites.find({ $and: [{ uid: { $eq: req.body.uid } },{ product_id: { $eq: req.body.product_id } } ]});
      if(check.length>0){
        res.status(200).json({'status': 'failure','message': 'Dish is already added on your wishlist'});
      }
      else
      {
        let user = new Favourites(req.body);
        user.save(function (err,users) {
        if(err){
        res.status(400).send({'status': 'failure','message': err.message});
        }
        else{
          res.status(200).json({'status': 'success','message': 'Dish added successfully','result':users});
        }
        })
      }
    });

  apiRoutes.post('/delete_fav_item', upload.any(), async function (req, res, next) {
  Favourites.findByIdAndRemove({_id: req.body.id}, function(err,){
  if(err){
    res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
  }
  else {
    res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
  }
  });
  });

  apiRoutes.post('/fetch_fave_by_user', upload.any(), async function (req, res, next) {
    let id = mongoose.Types.ObjectId(req.body.uid);
      try{
        let items = await Favourites.aggregate([
        { $match: { uid: { $eq: id } } },
        { $lookup:
          {
            from: 'dishes',
            localField: 'product_id',
            foreignField: '_id',
            as: 'store'
          },
          },
          { $unwind : "$store" },
        ]).exec();
        if(items.length>0)
        {
          res.status(200).json({'status': 'success','message': 'data available here','result': items});
        }
        else
        {
          res.status(400).send({'status': 'failure','message': 'wishlist is empty','result': []});
        }
      }
      catch(e)
      {
        res.status(400).send({'status': 'failure','message': err.message,'result': []});
      }
    });

  apiRoutes.post('/place_order_on', upload.any(), async function (req, res, next) {
    const check= await Carts.aggregate([
      { $match:{ $and: [{ uid: { $eq: mongoose.Types.ObjectId(req.body.uid) } },{ restu_ids: { $eq: mongoose.Types.ObjectId(req.body.restu_id) } } ]}},
      { $lookup:
        {
          from: 'dishes',
          localField: 'product_id',
          foreignField: '_id',
          as: 'item'
        }
      },
      ]).exec();
    if(check.length>0){
      let subtotal=0;
          for (var i = check.length - 1; i >= 0; i--) {
            subtotal+=check[i].quantity*check[i].item[0].price;
          }
        try{
            let comm = await Restaurants.findOne({_id:mongoose.Types.ObjectId(req.body.restu_id)});
            if(comm && comm !==null){
            let admin=subtotal*comm.commission/100;
            let vendor=subtotal-admin;
            req.body.admin_earning=admin;
            req.body.vendor_earning=vendor;
            req.body.grand_total=Math.round(subtotal);
            req.body.sub_total=Math.round(subtotal);
            req.body.pickup_end=0;
            req.body.pickup_start=0;
            req.body.order_ready=false;
            req.body.vendor_status=1;
            req.body.cancel_by_customer=false;
            req.body.order_status='hold';
            let user = new Orders(req.body);
            let doc = await user.save();
            if(doc._id)
            {
              try{
                  let myorder=[];
                  for (var i = check.length - 1; i >= 0; i--) {
                    myorder.push({oid:mongoose.Types.ObjectId(doc._id),product_id:mongoose.Types.ObjectId(check[i].product_id),isGroup:check[i].isGroup,
                      dish_name:check[i].item[0].name,image:check[i].item[0].images[0],quantity:check[i].quantity,price:check[i].item[0].price});
                  }
               let items= await OrderItems.insertMany(myorder);
               res.status(200).json({'status': 'success','message': 'Order place successfully','result':items}); 
              }
              catch(e)
              {
                res.status(400).send({'status': 'failure','message': e.message,'result': []});
              }
            }
            else
            {
              res.status(400).send({'status': 'failure','message': 'Order not place something went wrong','result': []});
            }
          }
          else{
            res.status(400).send({'status': 'failure','message': 'Invalid Restaurants','result': []});
          }
          }
          catch(e)
          {
            res.status(400).send({'status': 'failure','message': e.message,'result': []});
          }
      }
      else
      {
         res.status(200).json({'status': 'failure','message': 'Dish is not available at the moment'});
        
      }
  });

    apiRoutes.post('/fetch_order_by_id', upload.any(), async function (req, res, next) {
      let id = req.body.uid;
        Orders.find({uid:mongoose.Types.ObjectId(id)}, function (err, user){
        if(err){
          res.status(400).send({'status': 'failure','message': 'Something went wrong'});
        }
        else {
          res.status(200).json({'status': 'success','message': 'Orders is available here','result': user});
        }
        });
      });


    apiRoutes.post('/fetch_notifications_by_id', upload.any(), async function (req, res, next) {
      let id = req.body.uid;
        Notifications.find({uid:mongoose.Types.ObjectId(id)}, function (err, user){
        if(err){
          res.status(400).send({'status': 'failure','message': 'Something went wrong'});
        }
        else {
          res.status(200).json({'status': 'success','message': 'Notifications is available here','result': user});
        }
        });
      });

    apiRoutes.post('/fetch_orderItem', upload.any(), async function (req, res, next) {
      let id = req.body.oid;
        OrderItems.find({oid:mongoose.Types.ObjectId(id)}, function (err, user){
        if(err){
          res.status(400).send({'status': 'failure','message': 'Something went wrong'});
        }
        else {
          res.status(200).json({'status': 'success','message': 'Orders is available here','result': user});
        }
        });
      });

    apiRoutes.post('/cancel_order_by_customer', upload.any(), async function (req, res, next) {
      let oid = mongoose.Types.ObjectId(req.body.oid);
      let uid = mongoose.Types.ObjectId(req.body.uid);
      let client={order_status:'cancel',cancel_by_customer:true};
      Orders.findOneAndUpdate({$and: [{ _id: req.body.oid }, { uid: req.body.uid },{ vendor_status: 1 },{order_status:'hold'}]}, client,function(err, data) {
        if(err){
          res.status(400).send({'status': 'failure','message': 'Something went wrong'});
        }
        else {
          res.status(200).json({'status': 'success','message': 'Orders cancel successfully','result': data});
        }
      });
    });

    apiRoutes.post('/save_order_with_payment', upload.any(), async function (req, res, next) {
      let oid = mongoose.Types.ObjectId(req.body.oid);
      let uid = mongoose.Types.ObjectId(req.body.uid);
      let client={order_status:'cancel',cancel_by_customer:true};
      if(req.body.oid && req.body.uid && req.body.trans_id && req.body.status)
      {
        let client={payment_status:req.body.status,payment_method:'Stripe',trans_id:req.body.trans_id,payment_time:Date.now()};
        Orders.findOneAndUpdate({$and: [{ _id: req.body.oid }, { uid: req.body.uid },{ vendor_status: 1 }]}, client,function(err, data) {
        if(err){
          res.status(400).send({'status': 'failure','message': err.message});
        }
        else {
          res.status(200).json({'status': 'success','message': 'Orders update successfully'});
        }
      });
      }
      else
      {
        res.status(200).json({'status': 'failure','message': 'please enter valid details'});
      }
    });






module.exports = apiRoutes;

