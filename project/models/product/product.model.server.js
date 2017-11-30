/**
 * Created by Sourabh Punja on 8/6/2017.
 */
var mongoose = require('mongoose');
var productSchema = require('./product.schema.server');
var db = require("../database");

var productModel = mongoose.model('productModel',productSchema);
var userModel = require('../user/user.model.server');

productModel.createProduct = createProduct;
productModel.updateProduct = updateProduct;
productModel.findAllProducts = findAllProducts;
productModel.deleteProduct = deleteProduct;
productModel.findProductById = findProductById;
productModel.deleteReview = deleteReview;
productModel.addReview = addReview;
productModel.createReview = createReview;
productModel.getReviewforId = getReviewforId;
userModel.getReviewforId = getReviewforId;

module.exports = productModel;

function updateProduct(productId,product){
    return productModel
        .update({_id:productId},{$set:product});
}

function findProductById(productId) {
    return productModel
        .findById(productId);
}

function createReview(newReview, userId)
{
    return productModel
        .create(newReview)
        .then(function (review)
        {
            userModel
                .addReview( review._id, userId);
            return review;
        })
}

function getReviewforId(ReviewId)
{
    return productModel
        .find({ productid : ReviewId });
}

function findAllProducts(){
    return productModel.find();
}

function createProduct(product){
/*    return productModel
        .create(product)
        .then(function (product){
            return product;
        });*/
    var producttmp = null;
    if(product._id == null){
        return productModel
            .create(product)
            .then(function (productDoc){
                producttmp = productDoc;
                return userModel.addProduct(product._user, productDoc._id)
            }, function(error){
                return res.json({error:error.message});
            }).catch(function () {
                console.log("Promise Rejected");
            })
            .then(function (userDoc) {
                return producttmp;
            });
    }else{
        return productModel
            .findById({_id : product._id});
    }
}

function deleteProduct(productId){
    return productModel
        .remove({_id: websiteId})
        .then(function (status){
            return status;
        });
}

function deleteReview(productId,reviewId){
    return productModel.findProductById(productId)
        .then(function (product){
           var index = product.reviews.indexOf(reviewId);
            product.reviews.splice(index,1);
           return product.save();
        });
}

function addReview(productId,reviewId){
    return productModel.findProductById(productId)
        .then(function (product){
            product.reviews.push(reviewId);
            return product.save();
        })
}
