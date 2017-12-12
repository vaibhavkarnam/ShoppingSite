/**
 * Created by Sourabh Punja on 8/6/2017.
 */
var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId, ref:"userModel"},
    name: String,
    brand: String,
    userName: String,
    description: String,
    Question: String,
    answered :{type:Number,default:0},
    category: String,
    price: String,
    Review: String,
    stock: String,
    color:String,
    imageurl: [String],
    productid:String,
    customerratingurl:String,
    customerrating:String,
    primaryimageurl:String,
    sort:{type:Number,default:0},

    // phone: String
    // websites: [{type: mongoose.Schema.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date,default: Date.now()},
    reviews:[{type:mongoose.Schema.Types.ObjectId, ref:'ReviewModel'}],
    _user : {type : mongoose.Schema.Types.ObjectId, ref : "UserModel"},
    itemId:String
},{collection: "product"});

module.exports = productSchema;