(function () {
angular
.module("omdbApp")
.controller("productDetailsController", productDetailsController);

function productDetailsController($routeParams,productService,userobject,userService, $route,$location) {
var model = this;
model.curretLoggedUser = userobject;
model.productId = $routeParams.productId;
model.updateProduct = updateProduct;
model.deleteProduct = deleteProduct;
model.userId = userobject._id;
model.postNewReview = postNewReview;
model.postNewQuestion = postNewQuestion;
model.getAllUserQuestions =getAllUserQuestions;
model.getProductDetails = getProductDetails;
model.logout = logout;
model.getAllUserReviews =getAllUserReviews;
model.createProduct = createProduct;
model.searchProductByName = searchProductByName;
model.createProductForOrder = createProductForOrder;
model.createProductForReturn = createProductForReturn;



function init()
{

    getAllUserReviews(model.productId);
    getAllUserQuestions(model.productId);
    productService
        .findProductById(model.productId)
        .then(function (product)

        {
            model.product = product;
            if(model.product == "0")
            {
                productService
                    .searchProductByWalmartItemId(model.productId)
                    .then(function (response){
                        // var individualpro = response.product;
                        model.product = {};
                        model.product.brand=response.brandName;
                        model.product.name=response.name;
                        model.product.description= response.longDescription;
                        model.product.price=response.salePrice;
                        model.product.color=response.color;
                        model.product.category=response.categoryPath;
                        model.product.customerrating=response.customerRating;
                        model.product.customerratingurl = response.customerRatingImage;
                        model.product.stock = response.stock;
                        model.product.primaryimageurl = response.largeImage;
                        model.product.itemId = response.itemId;
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
    model.searchInput = $routeParams.searchInput;
    productService
        .searchProductByName(model.searchInput)
        .then(productNames);

    function productNames(pronames){
        console.log(pronames.data);
        model.productList = pronames.items;
    }
    // model.return = findReturnByUserIdAndProductId(model.userId,model.productId)
}
init();

// function findReturnByUserIdAndProductId(userId,productId)
// {
//     productService
//         .findReturnByUserIdAndProductId(userId,productId)
//         .then(function (returned)){
//
//         }
// }

function createProductForReturn(product)
{
    productService
        .createProductForReturn(model.userId,product)
        .then(function (product)
        {
            productService
                .createReturnInTable(model.userId,product)
                .then(function (returnproduct){
                    $location.url('/product-details/'+product._id);
            });
        }
        );
}

function createProductForOrder(product)
{
    console.log(product);
    productService
        .createProductForOrder(model.userId,product)
        .then(function (product){
            $location.url('/product-details/'+product._id);
        }
        );
}

function createProduct(product)
{
    console.log(product);
    productService
        .createProduct(model.userId,product)
        .then(function (product){
            $location.url('/product-details/'+product._id);
        });
}

function updateProduct(productId)
{
    $location.url("/updateproduct/"+productId);
}

function deleteProduct(productId)
{
    productService
        .deleteProduct(productId)
        .then(function ()
        {
        $location.url('/');
    });
}

function searchProductByName(product)
{
    $location.path("/list-products/"+product).search({searchInput: product});

}

function postNewReview(review)
{
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

                }
                );
        });}

function postNewQuestion(question)
{
    model.userQuestion = question;
    console.log("postingquestion");
    userService
        .findUserById(model.userId)
        .then(function (user)
        {
            model.user = user;
            model.userQuestion.productid = model.productId;
            model.userQuestion.userID = model.userId;
            model.userQuestion.userName = userobject.username;
            model.userQuestion.productName = model.product.name;
            model.userQuestion.answered = 0;
            console.log(model.userQuestion.userName);
            console.log(model.userQuestion);
            productService
                .createQuestion(model.userQuestion, model.userQuestion.userID)
                .then(function (status)
                {model.userQuestion.Question = "";
                    $route.reload();

                }
                );
        });}

function getAllUserReviews(productId)
{
    model.userReviews =[];
    productService
        .getUserReviews(productId)
        .then(function (response)
        {
            response
                .forEach(function (review)
                {

                        model.userReviews.push(review);
                });
        }
        );
}

function getAllUserQuestions(productId)
{
    model.userQuestions =[];
    productService
        .getUserQuestions(productId)
        .then(function (response)
        {
            console.log(response);
            response
                .forEach(function (question)
                {
                    if(question.answered === 0)
                    model.userQuestions.push(question);
                });
        }
        );
}


function getProductDetails(productId)
{
    console.log(model.searchInput);
    $location.url("/product-details/"+productId+"?searchInput="+model.searchInput);
}



function logout()
{
    userService
        .logout()
        .then(function (){
            $location.url('/login');
        });
}
}
})();
