var app = require("../express");
var mongoose = require("mongoose");
const http = require('http');
'use strict';
//const yelp = require("../node_modules/yelp-fusion");
//var restaurantModel = require("../project/models/restaurant/restaurant.model.server");
var apiKey = "hkdhjjxs2xwx46mm6mf347wx";
var walmart = require('walmart')(apiKey);

app.get("/api/walmartSearch/:product", walmartProductSearch);

function walmartProductSearch(req, res){
    var product = req.query.product;

    walmart.search(product, null).then(function(response) {
        console.log(response.totalResults);
        res.json(response);
    });
}
