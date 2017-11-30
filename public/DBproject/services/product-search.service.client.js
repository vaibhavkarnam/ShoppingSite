/**
 * Created by prasadtajane on 7/20/17.
 */

(function () {
    angular
        .module("omdbApp")
        .service("productService", productService);

    function productService($http)   {

        this.searchProductByName = searchProductByName;
        this.createProduct = createProduct;
        this.findProductById = findProductById;
        this.searchProductByWalmartItemId = searchProductByWalmartItemId;
        this.createReview = createReview;
        this.getUserReviews = getUserReviews;

        function findProductById(productId){
            var url = "/api/product/"+productId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
            //  var website = websites.find(function (website){
            //    return website._id === websiteId;
            // });
            //  return angular.copy(website);

        }

        function searchProductByName(product){
            var url = "/api/walmartSearch/"+product;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

        function createProduct(product){
            var url = "/api/product";
            return $http.post(url,product)
                .then(function (response){
                    return response.data;
                });
        }

        function searchProductByWalmartItemId(productId){
            var url = "/api/walmart/"+productId;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });

        }

        function getUserReviews(productId)
        {
            console.log("fetching");
            var url="/api/project/getReview/"+productId;
            return $http
                .get(url)
                .then(function (response)
                {
                    return response.data;
                });
        }

        function createReview(review, userId)
        {
            console.log(review);
            return $http
                .post("/api/project/user/"+userId+"/review", review);
        }


    }

})();