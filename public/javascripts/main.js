var tttApp = angular.module("tttApp", []);

tttApp.factory('getResultService', function($http) {
    var myService = {
        async: function(url) {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get(url).then(function (response) {
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        }
    };
    return myService;
});

tttApp.controller("mainController", ["$scope", "$http", "getResultService", function($scope, $http, getResultService){
    $scope.num = 1;
    var url = '/api/' + $scope.num;
    
    $scope.$watch('num', function(){
        url = '/api/' + $scope.num;
    });
    
    $scope.getResults = function(){
        
        $scope.loading = true;
        getResultService.async(url).then(function(d) {
            $scope.data = d;
            $scope.loading = false;
        });
    };
}]);


