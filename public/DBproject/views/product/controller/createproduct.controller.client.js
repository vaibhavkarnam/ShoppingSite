/**
 * Created by Sourabh Punja on 7/19/2017.
 */

/**
 * Created by Sourabh Punja on 7/17/2017.
 */
(function (){
    //iife immediately invoked function expression
    angular
        .module("omdbApp")
        .controller("createproductController",createproductController);

    function createproductController(productService,$location) {

        var model = this;

        model.createProduct = createProduct;

        function init() {
        }
        init();

        //implementation
        function createProduct(product,imageurl){
            // website.developerId = model.userId;
            // websiteService.createWebsite(website);
            // $location.url('/user/'+ model.userId + "/website");
            var array = imageurl.urllist.split(',');
            product.imageurl=array;
            console.log(product);
            productService
                .createProduct(product)
                .then(function (product){
                    $location.url('/product-details/'+product._id);
                });
        }
    }
})();