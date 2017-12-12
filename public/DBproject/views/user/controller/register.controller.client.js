/**
* Created by vaibhav on 29-11-2017.
*/
(function () {
angular
.module("omdbApp")
.controller("registerController", registerController);

function registerController(userService, $location) {
var model = this;
model.registerUser = registerUser;

function init() {
}
init();

function registerUser(user,usertype) {
    user.roles=[];
    user.roles.push(usertype);
    console.log("here");
    if(typeof user === 'undefined') {
        model.error = "Please input user";
        return;
    }
    userService.findUserByUsername(user.username)
        .then(function(response){
            var _user = response.data;
            if(_user === null){
                return userService.registerUser(user)
            } else if (_user === 0) {
                model.error = "Please input user";
            } else {
                model.error = "User already exists";
            }})

        .then(function (response){
            _user = response.data;
            $location.url("/profile");
        }

        );

}
}

})();