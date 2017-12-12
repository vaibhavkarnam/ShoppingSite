var app = require("../../express");
var productModel = require("../models/product/product.model.server");
var userModel = require("../models/user/user.model.server");
var reviewModel = require("../models/reviews/review.model.server");
var queryModel = require("../models/queries/query.model.server");
var returnModel = require("../models/returns/return.model.server");
var mongoose = require("mongoose");
const http = require('http');
'use strict';
//const yelp = require("../node_modules/yelp-fusion");
//var restaurantModel = require("../project/models/restaurant/restaurant.model.server");
var apiKey = "hkdhjjxs2xwx46mm6mf347wx";
var walmart = require('walmart')(apiKey);

app.get("/api/walmartSearch/:product", walmartProductSearch);
app.get("/api/product/:productId",findProductById);
app.get("/api/product",findAllProducts);
app.post("/api/product",createProduct);
app.put("/api/product/:productId",updateProduct);
app.delete("/api/product/:productId",deleteProduct);
app.get("/api/walmart/:productId", searchProductByProductId);
app.post("/api/project/user/:userId/review", createReview);
app.post("/api/project/user/:userId/question", createQuestion);
app.get("/api/project/getReview/:productId",getReviewByProductId);
app.get("/api/project/getQuestion/:productId",getQuestionByProductId);
app.post("/api/productForOrder",createProductForOrder);
app.delete("/api/productForOrder/:productId",deleteProductForOrder);
app.post("/api/productForReturn",createProductForReturn);
app.delete("/api/productForReturn/:productId/return/:returnId",deleteProductForReturn);
app.get("/api/project/Review/:userId",findReviewforUserId);
app.delete("/api/project/Review/:reviewId", deleteReview);
app.delete("/api/project/Question/:questionId", deleteQuestion);
app.put("/api/project/Review/:reviewId", updateReview);
app.put("/api/project/Answer/:answerId", answerQuestion);
app.get("/api/project/getReviewForUser/:userId",findReviewforUserId);
app.get("/api/project/getReviewId/:reviewId", findReviewByReviewId);
app.get("/api/project/getAnswerId/:answerId", findQuestionById);
app.get("/api/project/getQuestionsForUser/:userId",findQuestionforUserId);
app.get("/api/project/getQuestions/:userId",findQuestion);
app.post("/api/returnToTable",createReturnInTable);
app.get("/api/returnAllProducts",getAllReturnedProducts);

function getAllReturnedProducts(req,res){
    returnModel
        .findAllReturnedProducts()
        .then(function (products) {
            res.json(products);
        });
}

function deleteProductForReturn(req,res){
    var productId = req.params.productId;
    var returnId = req.params.returnId;

    return productModel
        .findProductById(productId)
        .then(function (product) {
            userModel
                .removeReturnFromUser(product._user, productId)
                .then (function (order){
                    returnModel.deleteReturn(returnId)
                        .then(function(status){
                            res.json(status);
                            });
                    //return order;
                });
        });
}

function createReturnInTable(req,res) {
    var body = req.body;
    var userId = body.userId;
    var product = body.product;
    var onereturn = {user:userId,name:product.name,brand:product.brand,price:product.price,isApproved:false,returnedproduct:product._id};
    console.log(onereturn);
    return returnModel
        .createReturn(onereturn)
        .then(function (createdreturn){
           res.json(createdreturn);
        });
}

function createProductForReturn(req, res) {
    var body = req.body;
    var userId = body.userId;
    var product = body.product;
    product._user = userId;
    userModel
        .findUserById(userId)
        .then(function (user){
            if(user.roles.indexOf('SELLER') > -1){
                productModel
                    .createSellerProductForReturn(userId,product)
                    .then(function (product){
                        res.json(product);
                    });
            }
            else{
                productModel
                    .createProductForReturn(product)
                    .then(function (product){
                        res.json(product);
                    });
            }
        });
}

function deleteProductForOrder(req,res){
    var productId = req.params.productId;

    return productModel
        .findProductById(productId)
        .then(function (product) {
                    userModel
                        .removeOrderFromUser(product._user, productId)
                        .then (function (order){
                            res.json(order);
                            //return order;
                        });
        });
}

function createProductForOrder(req, res) {
    var body = req.body;
    var userId = body.userId;
    var product = body.product;
    product._user = userId;
    userModel
        .findUserById(userId)
        .then(function (user){
            if(user.roles.indexOf('SELLER') > -1){
                productModel
                    .createSellerProductForOrder(userId,product)
                    .then(function (product){
                        res.json(product);
                    });
            }
            else{
                productModel
                    .createProductForOrder(product)
                    .then(function (product){
                        res.json(product);
                    });
            }
        });
}
function walmartProductSearch(req, res){
    var product = req.params.product;

    walmart.search(product, null).then(function(response) {
        console.log(response.totalResults);
        res.json(response);
    });
}

function findAllProducts(req,res){
    // console.log("ins server");
    productModel
        .findAllProducts()
        .then(function (products) {
            res.json(products);
        });
    // var website = websites.find(function (website){
    //        return website._id === req.params.websiteId;
    //     });
    //      res.json(website);
}

function deleteProduct(req,res){
    var productId = req.params.productId;
    productModel
        .deleteProduct(productId)
        .then(function (status){
            res.json(status);
        });
}

