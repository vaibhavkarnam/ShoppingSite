(function () {
angular
.module("omdbApp")
.service("productService", productService);

function productService($http)
{


this.searchProductByName = searchProductByName;
this.createProduct = createProduct;
this.findProductById = findProductById;
this.searchProductByWalmartItemId = searchProductByWalmartItemId;
this.createReview = createReview;
this.createQuestion = createQuestion;
this.getUserQuestions = getUserQuestions;
this.deleteReview = deleteReview;
this.deleteQuestion = deleteQuestion;

this.getUserReviews = getUserReviews;
this.findAllProducts = findAllProducts;
this.updateProduct= updateProduct;
this.deleteProduct= deleteProduct;

this.getAllUserReviews = getAllUserReviews;
this.getAllUserQuestions = getAllUserQuestions;
this.getAllQuestions = getAllQuestions;

this.updateUserReview = updateUserReview;
this.updateUserAnswer = updateUserAnswer;
this.getReviewById = getReviewById;
this.getAnswerById = getAnswerById;

this.getAllReturnedProducts = getAllReturnedProducts;

this.createProductForOrder = createProductForOrder;
this.deleteProductForOrder= deleteProductForOrder;
this.createProductForReturn = createProductForReturn;
this.deleteProductForReturn= deleteProductForReturn;
this.createReturnInTable = createReturnInTable;
this.createReturnInTable = createReturnInTable;
this.findReturnByUserIdAndProductId = findReturnByUserIdAndProductId;

function findReturnByUserIdAndProductId(){

}

function getAllReturnedProducts()
{
    var url = "/api/returnAllProducts";
    return $http.get(url)
        .then(function (response)
        {
            return response.data;
        }
        );
}

function deleteProductForReturn(productId,returnId)
{
    var url = "/api/productForReturn/"+productId+"/return/"+returnId;
    return $http.delete(url)
        .then(function (response)
        {
            return response.data;
        }
        );
}

function createProductForReturn(userId, product)
{
    var url = "/api/productForReturn";
    return $http.post(url,{userId :userId, product : product})
        .then(function (response)
        {
            return response.data;
        }
        );
}

function createReturnInTable(userId, product)
{
    var url = "/api/returnToTable";
    return $http.post(url,{userId :userId, product : product})
        .then(function (response)
        {
            return response.data;
        }
        );
}

function deleteProductForOrder(productId)
{
    var url = "/api/productForOrder/"+productId;
    return $http.delete(url)
        .then(function (response)
        {
            return response.data;
        }
        );
}

function createProductForOrder(userId, product)
{
    var url = "/api/productForOrder";
    return $http.post(url,{userId :userId, product : product})
        .then(function (response)
        {
            return response.data;
        }
        );
}
function updateProduct(productId,product)
{
    var url = "/api/product/"+productId;
    return $http.put(url,product)
        .then(function (response)
        {
            return response.data;
        }
        );

}


function deleteProduct(productId)
{
    var url = "/api/product/"+productId;
    return $http.delete(url)
        .then(function (response)
        {
            return response.data;
        }
        );

}


function findProductById(productId)
{
    var url = "/api/product/"+productId;
    return $http.get(url)
        .then(function (response)
        {
            return response.data;
        }
        );


}

function findAllProducts()
{
    var url = "/api/product";
    return $http.get(url)
        .then(function (response)
        {
            return response.data;
        });


}

function searchProductByName(product)
{
    var url = "/api/walmartSearch/"+product;
    return $http.get(url)
        .then(function (response)
        {
            return response.data;
        }
        );
}

function createProduct(userId, product)
{
    var url = "/api/product";
    return $http.post(url,{userId :userId, product : product})
        .then(function (response)
        {
            return response.data;
        }
        );
}

function searchProductByWalmartItemId(productId)
{
    var url = "/api/walmart/"+productId;
    return $http.get(url)
        .then(function (response)
        {
            return response.data;
        });

}

function getUserReviews(productId)
{
var url="/api/project/getReview/"+productId;
return $http.get(url)
    .then(function (response)
    {
        return response.data;
    }
    );
}


function getUserQuestions(productId)
{
    var url="/api/project/getQuestion/"+productId;
    return $http.get(url)
        .then(function (response)
            {
                console.log(response);
                return response.data;
            }
        );
}


function createReview(review, userId)
{
    return $http.post("/api/project/user/"+userId+"/review", review);
}

function createQuestion(question, userId)
{
    return $http.post("/api/project/user/"+userId+"/question", question);
}


function deleteReview(Id)
{
    var url ="/api/project/Review/"+Id;
    return $http
        .delete(url)
        .then(function (response)
        {
            return response;
        });
}

function deleteQuestion(Id)
{
    console.log("del ques");
    var url ="/api/project/Question/"+Id;
    return $http
        .delete(url)
        .then(function (response)
        {
            return response;
        });
}

function updateUserReview(reviewId,review)
{
    var url="/api/project/Review/"+reviewId;
    return $http
        .put(url,review)
        .then(function (response)
        {
            return response.data;
        });
}

function updateUserAnswer(answerId,answer)
{
    var url="/api/project/Answer/"+answerId;
    return $http
        .put(url,answer)
        .then(function (response)
        {
            return response.data;
        });
}

function getReviewById(reviewId)
{
    console.log("getting");
    var url="/api/project/getReviewId/"+reviewId;
    return $http.get(url)
        .then(function (response)
        {
            return response.data;
        });
}


function getAnswerById(answerId)
{
    var url="/api/project/getAnswerId/"+answerId;
    return $http.get(url)
        .then(function (response)
        {
            return response.data;
        });
}

function getAllUserReviews(userId)
{
    var url="/api/project/getReviewForUser/"+userId;
    return $http.get(url)
        .then(function (response)
        {
            return response.data;
        });
}

function getAllUserQuestions(userId)
{
    var url="/api/project/getQuestionsForUser/"+userId;
    return $http.get(url)
        .then(function (response)
        {
            return response.data;
        });
}

function getAllQuestions(userId)
{
    var url="/api/project/getQuestions/"+userId;
    return $http.get(url)
        .then(function (response)
        {
            return response.data;
        });
}
}

})();