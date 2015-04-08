var app = angular.module('myApp', ['ngAnimate']);

app.controller('myController', function($scope, $http) {

  $scope.submitted = false;
  $scope.message = null;


    // search instagram
    function getImages(tag) {
        var base = "https://api.instagram.com/v1";
        var clientId = '890e785cf1ea43f2997d57cc47f91bb8';
        var request = '/tags/' + tag + '/media/recent';
        var url = base + request;
        var config = {
            'params': {'client_id': clientId, 'callback': 'JSON_CALLBACK', 'count': 15,}
        };
        $http.jsonp(url, config).success(function (results) {
            if (results.meta.code == 200) {
                if (results.data.length > 0) {
                    console.log(results.data)
                    $scope.images = results.data;
                    $scope.message = "We found " +results.data.length+ " results tagged with '" +tag;
                } else {
                    $scope.message = "No results were found.";
                }
            } else {
                $scope.message = "Error: '" +result.meta.error_type+"'.";
            }
        }).error(function() {
            $scope.message = "Error!";
        });
    }

     $scope.submit = function() {
        $scope.submitted = true;
        var tag = $scope.data.tag;
        getImages(tag);
    };

    $scope.reset = function() {
        $scope.submitted = false;
        $scope.message = null;
        $scope.data = {};
        $scope.images = {};
    }

});