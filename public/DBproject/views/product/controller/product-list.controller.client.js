(function () {
    angular
        .module("omdbApp")
        .controller("productListController", productListController);

    function productListController($routeParams, $location, productService) {

        var model = this;

        //this.getRestaurantDetails = getRestaurantDetails;
        this.getProductDetails = getProductDetails;

        //model.websiteId = $routeParams.wid;
        //model.userId = loggedUser._id;

        function init() {
            model.product = $routeParams.product;
            productService
                .searchProductByName(model.product)
                .then(productNames);

            function productNames(pronames){
                console.log(pronames.items);
                model.productList = pronames.items;
            }


        }
        init();

/*        function getRestaurantDetails(restaurantId){
            $location.url("/restaurant-details/"+restaurantId);
        }*/
        function getProductDetails(productId){
            $location.url("/product-details/"+productId);
        }

    }

})();