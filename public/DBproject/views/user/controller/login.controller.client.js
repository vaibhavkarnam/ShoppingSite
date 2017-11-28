/**
 * Created by Sourabh Punja on 7/19/2017.
 */

/**
 * Created by Sourabh Punja on 7/17/2017.
 */

(function (){
    //iife immediately invoked function expression
    angular
        .module("WamApp")
        .controller("loginController",loginController);

    function loginController($location, userService, $rootScope) {
        // JSON = Javascript Object Notation
        var model = this;

        model.login = login;

        function init() {
            // alert("zdfskjdf");
        }
        init();



        function login(user) {
            // alert("Here");
            if(!user) {
                model.errorMessage = "Please input user";
                return;
            }
            var promise = userService.findUserByUsernameAndPassword(user.username, user.password);
            promise
                .then(function(response){
                    user = response.data;
                    console.log(user);
                    if(user === null) {
                        model.errorMessage = "User not found";
                    } else {
                        $rootScope.currentUser = user;
                        $location.url("/profile");
                    }
                });
        }
    }
})();