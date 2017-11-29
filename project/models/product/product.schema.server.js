/**
 * Created by Sourabh Punja on 8/6/2017.
 */
var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    name: String,
    brand: String,
    description: String,
    price: String,
    color: String,
    stock: String,
    imageurl: [String],
    customerratingurl:String,
    customerrating:String,
    // phone: String
    // websites: [{type: mongoose.Schema.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date,default: Date.now()},
    reviews:[{type:mongoose.Schema.Types.ObjectId, ref:'ReviewModel'}]
},{collection: "product"});

module.exports = productSchema;