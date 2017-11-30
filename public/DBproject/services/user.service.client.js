/**
 * Created by vaibhav on 29-11-2017.
 */
(function () {
    angular
        .module("omdbApp")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            "findUserByUsername": findUserByUsername,
            "findUserByUsernameAndPassword": login,
            "findUserById": findUserById,
            "registerUser": registerUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "checkLoggedIn": checkLoggedIn,
            "logout":logout,
            "checkAdmin": checkAdmin,
            "findAllUsers": findAllUsers,
            "unRegisterUser":unRegisterUser
        };
        return api;

        function unRegisterUser(){
            var url = "/api/unregister";
            return $http.delete(url)
                .then(function (response){
                    return response.data;
                });
            // for(var u in users) {
            //     if (users[u]._id === userId) {
            //         var index = users.indexOf(users[u]);
            //         users.splice(index, 1);
            //         return;
            //     }
            // }
        }

        function findAllUsers(){
            var url = "/api/users";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function checkAdmin(){
            var url = "/api/checkAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function logout(){
            var url = "/api/logout";
            return $http.post(url)
                .then(function (response){
                    return response.data;
                });
        }

        function checkLoggedIn(){
            var url = "/api/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId){
            var url = "/api/user/"+userId;
            return $http.delete(url)
                .then(function (response){
                    return response.data;
                });
            // for(var u in users) {
            //     if (users[u]._id === userId) {
            //         var index = users.indexOf(users[u]);
            //         users.splice(index, 1);
            //         return;
            //     }
            // }
        }

        function updateUser(userId, user) {
            var url ="/api/user/"+userId;
            return $http.put(url,user);
            // for(var u in users) {
            //     if(users[u]._id === userId) {
            //         users[u] = user;
            //         return users[u];
            //     }
            // }
            // return null;
        }

        function registerUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
            // user._id = (new Date()).getTime() + "";
            // users.push(user);
            // return user;
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);

        }
        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
            // for(var u in users) {
            //     if(users[u]._id === userId) {
            //         return angular.copy(users[u]);
            //     }
            // }
            // return null;
        }

        function login(username, password) {
            // return $http.get("/api/user?username="+username+"&password="+password);
            // for(var u in users) {
            //     var _user = users[u];
            //     if(_user.username === username && _user.password === password) {
            //         return _user;
            //     }
            // }
            // return null;
            return $http.post("/api/login",{username:username,password:password});
        }

    }
})();