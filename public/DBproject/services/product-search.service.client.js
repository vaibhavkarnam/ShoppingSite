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
        this.findAllProducts = findAllProducts;
        this.updateProduct= updateProduct;
        this.deleteProduct= deleteProduct;
        this.createQuestion = createQuestion;
        this.getUserQuestions = getUserQuestions;
        function updateProduct(productId,product){
            var url = "/api/product/"+productId;
            return $http.put(url,product)
                .then(function (response){
                    return response.data;
                });
            // for(var w in websites) {
            //     if(websites[w]._id === websiteId) {
            //         websites[w] = website;
            //         return websites[w];
            //     }
            // }
            // return null;
        }
        function deleteProduct(productId){
            var url = "/api/product/"+productId;
            return $http.delete(url)
                .then(function (response){
                    return response.data;
                });

            // for(var w in websites) {
            //     if (websites[w]._id === websiteId) {
            //         var index = websites.indexOf(websites[w]);
            //         websites.splice(index, 1);
            //         return;
            //     }
            // }
        }

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

        function findAllProducts(){
            var url = "/api/product";
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

        function createProduct(userId, product){
            var url = "/api/product";
            return $http.post(url,{userId :userId, product : product})
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
        var url="/api/project/getReview/"+productId;
        return $http.get(url)
            .then(function (response)
            {
                return response.data;
            }
            );
    }


        function getUserQuestions(productId)
        {
            var url="/api/project/getQuestion/"+productId;
            return $http.get(url)
                .then(function (response)
                    {
                        return response.data;
                    }
                );
        }


        function createReview(review, userId)
        {
            return $http.post("/api/project/user/"+userId+"/review", review);
        }

        function createQuestion(question, userId)
        {
            return $http.post("/api/project/user/"+userId+"/question", question);
        }

    }

})();