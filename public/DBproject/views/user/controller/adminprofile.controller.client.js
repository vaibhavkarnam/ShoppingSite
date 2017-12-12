(function (){
angular
.module("omdbApp")
.controller("adminProfileController",adminProfileController);

function adminProfileController($routeParams,userobject,$location,productService,userService) {

var model = this;

model.updateUser = updateUser;
model.deleteUser = deleteUser;
model.updateProduct = updateProduct;
model.deleteProduct = deleteProduct;
model.unRegisterUser = unRegisterUser;
model.logout = logout;
model.getSellersList = getSellersList;
model.userId = $routeParams.userId;
model.curretLoggedUser = userobject;

function init() {

            userService
                .findUserById(model.userId)
                .then(function (response)
                    {
                    var usr = response.data;
                    usr.dob = new Date(usr.dob);
                    model.user = usr;
                    model.products = usr.products;
                    model.following = model.user.following;
                }
                );

}


init();

function deleteUser(userId)
{
    userService
        .deleteUser(userId)
        .then(function ()
        {
            $location.url("/admin");
        });
}

function getSellersList()
{
    $location.url("/sellers");
}

function updateUser(user)
{
    userService
        .updateUser(model.userId,user)
        .then(function (response){
            var usr = response.data;
            var status = response.status;
            if (status === 200){
                model.message = "Update Successfull";
            }else
                {
                model.message = "Update not successfull";
            }
            console.log(usr);
            usr.dob = new Date(usr.dob);
           model.user = usr;

        }
        );
}

function unRegisterUser()
{

    userService
        .unRegisterUser()
        .then(function (){
           $location.url("/login");
        }
        );
}



function logout()
{
    userService
        .logout()
        .then(function (){
            $location.url('/login');
        });
}

function updateProduct(productId)
{
    $location.url("/updateproduct/"+productId);
}

function deleteProduct(productId)
{
    productService
        .deleteProduct(productId)
        .then(function (){
            $location.url('/');
        });
}
}

})();