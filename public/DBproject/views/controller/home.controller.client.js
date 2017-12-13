(function () {
angular
.module("omdbApp")
.controller("homeController", homeController);

function homeController(userobject,$location, $routeParams, productService,userService)   {

var model = this;
model.getProductDetails = getProductDetails;
model.searchProductByName = searchProductByName;
model.curretLoggedUser = userobject;
model.logout = logout;


function init()
{

productService
.searchProductByName("Watches")
.then(productNames);

function productNames(pronames)
{
console.log(pronames.data);
model.productList = pronames.items;
productService
    .searchProductByName("Cars")
    .then(productNames);

function productNames(pronames){
    console.log(pronames.data);
    model.productList2 = pronames.items;
}
}

}


init();

function searchProductByName(product)
{
    console.log(product);
    if(product == null){
        product = "Clothing";
        $location.path("/list-products/"+product).search({searchInput: product});
    }
    else{
        $location.path("/list-products/"+product).search({searchInput: product});
    }


}

function getProductDetails(productId,searchInput)
{
    model.searchInput = searchInput;
console.log(model.searchInput);
$location.url("/product-details/"+productId+"?searchInput="+model.searchInput);
}



function logout()
{
userService
.logout()
.then(function ()
{
    $location.url('/login');
});
}

}
})();