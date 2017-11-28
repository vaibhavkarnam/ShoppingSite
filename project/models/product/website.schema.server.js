/**
 * Created by Sourabh Punja on 8/6/2017.
 */
var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    developerId:{type: mongoose.Schema.Types.ObjectId, ref:'UserModel'},
    name: String,
    description: String,
    // phone: String
    // websites: [{type: mongoose.Schema.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date,default: Date.now()},
    pages:[{type:mongoose.Schema.Types.ObjectId, ref:'PageModel'}]
},{collection: "website"});

module.exports = websiteSchema;