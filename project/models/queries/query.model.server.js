/**
 * Created by vaibhav on 09-12-2017.
 */

var mongoose = require('mongoose');
var querySchema = require('./query.schema.server');
var db = require("../database");


var queryModel = mongoose.model('QueryModel',querySchema);

var productModel = require('../product/product.model.server');
var userModel = require('../user/user.model.server');

queryModel.deleteQuery = deleteQuery;
queryModel.findQueryById = findQueryById;
queryModel.getQueryforId = getQueryforId;
queryModel.getQueryforUserId = getQueryforUserId;
queryModel.deleteQueries = deleteQueries;
queryModel.getQuery = getQuery;
queryModel.createQuery = createQuery;
queryModel.updateQuery = updateQuery;


module.exports = queryModel;



function createQuery(newReview, userId)
{

    return queryModel
        .create(newReview).then(function (query)
        {

            userModel.addReview( query._id, userId);
            return query;
        })
}


function getQueryforId(productId)
{
    return queryModel.find({productid : productId});
}


function updateQuery( queryId, query) {
    return queryModel.update
    (
        { _id : queryId },
        {
            answer: query.answer
        });
}


function deleteQuery(queryId)
{
    return queryModel.findByIdAndRemove({ _id : queryId})
}

function  findQueryById(queryId) {


    return queryModel
        .find({ _id : queryId });
}

function getQueryforUserId(userId)
{
    return queryModel.find({ userID : userId });
}

function deleteQueries(userId)
{
    return queryModel.deleteMany({ userID : userId })
}

function getQuery(){

    return queryModel.find();
}