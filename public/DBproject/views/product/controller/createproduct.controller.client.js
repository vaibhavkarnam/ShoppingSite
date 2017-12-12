(function (){
angular
.module("omdbApp")
.controller("createproductController",createproductController);

function createproductController(productService,$location, userobject)
{

var model = this;
model.user = userobject;
model.createProduct = createProduct;

function init()
{

}

init();

function createProduct(product,images){


    product.imageurl = [];
    product.imageurl.push(images.image1, images.image2, images.image3);
    console.log(product);
    productService
        .createProduct(model.user._id,product)
        .then(function (product)
        {
            $location.url('/product-details/'+product._id);
        }
        );
}
}
})();