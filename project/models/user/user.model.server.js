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
userModel.addReview = addReview;
userModel.deleteCreatedProduct = deleteCreatedProduct;
userModel.addCreatedProduct = addCreatedProduct;
/*userModel.addProduct = addProduct;*/
module.exports = userModel;

function addProduct(userId,productId){
    return userModel.findUserById(userId)
        .then(function (user){
            user.products.push(productId);
            user.save();
        })
}

function addReview(reviewId,Id)
{
    return userModel
        .findUserById(Id)
        .then(function (user)
        {
            user.UserReview.push(reviewId);
            return user.save();
        }, function (error)
        {
            return error;
        });
}

function getReviewforId(ReviewId)
{
    return productModel
        .find({ _id : ReviewId });
}

function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId})
}

function findUserByUsername(username){
    return userModel.findOne({username:username})
        .populate('createdProducts')
        .exec();
}

function findAllUsers(){
    return userModel.find();
}
function findUserByCredentials(username,password){
    // console.log(userModel.findOne({username:username,password:password}));
    return userModel.findOne({username:username,password:password})
        .populate('createdProducts')
        .exec();
}

function createUser(user){
    user.roles.push('USER');
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
    return userModel.findById(userId)
            .populate('createdProducts')
            .exec();
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

function deleteCreatedProduct(userId,productId){
    return userModel
        .findById(userId)
        .then (function (user){
            var index = user.createdProducts.indexOf(productId);
            user.createdProducts.splice(index,1);
            return user.save();
        });
}

function addCreatedProduct(userId, productId){
    console.log("fff");
    return userModel
        .findById(userId)
        .then (function (user){
            user.createdProducts.push(productId);
            return user.save();
        });
}