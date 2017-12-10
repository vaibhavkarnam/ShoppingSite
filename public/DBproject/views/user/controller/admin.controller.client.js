/**
 * Created by prasadtajane on 7/17/17.
 */

//this is known as IIFE immediately invoke function expression.

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
        model.editUser = editUser;
        model.deleteUser = deleteUser;
        model.createNewUser = createNewUser;
        model.updateUser = updateUser;


        function init() {
            //alert("inside profile service!")
            userService
                .findAllUsers()
                .then(function (response) {
                    model.userList =response;
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

        function createNewUser(usernew) {
            console.log("create");
            var newUser = {
                username:usernew.username,
                password:usernew.password,
                roles:[]
            } ;
            newUser.roles.push(usernew.userType);
            console.log(newUser);
            userService
                .createUser(newUser)
                .then(function (response) {
                    var user = response.data;
                    console.log("created");
                    console.log(user);
                    userService
                        .findAllUsers()
                        .then(function (response) {
                            model.userList = response;
                            model.newUser={}
                        });
                    // alert("Created user sucessfully.");
                });

        }

        function updateUser(userId) {
            $location.url('/profile-for-admin/'+userId);
        }

        function deleteUser(userId) {
            userService
                .deleteUser(userId)
                .then(function (status) {
                    console.log(status);
                    // alert("Deleted user sucessfully.");
                    userService
                        .findAllUsers()
                        .then(function (response) {
                            model.userList =response;
                        });
                });
        }
    }

})();