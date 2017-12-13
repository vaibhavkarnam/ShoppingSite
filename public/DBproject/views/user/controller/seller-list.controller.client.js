(function(){
angular
.module("omdbApp")
.controller("sellerListController", sellerListController);

function sellerListController($location, $rootScope,userService, userobject){
var model = this;
this.followMe = followMe;

function init(){
    var usr = userobject;
    model.user = usr;

    userService.getSellersList()
        .then(function (response){
            model.sellersList = response.data;})
}



init();

function followMe(sellerName){
    userService
        .followMe(sellerName, model.user)
        .then(function (response){
            })

}

}
})();