
(function (){
angular
.module("omdbApp")
.controller("loginController",loginController);

function loginController($location, $rootScope,userService) {
var model = this;

model.login = login;

function init()
{
}

init();



function login(user)
{
    if(!user)
    {
        model.errorMessage = "Please input user";
        return;
    }
    var promise = userService.findUserByUsernameAndPassword(user.username, user.password);
    promise
        .then(function(response)
            {
            user = response.data;
            console.log(user);
            if(user === null)
            {
                model.errorMessage = "User not found";
            } else
                {
                $rootScope.currentUser = user;
                $location.url("/");
            }
        }
        );
}
}
})();