/**
 * Created by Sourabh Punja on 7/19/2017.
 */

/**
 * Created by Sourabh Punja on 7/17/2017.
 */
(function (){
    //iife immediately invoked function expression
    angular
        .module("omdbApp")
        .controller("profileController",profileController);

    function profileController(userobject,$location,productService,userService,$route) {

        var model = this;

        model.updateUser = updateUser;
        model.unRegisterUser = unRegisterUser;
        model.logout = logout;
        model.updateProduct = updateProduct;
        model.deleteProduct = deleteProduct;
        model.getSellersList = getSellersList;
        model.getAllUserReviews = getAllUserReviews;
        model.updateUserReview = updateUserReview;
        model.reviewDelete = reviewDelete;
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
            // if (typeof model.user.dob !== 'undefined') {
            //     model.user.dob = setDate(model.user.dob);
            // }
            // console.log(model.user);
            getAllUserReviews(model.user._id);
            getAllUserQuestions(model.user._id);
            getAllQuestions();
        }
        init();

        function deleteProductForReturn(productId,returnId) {
            productService
                .deleteProductForReturn(productId,returnId)
                .then(function (){
                    $location.url('/');
                });
        }

        function deleteProductForOrder(productId) {
            productService
                .deleteProductForOrder(productId)
                .then(function (){
                    $location.url('/');
                });
        }

        function getSellersList(){
            $location.url("/sellers");
        }

        function getAllProductsForTechinician(){
            productService
                .getAllReturnedProducts()
                .then(function (products){
                    model.returnedproducts= products;
                });
        }

        function updateUser(user) {
            userService
                .updateUser(user._id,user)
                .then(function (response){
                    // console.log(model.user);
                    var usr = response.data;
                    var status = response.status;
                    if (status === 200){
                        model.message = "Update Successfull";
                    }else{
                        model.message = "Update not successfull";
                    }
                    console.log(usr);
                    usr.dob = new Date(usr.dob);
                   model.user = usr;
                   // console.log(typeof model.user.dob);
                   // console.log(model.user.dob);
                   //  if (typeof model.user.dob !== 'undefined') {
                        // var date= model.user.dob;
                        // var formattedDate = date.match(/[\d-]+/).pop();
                        // console.log(formattedDate);
                        // model.user.dob=formattedDate;
                        // // model.user.dob = model.user.dob.date.match(/[\d-]+/).pop()
                        // console.log(typeof model.user.dob);
                        // console.log(model.user.dob);
                        // model.user.dob = setDate(model.user.dob);
                    // }
                });
        }

        function unRegisterUser() {
            // model.user = userService.deleteUser(user._id);
            // $location.url("/login");
            userService
                .unRegisterUser()
                .then(function (){
                   $location.url("/login");
                });
        }
        function logout(){
            userService
                .logout()
                .then(function (){
                    $location.url('/login');
                });
        }

        function updateProduct(productId){
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
// console.log("getting reviews");
            productService
                .getAllUserReviews(userId)
                .then(function (response) {
                    model.allUserReviews = response;
                });
        }

        function getAllUserQuestions(userId)
        {
// console.log("getting reviews");
            productService
                .getAllUserQuestions(userId)
                .then(function (response) {
                    model.allUserQuestions = response;
                });
        }

        function getAllQuestions(userId)
        {
// console.log("getting reviews");
            productService
                .getAllQuestions(userId)
                .then(function (response) {
                    console.log("question response");
                    console.log(response);
                    model.allQuestions = response;
                });
        }

        function updateUserReview(reviewId,review) {
// console.log("updating");
            productService
                .updateUserReview(reviewId,review)
                .then(function (response) {
                    getAllUserReviews(model.userId);
                });
        }


        function reviewDelete(reviewId) {
            console.log("del review");
            productService
                .deleteReview(reviewId)
                .then(function (status)
                {
                    $route.reload();
                }
                );
        }


        function questionDelete(questionId) {
            console.log("del que");
            productService
                .deleteQuestion(questionId)
                .then(function (status)
                    {
                        $route.reload();
                    }
                );
        }

        function getReviewById(reviewId) {
            productService
                .getReviewById(reviewId)
                .then(function(response)
                {
                    model.reviewForUpdate
                        =
                        angular.copy(response);
                     console.log(model.reviewForUpdate);
                    // console.log(model.reviewForUpdate.description);
                });
        }

        // function setDate(date){
        //     var year=date.getFullYear();
        //     var month=date.getMonth()+1;
        //     if (month<10){
        //         month="0" + month;
        //     };
        //     var day=date.getDate();
        //     date=year + "-" + month + "-" + day;
        //     return date;
        // }
    }

})();