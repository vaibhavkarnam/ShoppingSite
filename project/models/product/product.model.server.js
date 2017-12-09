/**
 * Created by Sourabh Punja on 8/6/2017.
 */
var mongoose = require('mongoose');
var productSchema = require('./product.schema.server');
var db = require("../database");

var productModel = mongoose.model('ProductModel',productSchema);
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
productModel.findProductByItemId = findProductByItemId;
productModel.createSellerProduct =createSellerProduct;
productModel.createQuestion = createQuestion;
productModel.getQuestionsforId = getQuestionsforId;


module.exports = productModel;

function findProductByItemId(itemId){
    return productModel.find({itemId: itemId});
}

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
        .create(newReview).then(function (review)
        {
            userModel.addReview( review._id, userId);
            return review;
        })
}

function createQuestion(newQuestion, userId)
{
    return productModel
        .create(newQuestion).then(function (question)
        {
            userModel.addQuestion( question._id, userId);
            return question;
        })
}


function getReviewforId(ReviewId)
{
    return productModel
        .find(
            { productid : ReviewId }
            );
}

function getQuestionsforId(Id)
{
    return productModel
        .find(
            { productid : Id }
        );
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
    return productModel
        .findProductByItemId(product.itemId)
        .then(function (product1){
            if(product1.length !=0 ) {
                res.json(product1);
            }else {
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
                        .then(function (productDoc) {
                            return producttmp;
                        });
                }else{
                    return productModel
                        .findById({_id : product._id});
                }
            }
        });
}

function deleteProduct(productId){
    return productModel
        .remove({_id: productId})
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

function createSellerProduct(userId,product){
    var producttmp = null;
    return productModel
        .create(product)
        .then(function (product) {
            producttmp = product;
            return userModel
                .addCreatedProduct(userId,product._id);
        })
        .then(function (user) {
            return producttmp;
        }).catch(function(error){
            console.log(error);
        });
}