/**
 * Created by Sourabh Punja on 7/21/2017.
 */

(function () {
    angular
        .module("omdbApp")
        .controller("productDetailsController", productDetailsController);

    function productDetailsController($routeParams,productService) {
        var model = this;
        model.productId = $routeParams.productId;
        model.updateProduct = updateProduct;
        model.deleteProduct = deleteProduct;

        function init() {
            productService
                .findProductById(model.productId)
                .then(function (product){
                    model.product = product;
                });
            productService
                .searchProductByWalmartItemId(model.productId)
                .then(function (response){
                    // var individualpro = response.product;
                    model.product = response.product;
                });
        }
        init();

        //implementation
        function updateProduct(productId){
            $location.url("/updateproduct/"+productId);
        }

        function deleteProduct(productId,brandname) {
            var tempquery = brandname
            productService
                .deleteProduct(productId)
                .then(function (){
                $location.url('/list-products/'+brandname);
            });
        }


    }
})();
