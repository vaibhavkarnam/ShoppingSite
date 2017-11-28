var app = require('./express');
var express = app.express;


var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
// require("./utilities/filelist");

app.use(cookieParser());
app.use(session({ secret: "put some text here" }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

require("./project/app");
//require ('./POC/app');

app.listen(process.env.PORT ||3000);