function updateProduct(req, res){
    var productId = req.params.productId;
    var product = req.body;
    productModel
        .updateProduct(productId,product)
        .then(function (status){
            // console.log(status);
            // res.json(status);
            return productModel
                .findProductById(productId);
        },function (err){
            res.sendStatus(404).send(err);
        })
        .then(function (product){
            // console.log(user);
            res.json(product);
            return;
        },function (err) {
            res.sendStatus(404).send(err);
            return;
            // }
        });

    // for(var w in websites) {
    //         if(websites[w]._id === websiteId) {
    //             websites[w] = website;
    //             res.json(websites[w]);
    //             return;
    //         }
    //     }
    //     res.sendStatus(404);
}

function createProduct(req, res) {
    var body = req.body;
    var userId = body.userId;
    var product = body.product;
    product._user = userId;
    userModel
        .findUserById(userId)
        .then(function (user){
            if(user.roles.indexOf('SELLER') > -1){
                productModel
                    .createSellerProduct(userId,product)
                    .then(function (product){
                        res.json(product);
                    });
            }
            else{
                productModel
                    .createProduct(product)
                    .then(function (product){
                        res.json(product);
                    });
            }
        });

    // website._id = (new Date()).getTime() + "";
    // website.developerId = userId;
    // websites.push(website);
    // res.json(website);
}
// console.log(sites);
// res.json(sites);
// }

function createReview(req,res)
{
    var obj=req.body;
    reviewModel
        .createReview(obj).then(function (response)
    {
        console.log("in revieww");
        console.log(response);
        res.sendStatus(200);
    });
}


function createQuestion(req,res)
{
    var obj=req.body;
    queryModel
        .createQuery(obj).then(function (response)
    {
        console.log(response);
        res.sendStatus(200);
    });
}


function getReviewByProductId(req,res)
{

    var ReviewId = req.params.productId;
    console.log(ReviewId);
    reviewModel.
    getReviewforId(ReviewId).then(function (reviews)
        {
            console.log("---");
            console.log(reviews);
            res.json(reviews);
        });
}


function getQuestionByProductId(req,res)
{
    var QuestionId = req.params.productId;
    queryModel.
    getQueryforId(QuestionId).then(function (questions)
    {
        console.log("---");
        console.log(questions);
        res.json(questions);
    });
}


function findProductById(req,res){
    console.log("ins server");
    var productId = req.params.productId;
    if(mongoose.Types.ObjectId.isValid(productId)){
        return productModel
            .findProductById(productId)
            .then(function (product) {
                if(!(product == "0")){
                    res.json(product);
                    return;
                }else{
                    res.send("0");
                    return;
                } }, function(error){
                return res.json({error:error.message});
            }).catch(function () {
            console.log("Promise Rejected");
        });
    }else{
        res.send("0");
    }

    // var website = websites.find(function (website){
    //        return website._id === req.params.websiteId;
    //     });
    //      res.json(website);
}

function searchProductByProductId(req, res) {
    var productId = req.params.productId;

    //var imdbID = req.params['id'];
    //console.log(imdbID);
    var options = {
        host: "api.walmartlabs.com",
        path: "/v1/items/PRODUCT_ID?apiKey=API_KEY&format=json".replace("API_KEY", apiKey).replace("PRODUCT_ID", productId)
    };
    var callback = function (response) {
        var str = '';
        response.on('data', function (data) {
            str += data;
        });
        response.on('end', function () {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(str);
        });
    };
    http.get(options, callback);

            /*    walmart.getItem(productId)
             .then(function(item) {
             console.log(item.product.productName);
             res.json(item);
             });*/

}


function deleteReview(req, res)
{
    var Id = req.params.reviewId;
    reviewModel
        .deleteReview(Id)
        .then(function (status)
        {
            res.sendStatus(200);
        });
}

function deleteQuestion(req, res)
{
    var Id = req.params.questionId;
    console.log(Id);
    queryModel
        .deleteQuery(Id)
        .then(function (status)
        {
            res.sendStatus(200);
        });
}

function updateReview(req, res)
{
    var review = req.body;
    var Id = req.params.reviewId;
    reviewModel
        .updateReview(Id, review)
        .then(function (response)
        {
            res.json(response);
        });
}

function answerQuestion(req, res)
{
    var question = req.body;
    var Id = req.params.answerId;
    console.log(question);
    console.log(Id);
    queryModel
        .updateQuery(Id, question)
        .then(function (response)
        {
            res.json(response);
        });
}
function deleteReviews(req, res)
{
    var userId = req.params.userId;
    reviewModel
        .deleteReviews(userId)
        .then(function (status)
        {
            res.sendStatus(200);
        });
}

function findReviewforUserId(req,res) {
    var userId=req.params.userId;

    reviewModel
        .getReviewforUserId(userId)
        .then(function (reviews)
        {
            // console.log(reviews);
            res.json(reviews);
        });
}

function findQuestionforUserId(req,res) {
    var userId=req.params.userId;

    queryModel
        .getQueryforUserId(userId)
        .then(function (questions)
        {
            // console.log(reviews);
            res.json(questions);
        });
}

function findQuestion(req,res) {

    queryModel
        .getQuery()
        .then(function (questions)
        {
            // console.log(reviews);
            res.json(questions);
        });
}


function findReviewByReviewId(req, res)
{
    console.log("getting reviews");
    var reviewId = req.params.reviewId;
    reviewModel
        .findReviewById(reviewId)
        .then(function (response)
        {
            console.log(response);
            res.json(response);
        });
}

function findQuestionById(req, res)
{
    var questionId = req.params.answerId;
    queryModel
        .findQueryById(questionId)
        .then(function (response)
        {
            res.json(response);
        });
}

function findQueryByQueryId(req, res)
{
    var queryId = req.params.queryId;
    queryModel
        .findQueryById(queryId)
        .then(function (response)
        {
            console.log(response);
            res.json(response);
        });
}