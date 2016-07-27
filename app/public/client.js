var client = angular.module('client', ['ngRoute']);

client.config(function($routeProvider, $locationProvider) {
    $routeProvider

        .when('/',
            {
                templateUrl: './home/home.html',
                controller: 'home'
            })
        .when('/protected',
            {
                templateUrl: './protected/protected.html',
                controller: 'protected'
            }
        )
        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);

});

client.service('token', [function() {

    var storedToken = '';

    return {
        store: function(token) {
            storedToken = token;
        },
        retrieve: function() {
            return storedToken;
        }
    };

}]);

client.controller('home', ['$scope', '$http', 'token', '$location', function($scope, $http, token, $location) {

    token.store('');

    $scope.tokenError = false;
    $scope.loginError = false;
    $scope.tokenRcd = false;

    $scope.submit = function() {


        if($scope.username !== '' && $scope.username !== undefined) {
            $http({
                method: 'POST',
                url: '/login',
                data: {
                    username: $scope.username
                }
            })
                .then(function(res) {
                    //store token in angular service
                    token.store(res.data.token);
                    $scope.loginError = false;
                    $scope.tokenError = false;
                    $scope.tokenRcd = true;

                }, function(rej) {
                    console.log(rej);
                    $scope.loginError = true;
                });
        }
    };

    $scope.go = function(location) {
        $scope.token = token.retrieve();

        $http({
            method: 'POST',
            url: '/verify',
            data: {
                token: $scope.token
            }
        }).then(function() {
            //verified user, allow access to the /protected page
            $location.path(location);
        }, function() {
            //non-verified
            $scope.tokenError = true;
        });
    }
}]);

client.controller('protected', ['$scope', 'token', '$http', '$location', function($scope, token, $http, $location) {
    //controller code here
    $scope.token = token.retrieve();
    if($scope.token === undefined || $scope.token === '') {
        $location.path('/')
    }

}]);

