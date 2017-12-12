/**
* Created by vaibhav on 14-08-2017.
*/
(function () {
angular
.module("omdbApp")
.controller("reviewController", reviewController);

function reviewController($location, $routeParams,userobject, productService) {
var model = this;
model.reviewId = $routeParams.reviewId;
model.getReviewById = getReviewById;
model.reviewUpdate =reviewUpdate;
model.user = userobject;
model.logout = logout;

function init()
{

getReviewById(model.reviewId);
}
init();

function getReviewById(reviewId)
{
    productService
.getReviewById(reviewId)
.then(function(response)
{

    console.log(response);
    model.reviewForUpdate = angular.copy(response[0]);}
    );
}

function reviewUpdate(reviewId,review)
{
// console.log("updating");
    productService
.updateUserReview(reviewId,review)
.then(function (status)
{
    $location.url('/profile')
});
}

function logout()
{
userService
.logout()
.then(function () {
    $location.url('/login');
});
}

}
})();