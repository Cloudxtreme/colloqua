'use strict';

colloqua.controller('MainCtrl', function ($scope, $http) {
  $scope.login = function() {
    $http({method: 'POST', url: api[env]+'login', data: $scope.user}).success(function(data) {
      console.log(data);
    }).error(function(error) {
      console.log(error);
    })
  }
});
