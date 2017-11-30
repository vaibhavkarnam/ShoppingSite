/**
 * Created by Sourabh Punja on 8/4/2017.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    roles: [{type:String,default:'USER',enum:['USER','CUSTOMER','SELLER','ADMIN','REPRESENTATIVE','TECHNICIAN']}],
    email: String,
    dob: Date,
    isAdmin: Boolean,
    google:{
        id: String,
        token: String
    },
    // phone: String
    UserReview : [{type:mongoose.Schema.Types.ObjectId, ref:"productSchema"}],
    dateCreated: {type: Date,default: Date.now()},
    products: [{type: mongoose.Schema.Types.ObjectId, ref: "ProductModel"}],
    services: [{type: mongoose.Schema.Types.ObjectId, ref: "ServiceModel"}],
    createdProducts: [{type: mongoose.Schema.Types.ObjectId, ref: "ProductModel"}],
    returns: [{type: mongoose.Schema.Types.ObjectId, ref: "ReturnModel"}],
},{collection: "user"});

module.exports = userSchema;