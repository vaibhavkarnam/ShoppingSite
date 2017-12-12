(function (){
angular
.module("omdbApp")
.controller("profileController",profileController);

function profileController(userobject,$location,productService,userService,$route) {

var model = this;


model.updateUser = updateUser;
model.unRegisterUser = unRegisterUser;
model.getSellersList = getSellersList;
model.getAllUserReviews = getAllUserReviews;
model.updateUserReview = updateUserReview;
model.reviewDelete = reviewDelete;
model.logout = logout;
model.updateProduct = updateProduct;
model.deleteProduct = deleteProduct;
model.questionDelete = questionDelete;
model.getReviewById = getReviewById;
model.getAllUserQuestions = getAllUserQuestions;
model.getAllQuestions = getAllQuestions;
model.deleteProductForOrder = deleteProductForOrder;
model.deleteProductForReturn = deleteProductForReturn;

function init() {
    var usr = userobject;
    usr.dob = new Date(usr.dob);
    model.user = usr;
    if(model.user.roles.indexOf('TECHNICIAN') > -1){
        getAllProductsForTechinician()
    }
    model.products = usr.products;
    model.following = model.user.following;


    getAllUserReviews(model.user._id);
    getAllUserQuestions(model.user._id);
    getAllQuestions();
}


init();

function deleteProductForReturn(productId,returnId)
{
    productService
        .deleteProductForReturn(productId,returnId)
        .then(function ()
            {
            $location.url('/');
        }
        );
}

function deleteProductForOrder(productId)
{
    productService
        .deleteProductForOrder(productId)
        .then(function (){
            $location.url('/');
        }
        );
}


function getSellersList(){
    $location.url("/sellers");
}

function getAllProductsForTechinician()
{
    productService
        .getAllReturnedProducts()
        .then(function (products){
            model.returnedproducts= products;
        }
        );
}

function updateUser(user)
{
    userService
        .updateUser(user._id,user)
        .then(function (response){
            var usr = response.data;
            var status = response.status;
            if (status === 200)
            {
                model.message = "Update Successfull";
            }else{
                model.message = "Update not successfull";
            }
            console.log(usr);
            usr.dob = new Date(usr.dob);
           model.user = usr;

        }
        );
}

function unRegisterUser()
{

    userService
        .unRegisterUser()
        .then(function (){
           $location.url("/login");
        }
        );
}



function logout()
{
    userService
        .logout()
        .then(function (){
            $location.url('/login');
        }
        );
}

function updateProduct(productId)
{
    $location.url("/updateproduct/"+productId);
}

function deleteProduct(productId) {
    productService
        .deleteProduct(productId)
        .then(function (){
            $location.url('/');
        });
}


function getAllUserReviews(userId)
{
    productService
        .getAllUserReviews(userId)
        .then(function (response) {
            model.allUserReviews = response;
        }
        );
}

function getAllUserQuestions(userId)
{
    productService
        .getAllUserQuestions(userId)
        .then(function (response)
        {
            model.allUserQuestions = response;
        });
}

function getAllQuestions(userId)
{
    productService
        .getAllQuestions(userId)
        .then(function (response)
        {
            console.log("question response");
            console.log(response);
            model.allQuestions = response;
        });
}

function updateUserReview(reviewId,review) {
// console.log("updating");
    productService
        .updateUserReview(reviewId,review)
        .then(function (response)
        {
            getAllUserReviews(model.userId);
        }
        );
}


function reviewDelete(reviewId)
{
    console.log("del review");
    productService
        .deleteReview(reviewId)
        .then(function (status)
        {
            $route.reload();
        }
        );
}


function questionDelete(questionId)
{
    console.log("del que");
    productService
        .deleteQuestion(questionId)
        .then(function (status)
            {
                $route.reload();
            }
        );
}

function getReviewById(reviewId)
{
    productService
        .getReviewById(reviewId)
        .then(function(response)
        {
            model.reviewForUpdate
                =
                angular.copy(response);
             console.log(model.reviewForUpdate);
        });
}

}

})();