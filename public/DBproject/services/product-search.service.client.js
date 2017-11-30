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

    }

})();