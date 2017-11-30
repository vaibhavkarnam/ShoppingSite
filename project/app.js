/*var connectionString = 'mongodb://127.0.0.1:27017/webdev_summer2_2017'; // for local
 if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
     var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
     var password = process.env.MLAB_PASSWORD_WEBDEV;
     connectionString = 'mongodb://' + username + ':' + password;
     connectionString += ''; // user yours
 }
// Replace "@ds157268.mlab.com:57268/heroku_nh37fqq4"
// above with your own URL given to you by mLab

var mongoose = require("mongoose");
//mongoose.connect(connectionString);
/*mongoose.connect("mongodb://localhost/projectDB");
mongoose.Promise = require('q').Promise;*/

require("./services/product.service.server");
require("./services/user.service.server");
/*
require("./website.service.server");
require("./page.service.server");
require("./widget.service.server");
//for project-backup yelp
require("./restaurant.service.server");
require("./review.service.server");
*/
