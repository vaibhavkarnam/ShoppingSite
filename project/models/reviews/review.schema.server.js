/**
 * Created by vaibhav on 09-12-2017.
 */

var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId, ref:"userModel"},
    userName: String,
    description: String,
    color:String,
    productid: Number,
    productName: String,
    _user : {type : mongoose.Schema.Types.ObjectId, ref : "UserModel"}

},{collection: "review"});

module.exports = reviewSchema;