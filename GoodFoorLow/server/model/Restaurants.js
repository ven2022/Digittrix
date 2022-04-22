const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
let Restaurants = new Schema({
  name: {
    type: String,
    required: true,maxLength: 20,minLength: 3, 
  },
  about_us:
  {
    type: String,
    required: true,maxLength: 100,minLength: 5,
  },
  address:
  {
    type: String,
    required: true,maxLength: 100,minLength: 5,
  },
  banner_image:
  {
    type: String,
    required: true,
  },
  commission:
  {
    type: Number,
    required: true,maxLength: 2,minLength: 1,min:1
  },
  description:
  {
    type: String,
    required: true,maxLength: 500,minLength: 5,
  },
  featured_images:
  {
    type: Array,
    required: true,
  },
   location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    }
  },
  phone_no:
  {
    type: Number,
    required: true,maxLength: 12,minLength: 10,
  },
  ratting:
  {
    type: Number,
    required: true,
  },
  status:
  {
    type: Number,
    required: true,
  },
  timings:
  {
    type: String,
    required: true,maxLength: 50,minLength: 2,
  },
  title:
  {
    type: String,
    required: true,maxLength:150,minLength: 5,
  },
  restaurant_email:
  {
    type: String,
    index: true, unique: true, required: true
  },
  restaurant_url:
  {
    type: String,
    required: true,maxLength: 100,minLength: 5,
  },
  password:{
    type: String,
    required: true,maxLength: 50,minLength: 6,
  },
  store_id:
  {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  discover:
  {
    type: Boolean,
    default:false,
  },
  group_of_day:
  {
    type: Boolean,
    default:false,
  },
  top_week:
  {
    type: Boolean,
    default:false,
  },
},{
    collection: 'restaurants'
});
Restaurants.pre("save", function (next) {
    const user = this
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
            user.password = hash
            next()
          })
        }
      })
    } else {
      return next()
    }
  })


Restaurants.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};
Restaurants.plugin(uniqueValidator);
Restaurants.index({location: '2dsphere'});
module.exports = mongoose.model('Restaurants',Restaurants);
