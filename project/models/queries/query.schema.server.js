var mongoose = require('mongoose');

var querySchema = mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId, ref:"userModel"},
    userName: String,
    description: String,
    productid: Number,
    productName: String,
    answer: String,
    answered :{type:Number,default:0},
    _user : {type : mongoose.Schema.Types.ObjectId, ref : "UserModel"}

},{collection: "queries"});

module.exports = querySchema;