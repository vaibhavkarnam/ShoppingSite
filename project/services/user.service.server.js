
var app = require("../../express");
var cookie = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var userModel = require("../models/user/user.model.server");
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/DBproject/uploads'});
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(localStrategy));



passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);



app.get("/api/users",isAdmin,getAllUsers);
app.get("/api/user/:userId",getUserById);
app.get("/api/user",findUser);
app.post("/api/user",registerUser);
app.post("/api/user/create", createUser);
app.put("/api/user/:userId",updateUser);
app.delete("/api/unregister",unRegisterUser);
app.delete("/api/user/:userId",isAdmin,deleteUser);
app.post("/api/login", passport.authenticate('local'),login);
app.post("/api/upload/project",upload.single('myFile'), uploadImage);
app.get("/api/checkLoggedIn", checkLoggedIn);
app.get("/api/checkAdmin", checkAdmin);
app.post("/api/logout", logout);


app.get("/api/seller", getSellersList);
app.post("/api/seller/followMe", followMe);

function getSellersList(req, res)
{
userModel.getSellersList()
.then(function (owners){
    res.json(owners);
})
}



function followMe(req, res)
{
var user = req.user;
var body = req.body;
var userId = body.userId._id;
var sellerName = body.sellerName;
var owner = {};

userModel
.updateFollowing(userId, sellerName)
.then(function (response){
    userModel
        .updateFollowed(sellerName, user.username)
        .then(function (response){
            res.sendStatus(200);
        });})
}

function uploadImage(req, res) {

var myFile        = req.file;

var userId        = req.body.userId;

var originalname  = myFile.originalname; // file name on user's computer
var filename      = myFile.filename;     // new file name in upload folder
var path          = myFile.path;         // full path of uploaded file
var destination   = myFile.destination;  // folder where file is saved to
var size          = myFile.size;
var mimetype      = myFile.mimetype;
var photourl     = '/DBProject/uploads/'+filename;

return userModel
.findUserById(userId)
.then(function (user)
{
    user.image_url=photourl;
    userModel
        .updateUser(userId, user)
        .then(function (status) {
            var callbackUrl = "/DBproject/#!/profile";
            res.redirect(callbackUrl);
        }, function (err) {
            console.log(err);
            return err;
        });
});
}

function unRegisterUser(req,res)
{
userModel
.deleteUser(req.user._id)
.then(function (status){
    res.sendStatus(200);
});
}

function checkAdmin(req,res)
{
if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1){
res.json(req.user)
} else{
res.send('0');
}
}

function logout(req,res)
{
req.logout();
res.sendStatus(200);
}


function deleteUser(req, res)
{
var userId = req.params.userId;
userModel
.findUserById(userId)
.then(function (user)
{
       userModel
           .deleteUser(userId)
           .then(function (status){
               res.json(status);
           },function (err) {
               res.sendStatus(404).send(err);
           });
});}


function checkLoggedIn(req,res)
{
if(req.isAuthenticated()){
res.json(req.user)
} else{
res.send('0');
}
}

function localStrategy(username, password, done)
{
userModel
.findUserByCredentials(username, password)
.then(
    function(user)
    {
        if (!user) {
            done(null, false);
        }
        else
            {
            done(null, user);
        }
    },
    function(err) {
        if (err) {
            done(err,false);
        }
    }
);
}

function serializeUser(user, done)
{
done(null, user);
}

function deserializeUser(user, done)
{
userModel
.findUserById(user._id)
.then(
    function(user){
        done(null, user);
    },
    function(err){
        done(err, null);
    }
);
}


function updateUser(req, res)
{
var userId = req.params.userId;
var user = req.body;


userModel
.updateUser(userId,user)
.then(function (status)
{
    return userModel
        .findUserById(userId);
},function (err){
    res.sendStatus(404).send(err);
})
.then(function (user){
    res.json(user);
    return;
},function (err) {
    res.sendStatus(404).send(err);
    return;
});
}






function registerUser(req, res)
{
var user = req.body;
userModel
.createUser(user)
.then(function (user){
    req.login(user, function(status){
        res.json(user);
    });
});
}


function login(req,response)
{
var user = req.user;
response.json(user);
}


function findUser(req,response)
{
var username = req.query.username;
var password = req.query.password;
var body = req.body;
if (username && password)
{
userModel
    .findUserByCredentials(username,password)
    .then(function (user)
    {
        // console.log(user);
        response.json(user);
        return;
    },function (err)
    {
        response.sendStatus(404).send(err);
        return;
        // }
    });
return;
} else if(username){
userModel
    .findUserByUsername(username)
    .then(function (user) {
        // console.log(user);
        response.json(user);
        return;
    },function (err) {
        response.sendStatus(404).send(err);
        return;
    });
return;
}
response.send("0");

}

function getUserById(req,response)
{

    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            console.log(user);
            response.json(user);
        });
}



function getAllUsers(req,response)
{
userModel
.findAllUsers()
.then(function (users)
{
    response.json(users);
    return;
},function (err)
{
    response.sendStatus(404).send(err);
    return;
});}

function isAdmin(req,res,next)
{
console.log(req.user);
if (req.isAuthenticated()&& req.user.roles.indexOf('ADMIN') > -1){
next();
} else{
res.sendStatus(401);}
}

function createUser(request, response)
{
var newuser = request.body;
userModel
.createUser(newuser)
.then(function (user){
    console.log(user);
    response.json(user);
});}

