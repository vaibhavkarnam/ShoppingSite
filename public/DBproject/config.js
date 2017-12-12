(function () {


angular
.module("omdbApp")
.config(configuration);

function configuration($routeProvider) {
$routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller  : 'homeController',
        controllerAs: 'model',
        resolve:{
            userobject: checkCurrentUser
        }
    })
    .when('/products', {
        templateUrl: 'views/product/templates/product-list.view.client.html',
        controller  : 'movieController',
        controllerAs: 'model',
        resolve:{
            userobject: checkCurrentUser
        }
    })
    .when('/product-details/:productId', {
        templateUrl: 'views/product/templates/product-details.view.client.html',
        controller  : 'productDetailsController',
        controllerAs: 'model',
        resolve:{
            userobject: checkCurrentUser
        }
    })
    .when('/login', {
    templateUrl: 'views/user/templates/login.view.client.html',
    controller  : 'loginController',
    controllerAs: 'model'
     })
    .when('/profile', {
        templateUrl: 'views/user/templates/profile.view.client.html',
        controller  : 'profileController',
        controllerAs: 'model',
        resolve:{
            userobject: checkLoggedIn
        }
    })
    .when('/profile/editReview/:reviewId', {
        templateUrl: 'views/user/templates/review-update.view.client.html',
        controller  : 'reviewController',
        controllerAs: 'model',
        resolve:{
            userobject: checkLoggedIn
        }
    })
    .when('/profile/answerQuestion/:answerId', {
        templateUrl: 'views/user/templates/answer-query.view.client.html',
        controller  : 'answerController',
        controllerAs: 'model',
        resolve:{
            userobject: checkLoggedIn
        }
    })
    .when('/createproduct', {
        templateUrl: 'views/product/templates/createproduct.view.client.html',
        controller  : 'createproductController',
        controllerAs: 'model',
        resolve:{
            userobject: checkLoggedIn
        }
    })
    .when("/admin", {
        templateUrl: "./views/user/templates/admin.view.client.html",
        controller: "adminController",
        controllerAs: "model",
        resolve:{
            userobject: checkAdmin
        }
    })
    .when("/profile-for-admin/:userId", {
        templateUrl: "./views/user/templates/adminprofile.view.client.html",
        controller: "adminProfileController",
        controllerAs: "model",
        resolve:{
            userobject: checkAdmin
        }
    })
    .when('/updateproduct/:productId', {
        templateUrl: 'views/product/templates/updateproduct.view.client.html',
        controller  : 'UpdateProductController',
        controllerAs: 'model',
        resolve:{
            userobject: checkLoggedIn
        }
    })
    .when('/register', {
        templateUrl: 'views/user/templates/register.view.client.html',
        controller  : 'registerController',
        controllerAs: 'model'
    })
    .when("/list-products/:product", {
        templateUrl : "views/product/templates/product-list.view.client.html",
        controller : "productListController",
        controllerAs : "model",
        resolve:{
            userobject: checkCurrentUser
        }
    })
    .when("/sellers", {
        templateUrl: "views/user/templates/seller-list.view.client.html",
        controller : "sellerListController",
        controllerAs : "model",
        resolve: {
            userobject : checkCurrentUser
        }
    })
}



function checkAdmin($q,$location,userService){
var deferred = $q.defer();
userService
    .checkAdmin()
    .then(function (response){
        var currentUser = response;
        if (currentUser === "0"){
            deferred.resolve({});
            $location.url('/');
        }else{
            deferred.resolve(currentUser);
        }
    });
return deferred.promise;
}

function checkLoggedIn($q,$location,userService){
var deferred = $q.defer();
userService
    .checkLoggedIn()
    .then(function (response){
        var currentUser = response;
        if (currentUser === "0"){
            deferred.reject();
            $location.url('/login');
        }else{
            deferred.resolve(currentUser);
        }
    });
return deferred.promise;
}

function checkCurrentUser($q,$location,userService){
var deferred = $q.defer();
userService
    .checkLoggedIn()
    .then(function (response){
        var currentUser = response;
        if (currentUser === "0"){
            deferred.resolve({});
        }else{
            deferred.resolve(currentUser);
        }
    });
return deferred.promise;

}

})();