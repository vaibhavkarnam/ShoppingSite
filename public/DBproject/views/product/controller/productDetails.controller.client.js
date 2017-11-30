/**
 * Created by Sourabh Punja on 7/21/2017.
 */

(function () {
    angular
        .module("omdbApp")
        .controller("productDetailsController", productDetailsController);

    function productDetailsController($routeParams,productService,userobject) {
        var model = this;
        model.productId = $routeParams.productId;
        model.updateProduct = updateProduct;
        model.deleteProduct = deleteProduct;
        model.userId = userobject._id;
        console.log(model.userId);

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

        function postNewReview(review) {
            model.userReview = review;
            userService
                .findUserById(userId)
                .then(function (user)
                {
                    model.user = user;
                    model.userReview.movieId = imdbID;
                    model.userReview.userID = userId;
                    model.userReview.userRole = user.role;
                    model.userReview.imdbMovieName = model.movie.Title;
                    model.userReview.userName = user.username;
                    // console.log(model.userReview.userRole);
                    movieService
                        .createReview(model.userReview, model.userReview.userID)
                        .then(function (status)
                        {
                            // console.log("jdfs");
                            model.userReview.description = "";
                            $route.reload();

                        });
                });

        }
        function getAllUserReviews(movieId) {

            // console.log(movieId);

            model.userReviews =[];
            model.criticReviews=[];

// console.log("getting reviews");
            movieService
                .getUserReviews(movieId)
                .then(function (response)
                {
                    // console.log("response in review");
                    // console.log(response);
                    response
                        .forEach(function (review) {
                            // console.log(review.userRole);
                            if (review.userRole=="CRITIC")
                            {
                                model.criticReviews.push(review);

                                // console.log( model.criticReviews);
                            }
                            else if (review.userRole=="USER")
                            {
                                model.userReviews.push(review);
                            }
                        });
                });
        }

    }
})();
