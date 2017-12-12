(function ()   {
angular
.module("omdbApp")
.controller("adminController", adminController);

function adminController($routeParams, $location, userService, userobject) {


var model = this;
var uId = userobject._id;

model.user = userobject;
var user;
var userWithInsurance;
model.newUser;
model.createNewUser = createNewUser;
model.updateUser = updateUser;
model.editUser = editUser;
model.deleteUser = deleteUser;
model.logout = logout;


function init()
{
    userService
        .findAllUsers()
        .then(function (response) {
            model.userList =response;
        });
}


init();



function editUser(userId)
{
    $location("/admin/user/" + userId +"/edit");
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

function createNewUser(usernew)
{
    var newUser =
        {
        username:usernew.username,
        password:usernew.password,
        roles:[]
    } ;
    newUser.roles.push(usernew.userType);
    console.log(newUser);
    userService
        .createUser(newUser)
        .then(function (response)
        {
            var user = response.data;
            userService
                .findAllUsers()
                .then(function (response)
                {
                    model.userList = response;
                    model.newUser={}
                });
        }
        );


}

function updateUser(userId)
{
    $location.url('/profile-for-admin/'+userId);
}

function deleteUser(userId)
{
    userService
        .deleteUser(userId)
        .then(function (status)
        {
            console.log(status);
            userService
                .findAllUsers()
                .then(function (response) {
                    model.userList =response;
                });
        }
        );

}
}

})();