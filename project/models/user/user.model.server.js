/**
 * Created by Sourabh Punja on 8/4/2017.
 */

var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var db = require("../database");

var userModel = mongoose.model('UserModel',userSchema);
userModel.createUser = createUser;
userModel.updateUser = updateUser;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.addProduct = addProduct;
userModel.deleteProduct = deleteProduct;
userModel.addService = addService;
userModel.deleteService = deleteService;
userModel.addReturn = addReturn;
userModel.deleteReturn = deleteReturn;

module.exports = userModel;

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId})
}

function findUserByUsername(username){
    return userModel.findOne({username:username});
}

function findAllUsers(){
    return userModel.find();
}
function findUserByCredentials(username,password){
    // console.log(userModel.findOne({username:username,password:password}));
    return userModel.findOne({username:username,password:password});
}

function createUser(user){
    user.roles =['USER'];
    return userModel.create(user);
}

function updateUser(userId, user){
    delete user.username;
    delete user.password;
    return userModel.update({_id:userId},
        {$set: user});
}

function deleteUser(userId){
    return userModel.remove({_id: userId});
}

function findUserById(userId){
    return userModel.findById(userId);
}

function deleteProduct(userId,productId){
    return userModel
        .findById(userId)
        .then (function (user){
            var index = user.products.indexOf(productId);
            user.products.splice(index,1);
            return user.save();
        });
}

function addProduct(userId, productId){
    return userModel
        .findById(userId)
        .then (function (user){
            user.products.push(productId);
            return user.save();
        });
}

function deleteService(userId,serviceId){
    return userModel
        .findById(userId)
        .then (function (user){
            var index = user.services.indexOf(serviceId);
            user.services.splice(index,1);
            return user.save();
        });
}

function addService(userId, serviceId){
    return userModel
        .findById(userId)
        .then (function (user){
            user.services.push(serviceId);
            return user.save();
        });
}

function deleteReturn(userId,returnId){
    return userModel
        .findById(userId)
        .then (function (user){
            var index = user.services.indexOf(returnId);
            user.returns.splice(index,1);
            return user.save();
        });
}

function addReturn(userId, returnId){
    return userModel
        .findById(userId)
        .then (function (user){
            user.returns.push(returnId);
            return user.save();
        });
}