/**
 * Created by vaibhav on 09-12-2017.
 */

var mongoose = require('mongoose');

var returnSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    returnedproduct: {type: mongoose.Schema.Types.ObjectId, ref: "ProductModel"},
    name: String,
    brand: String,
    price: String,
    isApproved: Boolean
},{collection: "return"});

module.exports = returnSchema;