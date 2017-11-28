/**
 * Created by prasadtajane on 7/20/17.
 */

(function () {
    angular
        .module("omdbApp")
        .service("productService", productService);

    function productService($http)   {

        this.searchProductByName = searchProductByName;

        function searchProductByName(product){
            var url = "/api/walmartSearch/"+product;
            return $http.get(url)
                .then(function (response){
                    return response.data;
                });
        }

    }

})();