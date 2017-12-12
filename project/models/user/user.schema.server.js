var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    roles: [{type:String,default:'USER',enum:['USER','CUSTOMER','SELLER','ADMIN','REPRESENTATIVE','TECHNICIAN']}],
    dob: Date,
    email: String,
    isAdmin: Boolean,
    dateCreated: {type: Date,default: Date.now()},
    image_url: String,
    UserReview : [{type:mongoose.Schema.Types.ObjectId, ref:"ProductModel"}],
    UserQuestion : [{type:mongoose.Schema.Types.ObjectId, ref:"ProductModel"}],
    products: [{type: mongoose.Schema.Types.ObjectId, ref: "ProductModel"}],
    services: [{type: mongoose.Schema.Types.ObjectId, ref: "ServiceModel"}],
    createdProducts: [{type: mongoose.Schema.Types.ObjectId, ref: "ProductModel"}],
    returns: [{type: mongoose.Schema.Types.ObjectId, ref: "ReturnModel"}],
    following: [{type :String}],
    followed : [{type : String}],
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: "ProductModel"}],
    returns: [{type: mongoose.Schema.Types.ObjectId, ref: "ProductModel"}]
},{collection: "user"});

module.exports = userSchema;