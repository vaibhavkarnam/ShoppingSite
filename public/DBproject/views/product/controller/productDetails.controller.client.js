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
                    console.log(response);
                    model.product = {};
                    model.product.brand=response.brandName;
                    model.product.name=response.name;
                    model.product.description=response.longDescription;
                    model.product.price=response.salePrice;
                    model.product.color=response.color;
                    model.product.category=response.categoryPath;
                    model.product.customerrating=response.customerRating;
                    model.product.customerratingurl = response.customerRatingImage;
                    model.product.stock = response.stock;
                    model.product.primaryimageurl = response.largeImage;
                    // console.log(model.product.imageAssets);
                    var imagelist = [];
                    var i =0;
                    if (response.imageEntities.length < 4){
                        i = response.imageEntities.length-1;
                    }else{
                        i = 3
                    }
                    for (j = 0; j <= i; j++) {
                        imagelist.push(response.imageEntities[j].mediumImage);
                    }

                    // imagelist.push(response.product.imageAssets[3].versions.hero);
                    // console.log(imagelist);
                    model.product.imageurl = imagelist;
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
