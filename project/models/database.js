
var q = require('q');

var connectionString = 'mongodb://127.0.0.1:27017/db_project_2017';
if(process.env.MLAB_USERNAME_WEBDEV)
{
    var username = process.env.MLAB_USERNAME_WEBDEV;
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds129459.mlab.com:29459/heroku_4kxrfc6l';
}


var mongoose = require("mongoose");
var db = mongoose.connect(connectionString);
mongoose.Promise = q.Promise;
module.exports = db;