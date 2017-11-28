/**
 * Created by Sourabh Punja on 8/4/2017.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    roles: [{type:String,default:'USER',enum:['USER','STUDENT','FACULTY','ADMIN']}],
    email: String,
    dob: Date,
    isAdmin: Boolean,
    google:{
        id: String,
        token: String
    },
    // phone: String
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date,default: Date.now()}
},{collection: "user"});

module.exports = userSchema;