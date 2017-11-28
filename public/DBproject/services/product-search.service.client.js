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
            var url = "http://api.walmartlabs.com/v1/search?apiKey=hkdhjjxs2xwx46mm6mf347wx&numItems=12&query="+product;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }

})();