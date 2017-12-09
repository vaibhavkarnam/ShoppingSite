/**
 * Created by prasadtajane on 7/17/17.
 */

//this is known as IIFE immediately invoke function expression.

(function ()   {
    angular
        .module("WamApp")
        .controller("adminController", adminController);

    function adminController($routeParams, $location, userService, $rootScope, userobject) {


        var model = this;
        var uId = userobject._id;
        model.curretLoggedUser = userobject;

        var user;
        var userWithInsurance;

        model.newUser;
        model.editUser = editUser;
        model.deleteUser = deleteUser;
        model.createNewUser = createNewUser;
        model.changeUserType = changeUserType;


        function init() {
            //alert("inside profile service!")
            model.users;
            userService
                .findAllUsers()
                .then(function (response) {
                    model.userList =response.data;
                });


        }
        init();

        /*function createAppointment() {

            appointment = {
                patient_name:model.user.username,
                patientId:uId,
                doctor_name:"Select Doctor",
                doctorId:"5993630a91ba6b3fedd0c2b4",
                date:Date.now(),
                time:"12:00 PM"
            };

            //console.log("##########");
            appointmentService
                .createappointment(uId, appointment)
                .then(function (appointmentOut) {
                    //console.log("************");
                    //console.log("inside profile controller then - createAppointment");
                    appointmentId = appointmentOut.data._id;
                    //console.log()
                    $location.url("/user/" + uId + "/appointment/" + appointmentId);
                });
        }*/

        function editUser(userId) {
            $location("/admin/user/" + userId +"/edit");
        }

        function createNewUser(newUser) {
            console.log("create");
            var newUser = {
                username:newUser.username,
                password:newUser.password,
                userType:newUser.userType
            } ;
            console.log(newUser);
            userService
                .createUser(newUser)
                .then(function (response) {
                    var user = response.data;
                    console.log("created");
                    console.log(user);
                    model.users;
                    userService
                        .findAllUsers()
                        .then(function (response) {
                            model.userList = response.data;
                            $location.url("/admin/user/" + user._id +"/edit");
                        });
                    alert("Created user sucessfully.");
                });

        }

        function changeUserType(userId, uType) {
            console.log(userId, uType);
            userService
                .findUserById(userId)
                .then(function (response) {
                    console.log(response);
                    var newUser = response.data;
                    newUser.userType = uType;
                    if (uType === 'admin')   {
                        newUser.isAdmin ="True";
                    }
                    else {
                        newUser.isAdmin ="False";
                    }
                    userService
                        .updateUserByUserId(newUser, userId)
                        .then(function (status) {
                            console.log(status);
                            alert("Updated user sucessfully.");
                            userService
                                .findAllUsers()
                                .then(function (response) {
                                    model.userList =response.data;
                                });
                        });
                });
        }

        function deleteUser(userId) {
            userService
                .deleteUserByUserId(userId)
                .then(function (status) {
                    console.log(status);
                    alert("Deleted user sucessfully.");

                    userService
                        .findAllUsers()
                        .then(function (response) {
                            model.userList =response.data;
                        });
                });
        }




    }

})();