const express = require('express');
const app = express();
const pagesRoutes = express.Router();
let Pages = require('../model/Pages');
var ObjectId = require('mongodb').ObjectID;
const upload = require('../Middleware/middleware');


// api to edit user
pagesRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Pages.findById(id, function (err, user){
    if(err){
      res.status(400).send({'status': 'failure','message': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','user': user});
    }
  });
});

// api to update route
  pagesRoutes.post('/update/:id', upload.any(), async function (req, res, next) {
    Pages.findById(req.params.id, function(err, user) {
    if (!user){
      res.status(400).send({'status': 'failure','message': 'Unable to find data'});
    } else {
            const client = req.body;
            Pages.update({_id: req.params.id}, client,function(err, data) {
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


module.exports = pagesRoutes;