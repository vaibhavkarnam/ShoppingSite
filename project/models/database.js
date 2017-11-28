/**
 * Created by Sourabh Punja on 8/5/2017.
 */

var q = require('q');

var connectionString = 'mongodb://127.0.0.1:27017/db_project_2017'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds129459.mlab.com:29459/heroku_4kxrfc6l'; // user yours
}
// Replace "@ds157268.mlab.com:57268/heroku_nh37fqq4"
// mongodb://<dbuser>:<dbpassword>@ds129459.mlab.com:29459/heroku_4kxrfc6l
// above with your own URL given to you by mLab

var mongoose = require("mongoose");
var db = mongoose.connect(connectionString);
mongoose.Promise = q.Promise;
module.exports = db;