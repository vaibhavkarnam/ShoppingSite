/**
* Created by Sourabh Punja on 8/4/2017.
*/

var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var db = require("../database");

var userModel = mongoose.model('UserModel',userSchema);
userModel.createUser = createUser;
userModel.updateUser = updateUser;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserById = findUserById;
userModel.findUserByCredentials = findUserByCredentials;
userModel.deleteUser = deleteUser;
userModel.addProduct = addProduct;
userModel.deleteProduct = deleteProduct;
userModel.addService = addService;
userModel.deleteService = deleteService;
userModel.addReturn = addReturn;
userModel.deleteReturn = deleteReturn;
userModel.addReview = addReview;
userModel.deleteCreatedProduct = deleteCreatedProduct;
userModel.addCreatedProduct = addCreatedProduct;
userModel.addQuestion = addQuestion;
userModel.getSellersList = getSellersList;
userModel.updateFollowing = updateFollowing;
userModel.updateFollowed = updateFollowed;
userModel.addCreatedProductForOrder = addCreatedProductForOrder;
userModel.addProductForOrder = addProductForOrder;
userModel.addProductForOrder = addProductForOrder;
userModel.removeOrderFromUser = removeOrderFromUser;
userModel.addCreatedProductForReturn = addCreatedProductForReturn;
userModel.addProductForReturn = addProductForReturn;
userModel.removeReturnFromUser = removeReturnFromUser;
module.exports = userModel;

function removeReturnFromUser(userId, productId){
return userModel
    .findById(userId)
    .then(function (user)
    {

        var index = user.returns.indexOf(productId);
        user.returns.splice(index, 1);
        return user.save();
    })
}

function addProductForReturn(userId,productId){
return userModel.findUserById(userId)
    .then(function (user)
    {

        user.returns.push(productId);
        return user.save();
    })
}

function addCreatedProductForReturn(userId, productId){
return userModel
    .findById(userId)
    .then (function (user)
    {

        user.returns.push(productId);
        return user.save();
    });
}

function removeOrderFromUser(userId, productId){
return userModel
    .findById(userId)
    .then(function (user)
    {

        var index = user.orders.indexOf(productId);
        user.orders.splice(index, 1);
        return user.save();
    })
}

function addProductForOrder(userId,productId){
return userModel.findUserById(userId)
    .then(function (user)
    {

        user.orders.push(productId);
        user.save();
    })
}

function addCreatedProductForOrder(userId, productId){
return userModel
    .findById(userId)
    .then (function (user)
    {

        user.orders.push(productId);
        return user.save();
    });
}

function updateFollowed(sellerName, username){
return userModel.findUserByUsername(sellerName)
    .then(function (user)
    {

        user.followed.push(username);
        user.save();
    })
}

function updateFollowing(userId, sellerName){
return userModel.findUserById(userId)
    .then(function (user)
    {

        user.following.push(sellerName);
        user.save();
    })
}

function getSellersList()
{
return userModel.find({roles : "SELLER"});
}

function addProduct(userId,productId){
return userModel.findUserById(userId)
    .then(function (user)
    {

        user.products.push(productId);
        user.save();
    })
}

function addReview(reviewId,Id)
{
return userModel
    .findUserById(Id)
    .then(function (user) {

        user.UserReview.push(reviewId);
        return user.save();
    }, function (error)
    {
        return error;
    });
}

function addQuestion(questionId,Id)
{
return userModel
    .findUserById(Id)
    .then(function (user) {

        user.UserQuestion.push(questionId);
        return user.save();
    }, function (error)
    {

        return error;
    });
}


function findUserByCredentials(username,password)
{
return userModel.findOne({username:username,password:password})
    .populate('createdProducts products orders returns returnstatus')
    .exec();
}

function createUser(user){
user.roles.push('USER');
return userModel.create(user);
}

function findUserByUsername(username)
{
    return userModel.findOne({username:username})
        .populate('createdProducts products orders returns')
        .exec();
}

function findAllUsers(){
    return userModel.find();
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

function findUserById(userId)
{
return userModel.findById(userId)
        .populate('createdProducts products orders returns')
        .exec();
}



/*function addProduct(userId, productId){
return userModel
    .findById(userId)
    .then (function (user){
        user.products.push(productId);
        return user.save();
    });
}*/

function deleteService(userId,serviceId){
return userModel
    .findById(userId)
    .then (function (user)
    {

        var index = user.services.indexOf(serviceId);
        user.services.splice(index,1);
        return user.save();
    });
}


function deleteProduct(userId,productId){
    return userModel
        .findById(userId)
        .then (function (user)
        {

            var index = user.products.indexOf(productId);
            user.products.splice(index,1);
            return user.save();
        });
}





function addService(userId, serviceId){
return userModel
    .findById(userId)
    .then (function (user)
    {

        user.services.push(serviceId);
        return user.save();
    });
}

function deleteReturn(userId,returnId){
return userModel
    .findById(userId)
    .then (function (user)
    {

        var index = user.services.indexOf(returnId);
        user.returns.splice(index,1);
        return user.save();
    });
}

function addReturn(userId, returnId){
return userModel
    .findById(userId)
    .then (function (user)
    {

        user.returns.push(returnId);
        return user.save();
    });
}

function deleteCreatedProduct(userId,productId){
return userModel
    .findById(userId)
    .then (function (user)
    {

        var index = user.createdProducts.indexOf(productId);
        user.createdProducts.splice(index,1);
        return user.save();
    });
}

function addCreatedProduct(userId, productId){
console.log("fff");
return userModel
    .findById(userId)
    .then (function (user)
    {

        user.createdProducts.push(productId);
        return user.save();
    });
}