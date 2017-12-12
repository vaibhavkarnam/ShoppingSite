(function () {
angular
.module("omdbApp")
.factory("userService", userService);

function userService($http)
{

var api = {
    "findUserByUsername": findUserByUsername,
    "findUserByUsernameAndPassword": login,
    "findUserById": findUserById,
    "registerUser": registerUser,
    "logout":logout,
    "checkAdmin": checkAdmin,
    "findAllUsers": findAllUsers,
    "updateUser": updateUser,
    "deleteUser": deleteUser,
    "checkLoggedIn": checkLoggedIn,
    "unRegisterUser":unRegisterUser,
    "getSellersList":getSellersList,
    "followMe":followMe,
    "createUser":createUser
};
return api;

function followMe(sellerName, userId)
{
    var url = "/api/seller/followMe";
    return  $http.post(url, {userId :userId, sellerName : sellerName});
}

function getSellersList()
{
    var url = "/api/seller";
    return $http.get(url);
}

function unRegisterUser()
{
    var url = "/api/unregister";
    return $http.delete(url)
        .then(function (response){
            return response.data;
        }
        );
}

function findAllUsers()
{
    var url = "/api/users";
    return $http.get(url)
        .then(function (response)
        {
            return response.data;
        }
        );
}

function checkAdmin()
{
    var url = "/api/checkAdmin";
    return $http.get(url)
        .then(function (response)
        {
            return response.data;
        });
}

function createUser(newuser)
{
  return $http.post("/api/user/create", newuser);
}

function logout()
{
    var url = "/api/logout";
    return $http.post(url)
        .then(function (response)
        {
            return response.data;
        }
        );
}

function checkLoggedIn()
{
    var url = "/api/checkLoggedIn";
    return $http.get(url)
        .then(function (response)
        {
            return response.data;
        });
}

function deleteUser(userId)
{
    var url = "/api/user/"+userId;
    return $http.delete(url)
        .then(function (response){
            return response.data;
        }
        );

}

function updateUser(userId, user)
{
    var url ="/api/user/"+userId;
    return $http.put(url,user);

}

function registerUser(user)
{
    var url = "/api/user";
    return $http.post(url, user);

}

function findUserByUsername(username)
{
    return $http.get("/api/user?username="+username);

}
function findUserById(userId)
{
    return $http.get("/api/user/"+userId);

}

function login(username, password)
{

    return $http.post("/api/login",{username:username,password:password});
}

}
})();