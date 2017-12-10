/**
 * Created by Sourabh Punja on 7/28/2017.
 */
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

// var users = [
//     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
//         {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
//         {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
//         {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" , isAdmin:true }
//     ];

//html handlers
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
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
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/#!/profile',
        failureRedirect: '/assignment/#!/login'
    }));
app.get("/api/seller", getSellersList);
app.post("/api/seller/followMe", followMe);

function getSellersList(req, res){
    userModel.getSellersList()
        .then(function (owners){
            res.json(owners);
        })
}

function followMe(req, res){
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
                })
            //res.sendStatus(200);
        })
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
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
        .then(function (user) {
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

function unRegisterUser(req,res){
    userModel
        .deleteUser(req.user._id)
        .then(function (status){
            res.sendStatus(200);
        });
}

function checkAdmin(req,res){
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1){
        res.json(req.user)
    } else{
        res.send('0');
    }
}

function logout(req,res){
    req.logout();
    res.sendStatus(200);
}

function checkLoggedIn(req,res){
    if(req.isAuthenticated()){
        res.json(req.user)
    } else{
        res.send('0');
    }
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
               userModel
                   .deleteUser(userId)
                   .then(function (status){
                       res.json(status);
                   },function (err) {
                       res.sendStatus(404).send(err);
                   });
        });


    // for(var u in users) {
    //         if (users[u]._id === userId) {
    //             var index = users.indexOf(users[u]);
    //             users.splice(index, 1);
    //             res.sendStatus(200);
    //         }
    //     }
    // res.sendStatus(404);
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (!user) {
                    done(null, false);
                }
                else{
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

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
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

function login(req,response){
    var user = req.user;
    response.json(user);
}

function updateUser(req, res){
    var userId = req.params.userId;
    var user = req.body;
    // console.log(typeof user.dob);

    userModel
        .updateUser(userId,user)
        .then(function (status){
            // console.log(status);
            // res.json(status);
            return userModel
                .findUserById(userId);
        },function (err){
            res.sendStatus(404).send(err);
        })
        .then(function (user){
            // console.log(user);
            res.json(user);
            return;
        },function (err) {
            res.sendStatus(404).send(err);
            return;
            // }
        });
    // for(var u in users) {
    //     if(users[u]._id === userId) {
    //         // if (typeof user.dob !== 'undefined'){
    //         //     user.dob = new Date(user.dob);
    //         //     // var parts =user.dob.split('-');
    //         //     // user.dob = new Date(parts[2],parts[0]-1,parts[1]);
    //         // }
    //         users[u] = user;
    //         // console.log(typeof users[u].dob);
    //         res.send(users[u]);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}
function registerUser(req, res) {
    console.log("user is inside");
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user){
            req.login(user, function(status){
                res.json(user);
            });
        });

    // user._id = (new Date()).getTime() + "";
    // users.push(user);
}

function findUser(req,response){
    var username = req.query.username;
    var password = req.query.password;
    var body = req.body;
    // var username = body.username;
    // var password = body.password;

    if (username && password){
        userModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                // console.log(user);
                response.json(user);
                return;
            },function (err) {
                response.sendStatus(404).send(err);
                return;
                // }
            });
        // for(var u in users) {
        //     var _user = users[u];
        //     if (_user.username === username && _user.password === password) {
        //         response.send(_user);
        //         return;
        //     }
        // }
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
        // for(var u in users) {
        //     if(users[u].username === username) {
        //         response.send(users[u]);
        //         return;
        //     }
        // }
    }
    response.send("0");
}

function getAllUsers(req,response) {
    userModel
        .findAllUsers()
        .then(function (users) {
            response.json(users);
            return;
        },function (err) {
            response.sendStatus(404).send(err);
            return;
            // }
        });
    // response.send(users);
}

function isAdmin(req,res,next) {
    console.log(req.user);
    if (req.isAuthenticated()&& req.user.roles.indexOf('ADMIN') > -1){
        next();
    } else{
        res.sendStatus(401);
    }
}

function getUserById(req,response){

    var userId = req.params.userId;
    userModel
        .findUserById(userId)
        .then(function (user) {
            // if (user._id === userId){
                        // if (typeof user.date !== 'undefined'){
                        //     user.toISOString().split("T")[0];
                        // }
            console.log(user);
            response.json(user);
        // }
        });
    // for(var u in users){
    //     console.log(users);
    //     if (users[u]._id === req.params.userId){
    //         // if (typeof users[u].date !== 'undefined'){
    //         //     users[u].toISOString().split("T")[0];
    //         // }
    //         response.send(users[u]);
    //     }
    // }
}

function createUser(request, response) {
    var newuser = request.body;
    //console.log("user service")
    //console.log(newuser);

    userModel
        .createUser(newuser)
        .then(function (user){
            console.log(user);
            response.json(user);
            // $http.post("/api/login", {username:user.data.username, password:user.data.password});
        });
    //return;
}

