
(function () {
angular
.module("omdbApp")
.controller("UpdateProductController", UpdateProductController);

function UpdateProductController($routeParams, productService, $location) {
var model = this;
model.productId = $routeParams.productId;

model.updateProduct = updateProduct;
model.deleteProduct = deleteProduct;

function init()
{
    productService
        .findProductById(model.productId)
        .then(function (product){
            model.product = product;
        }
        );
}


init();

function updateProduct(product)
{
    productService
        .updateProduct(model.productId,product)
        .then(function ()
            {
            $location.url('/product-details/'+model.productId);
        }
        );
}

function deleteProduct(productId)
{
    productService
        .deleteProduct(productId)
        .then(function ()
        {
        $location.url('/user/'+ model.userId + "/website");
    });
}

}
})();
