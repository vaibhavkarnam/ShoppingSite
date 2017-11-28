/**
 * Created by Sourabh Punja on 8/6/2017.
 */
var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server');
var db = require("../database");

var websiteModel = mongoose.model('WebsiteModel',websiteSchema);
var userModel = require('../user/user.model.server');

websiteModel.createWebsite = createWebsite;
websiteModel.updateWebsite = updateWebsite;
websiteModel.findWebsitesForUser = findWebsitesForUser;
websiteModel.findAllWebsites = findAllWebsites;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.deletePage = deletePage;
websiteModel.addPage = addPage;

module.exports = websiteModel;

function updateWebsite(websiteId,website){
    return websiteModel
        .update({_id:websiteId},{$set:website});
}

function findWebsiteById(websiteId) {
    return websiteModel
        .findById(websiteId);
}

function findWebsitesForUser(userId){
    // console.log("Inside Websites");
    return websiteModel
        .find({developerId:userId})
        .populate('developerId')
        .exec();
}

function findAllWebsites(){
    return websiteModel.find();
}

function createWebsite(userId,website){
    website.developerId = userId;
    var websiteTmp = null;
    return websiteModel
        .create(website)
        .then(function (website){
            websiteTmp= website;
            return userModel
                .addWebsite(userId,website._id);
        })
        .then(function (user){
            return websiteTmp;
        });
}

function updateUser(userId, user){
    delete user.username;
    delete user.password;
    return userModel.update({_id:userId},
        {$set: user});
}

function deleteWebsite(userId,websiteId){
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status){
            return userModel
                .deleteWebsite(userId,websiteId);
        });
}

function deletePage(websiteId,pageId){
    return websiteModel.findWebsiteById(websiteId)
        .then(function (website){
           var index = website.pages.indexOf(pageId);
           website.pages.splice(index,1);
           return website.save();
        });
}

function addPage(websiteId,pageId){
    return websiteModel.findWebsiteById(websiteId)
        .then(function (website){
            website.pages.push(pageId);
            return website.save();
        })
}
