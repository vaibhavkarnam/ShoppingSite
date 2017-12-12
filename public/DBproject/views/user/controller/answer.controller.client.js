
(function () {
angular
.module("omdbApp")
.controller("answerController", answerController);

function answerController($location, $routeParams,userobject, productService) {
var model = this;
model.answerId = $routeParams.answerId;
model.getAnswerById = getAnswerById;
model.answerUpdate =answerUpdate;
model.user = userobject;
model.logout = logout;

function init()
{

getAnswerById(model.answerId);
}
init();

function getAnswerById(answerId)
{
    productService
.getAnswerById(answerId)
.then(function(response)
{

    model.answerForUpdate = angular.copy(response[0]);
    console.log("answer");
    console.log(model.answerForUpdate);
});
}

function answerUpdate(answer)
{
    console.log("answering");
 console.log(answer);
    productService
.updateUserAnswer(model.answerId,answer)
.then(function (status)
{
    $location.url('/profile')
});
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

}
})();