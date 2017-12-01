/**
 * Created by Sourabh Punja on 7/21/2017.
 */

(function () {
    angular
        .module("omdbApp")
        .controller("productDetailsController", productDetailsController);
    
    function productDetailsController($routeParams,productService,userobject,userService, $route,$location) {
        var model = this;
        model.productId = $routeParams.productId;
        model.updateProduct = updateProduct;
        model.deleteProduct = deleteProduct;
        model.userId = userobject._id;
        model.postNewReview = postNewReview;
        model.getAllUserReviews =getAllUserReviews;
        model.createProduct = createProduct;

        function init() {
            getAllUserReviews(model.productId);
            productService
                .findProductById(model.productId)
                .then(function (product){
                    model.product = product;
                    if(model.product == "0"){
                        productService
                            .searchProductByWalmartItemId(model.productId)
                            .then(function (response){
                                // var individualpro = response.product;
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
                });
        }
        init();

        function createProduct(product){
            console.log(product);
            productService
                .createProduct(model.userId,product)
                .then(function (product){
                    $location.url('/product-details/'+product._id);
                });
        }

        //implementation
        function updateProduct(productId){
            $location.url("/updateproduct/"+productId);
        }

        function deleteProduct(productId) {
            productService
                .deleteProduct(productId)
                .then(function (){
                $location.url('/');
            });
        }

        function postNewReview(review) {
            model.userReview = review;
            console.log("postingnewreview");
            userService
                .findUserById(model.userId)
                .then(function (user)
                {
                    console.log("postingnewreview");
                    model.user = user;
                    model.userReview.productid = model.productId;
                    model.userReview.userID = model.userId;
                    model.userReview.userName = userobject.username;
                    model.userReview.productName = model.product.name;
                    console.log(model.userReview.userName);
                    console.log(model.userReview);
                    productService
                        .createReview(model.userReview, model.userReview.userID)
                        .then(function (status)
                        {
                            model.userReview.Review = "";
                            $route.reload();

                        });
                });}


        function getAllUserReviews(productId) {
            model.userReviews =[];
            productService
                .getUserReviews(productId)
                .then(function (response)
                {
                    response
                        .forEach(function (review) {
                                model.userReviews.push(review);
                        });
                });
        }

    }
})();
