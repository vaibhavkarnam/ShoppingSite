(function () {
    angular
        .module("omdbApp")
        .controller("productListController", productListController);

    function productListController(userobject,$routeParams, $location, productService) {

        var model = this;
        model.curretLoggedUser = userobject;
        this.getProductDetails = getProductDetails;
        model.searchProductByName = searchProductByName;
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
                productService
                    .findAllProducts()
                    .then( function (products){
                        for(i=0; i< products.length;i++){
                            var product ={}
                            product.itemId =  products[i]._id
                            product.imageEntities= [{}]
                            product.imageEntities[0].mediumImage= products[i].primaryimageurl
                            product.salePrice = products[i].price
                            product.name= products[i].name
                            // products[i].id = products[i]._id;
                            model.productList.push(product);
                        }
                    });
            }
        }
        init();

/*        function getRestaurantDetails(restaurantId){
            $location.url("/restaurant-details/"+restaurantId);
        }*/
        function getProductDetails(productId){
            $location.url("/product-details/"+productId+"?searchInput="+model.product);
        }
        function searchProductByName(product) {
            $location.path("/list-products/"+product).search({searchInput: product});
            /*productService
             .searchProductByName(product)
             .then(productNames);*/
        }
    }

})();