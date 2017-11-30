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

    function createproductController(productService,$location, userobject) {

        var model = this;
        model.user = userobject;
        model.createProduct = createProduct;

        function init() {
        }
        init();

        //implementation
        function createProduct(product,images){
            // website.developerId = model.userId;
            // websiteService.createWebsite(website);
            // $location.url('/user/'+ model.userId + "/website");
            product.imageurl = [];
            product.imageurl.push(images.image1, images.image2, images.image3)
            console.log(product);
            productService
                .createProduct(model.user._id,product)
                .then(function (product){
                    $location.url('/product-details/'+product._id);
                });
        }
    }
})();