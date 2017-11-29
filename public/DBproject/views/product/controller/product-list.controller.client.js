(function () {
    angular
        .module("omdbApp")
        .controller("productListController", productListController);

    function productListController($routeParams, $location, productService) {

        var model = this;

        //this.getRestaurantDetails = getRestaurantDetails;

        //model.websiteId = $routeParams.wid;
        //model.userId = loggedUser._id;

        function init() {
            model.product = $routeParams.product;
            productService
                .searchProductByName(model.product)
                .then(productNames);

            function productNames(pronames){
                console.log(pronames.data);
                model.productList = pronames.items;
            }
        }
        init();

/*        function getRestaurantDetails(restaurantId){
            $location.url("/restaurant-details/"+restaurantId);
        }*/

    }

})();