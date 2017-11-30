var app = require("../../express");
var productModel = require("../models/product/product.model.server");
var mongoose = require("mongoose");
const http = require('http');
'use strict';
//const yelp = require("../node_modules/yelp-fusion");
//var restaurantModel = require("../project/models/restaurant/restaurant.model.server");
var apiKey = "hkdhjjxs2xwx46mm6mf347wx";
var walmart = require('walmart')(apiKey);

app.get("/api/walmartSearch/:product", walmartProductSearch);
app.get("/api/product/:productId",findProductById);
app.post("/api/product",createProduct);
app.put("/api/product/:productId",updateProduct);
app.delete("/api/product/:productId",deleteProduct);
app.get("/api/walmart/:productId", searchProductByProductId);


function walmartProductSearch(req, res){
    var product = req.params.product;

    walmart.search(product, null).then(function(response) {
        console.log(response.totalResults);
        res.json(response);
    });
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
    var product = req.body;
    productModel
        .createProduct(product)
        .then(function (product){
            res.json(product);
        });
    // website._id = (new Date()).getTime() + "";
    // website.developerId = userId;
    // websites.push(website);
    // res.json(website);
}
// console.log(sites);
// res.json(sites);
// }

function findProductById(req,res){
    var productId = req.params.productId;
    productModel
        .findProductById(productId)
        .then(function (product){
            res.json(product);
        });
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
            console.log(str);
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