/**
 * Created by prasadtajane on 7/20/17.
 */

(function () {
    angular
        .module("omdbApp")
        .controller("homeController", homeController);

    function homeController($location, $routeParams, productService)   {

        var model = this;
        model.showDoctorDetails = showDoctorDetails;
        model.createAppointment = createAppointment;
        model.searchProductByName = searchProductByName;
        // model.curretLoggedUser = userobject;


        function init() {
            /*
            console.log($routeParams["userId"]);
            if($routeParams["userId"])    {
                console.log("Hello");
            }
            else console.log("Not Logged In");

             userService
             .findUserByNPI("123456789")
             .then(function (response) {
             console.log("response");
             console.log(response.data);
             if(response.data)   {
             console.log("Doctor Found!");
             }
             else console.log("Not Found!");
             });
            */

        }
        init();

        function searchProductByName(product) {
            $location.path("/list-products/"+product).search({searchInput: product});
            /*productService
                .searchProductByName(product)
                .then(productNames);*/
        }

/*        function productNames(pronames){
            console.log(pronames.data);
            model.productList = pronames.data;
        }*/
        
        function showDoctorDetails(doctor) {
            if (userobject._id)   {
                console.log("User Online");
                var appointment = {
                    patient_name:"Your Name",
                    patientId:userobject._id,
                    doctor_name:doctor.profile.first_name+", "+doctor.profile.last_name,
                    doctorId:doctor._id,
                    date:Date.now(),
                    time:"12:00 PM"
                };
                userService
                    .findUserByNPI(doctor.npi)
                    .then(function (response) {
                        console.log("response");
                        //console.log(response.data);
                        if(response.data)   {
                            console.log("Doctor Found!");
                            appointment.doctorId = response.data._id;
                            // $location.url("/user/" + userobject._id + "/doctor/" + appointment.doctorId);
                            $location.url("/doctor/" + appointment.doctorId);
                        }
                        else    {
                            console.log("Creating a Doctor!");
                            doctor.username = (doctor.profile.first_name).toLowerCase() + (doctor.profile.last_name).toLowerCase();
                            doctor.password = (doctor.profile.first_name).toLowerCase() + (doctor.profile.last_name).toLowerCase();
                            doctor.userType = 'doctor';
                            userService
                                .createUser(doctor)
                                .then(function (response) {
                                    var user = response.data;
                                    appointment.doctorId = user._id;
                                    create(userobject._id, appointment);
                                });
                        };
                    });
            }
            else {
                alert("Please Login Before Booking an Appointment.");
                $location.url("/login");
            };
            
        }

        function create(uId, appointment) {
            //console.log("##########");
            return appointmentService
                .createappointment(uId, appointment)
                .then(function (appointmentOut) {
                    //console.log("************");
                    //console.log("inside profile controller then - createAppointment");
                    //console.log(appointmentOut.data);
                    appointmentId = appointmentOut.data._id;
                    $location.url("/appointment/" + appointmentId);
                })
        }

        function createAppointment(doctor) {
            if (userobject._id)   {
                //console.log("User Online");
                var appointment = {
                    patient_name:"Your Name",
                    patientId:userobject._id,
                    doctor_name:doctor.profile.first_name+", "+doctor.profile.last_name,
                    doctorId:doctor._id,
                    date:Date.now(),
                    time:"12:00 PM"
                };
                userService
                    .findUserByNPI(doctor.npi)
                    .then(function (response) {
                        console.log("response");
                        //console.log(response.data);
                        if(response.data)   {
                            console.log("Doctor Found!");
                            appointment.doctorId = response.data._id;
                            create(userobject._id, appointment);
                        }
                        else    {
                            console.log("Creating a Doctor!");
                            doctor.username = (doctor.profile.first_name).toLowerCase() + (doctor.profile.last_name).toLowerCase();
                            doctor.password = (doctor.profile.first_name).toLowerCase() + (doctor.profile.last_name).toLowerCase();
                            doctor.userType = 'doctor';
                            userService
                                .createUser(doctor)
                                .then(function (response) {
                                    var user = response.data;
                                    appointment.doctorId = user._id;
                                    create(userobject._id, appointment);
                                });
                        };
                    });
            }
            else {
                alert("Please Login Before Booking an Appointment.");
                $location.url("/login");
            };
         }

    }
})();