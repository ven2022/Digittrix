var express = require('express'),
path = require('path'),
cors = require('cors'),
mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let uri = 'mongodb+srv://digit_goodforlow:ferdog-1gIpki-dyhzas@cluster0.tfp0x.mongodb.net/Goodforlow?retryWrites=true&w=majority';
let uriParts = uri.split('@')
let loginDetails = uriParts[0].split(':')
loginDetails[2] = encodeURIComponent(loginDetails[2])
uri = `${loginDetails[0]}:${loginDetails[1]}:${loginDetails[2]}@${uriParts[1]}`
mongoose.connect(uri, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)});
const storeRoute = require('./routes/storeRoute');
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const categoriesRoute = require('./routes/categoriesRoute');
const apiRoute = require('./routes/apiRoute');
const vendorRoute = require('./routes/vendorRoute');
const restaurantsRoute = require('./routes/restaurantsRoute');
const couponsRoute = require('./routes/couponsRoute');
const goodwordsRoute = require('./routes/goodwordsRoute');
const pagesRoute = require('./routes/pagesRoute');
const notificationsRoute = require('./routes/notificationsRoute');
var app = express();
var bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/store', storeRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);
app.use('/api', apiRoute);
app.use('/pages', pagesRoute);
app.use('/vendor', vendorRoute);
app.use('/categories', categoriesRoute);
app.use('/restaurants', restaurantsRoute);
app.use('/coupons', couponsRoute);
app.use('/goodwords', goodwordsRoute);
app.use('/notifications', notificationsRoute);
app.use(express.static("my_uploaded_files/images"));
app.listen(5000,function(){
    console.log('Listening on port 5000!');
});


// mongodb+srv://digit_goodforlow:<password>@cluster0.tfp0x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority