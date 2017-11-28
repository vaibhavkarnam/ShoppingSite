/**
 * Created by Sourabh Punja on 8/6/2017.
 */
var mongoose = require('mongoose');
var productSchema = require('./product.schema.server');
var db = require("../database");

var productModel = mongoose.model('productModel',productSchema);
var userModel = require('../user/user.model.server');

websiteModel.createProduct = createProduct;
websiteModel.updateProduct = updateProduct;
websiteModel.findAllProducts = findAllProducts;
websiteModel.deleteProduct = deleteProduct;
websiteModel.findProductById = findProductById;
websiteModel.deleteReview = deleteReview;
websiteModel.addReview = addReview;

module.exports = websiteModel;

function updateProduct(productId,product){
    return productModel
        .update({_id:productId},{$set:product});
}

function findProductById(productId) {
    return productModel
        .findById(productId);
}

function findAllProducts(){
    return productModel.find();
}

function createProduct(product){
    return productModel
        .create(product)
        .then(function (product){
            return product;
        });
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
