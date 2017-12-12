/**
 * Created by vaibhav on 09-12-2017.
 */

var mongoose = require('mongoose');
var returnSchema = require('./return.schema.server');
var db = require("../database");

var returnModel = mongoose.model('ReturnModel',returnSchema);

var productModel = require('../product/product.model.server');
var userModel = require('../user/user.model.server');

returnModel.deleteReturn = deleteReturn;
returnModel.addReview = addReview;
returnModel.createReturn = createReturn;
returnModel.updateReview = updateReview;
returnModel.getReviewforUserId = getReviewforUserId;
returnModel.deleteReviews = deleteReviews;
returnModel.findAllReturnedProducts = findAllReturnedProducts;
returnModel.getReviewforId = getReviewforId;
module.exports = returnModel;



function createReturn(onereturn)
{
    return returnModel
        .create(onereturn);
}


function addReview(productId,reviewId){
    return reviewModel.findProductById(productId)
        .then(function (product){
            product.reviews.push(reviewId);
            return product.save();
        })
}


function updateReview( reviewId, review) {
    return reviewModel.update(
        { _id : reviewId },
        {
            description: review.description
        });
}

function getReviewforId(productId)
{
    return reviewModel
        .find({productid : productId});
}

function getReviewforUserId(userId)
{
    return reviewModel
        .find({ userID : userId });
}

function deleteReviews(userId)
{
    return reviewModel
        .deleteMany({ userID : userId })
}

function deleteReturn(returnId)
{
    return returnModel
        .findByIdAndRemove({ _id : returnId})
}

function  findAllReturnedProducts() {

    return returnModel
        .find();
}