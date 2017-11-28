/**
 * Created by vaibhav on 02-08-2017.
 */
(function () {

    angular
        .module("omdbApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller  : 'homeController',
                controllerAs: 'model'
            })
            .when('/products', {
                templateUrl: 'views/products.html',
                controller  : 'movieController',
                controllerAs: 'model'
            })
            .when('/product_detail', {
                templateUrl: 'views/product_detail.html',
                controller  : 'movieController',
                controllerAs: 'model'
            })
            .when('/login', {
            templateUrl: 'views/user/templates/login.view.client.html',
            controller  : 'loginController',
            controllerAs: 'model'
             })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller  : 'profileController',
                controllerAs: 'model'
            })
            .when('/createproduct', {
                templateUrl: 'views/product/templates/createproduct.view.client.html',
                controller  : 'createproductController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/register.view.client.html',
                controller  : 'registerController',
                controllerAs: 'model'
            })
    }
})();