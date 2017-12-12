/**
* Created by vaibhav on 09-12-2017.
*/

var mongoose = require('mongoose');
var reviewSchema = require('./review.schema.server');
var db = require("../database");

var reviewModel = mongoose.model('ReviewModel',reviewSchema);

var productModel = require('../product/product.model.server');
var userModel = require('../user/user.model.server');

reviewModel.deleteReview = deleteReview;
reviewModel.addReview = addReview;
reviewModel.createReview = createReview;
reviewModel.deleteReviews = deleteReviews;
reviewModel.findReviewById = findReviewById;
reviewModel.updateReview = updateReview;
reviewModel.getReviewforUserId = getReviewforUserId;
reviewModel.getReviewforId = getReviewforId;
module.exports = reviewModel;



function createReview(newReview, userId)
{
console.log("creating");
console.log(newReview);
return reviewModel
    .create(newReview).then(function (review)
    {

        console.log("reviewing");
        userModel.addReview( review._id, userId);
        return review;
    })
}


function addReview(productId,reviewId){
return reviewModel.findProductById(productId)
    .then(function (product)
    {

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


function deleteReviews(userId)
{

return reviewModel.deleteMany({ userID : userId })
}

function getReviewforId(productId)
{

return reviewModel.find({productid : productId});
}

function getReviewforUserId(userId)
{

return reviewModel.find({ userID : userId });
}

function deleteReview(reviewId)
{

return reviewModel.findByIdAndRemove({ _id : reviewId})
}

function  findReviewById(reviewId) {


return reviewModel.find({ _id : reviewId });
}