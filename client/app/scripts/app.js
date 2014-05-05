'use strict';

var api = {
  development: 'http://localhost:3000/',
  production: ''
};

var colloqua = angular.module('colloqua', [
  'ngRoute',
  'valence'
]);

colloqua.config(function ($routeProvider, valenceProvider, valenceAuthProvider) {

  // Valence API
  valenceProvider.api = api[env];

  // Valence Loader
  valenceProvider.loader.loader = '#loader';
  valenceProvider.loader.content = '#content';

  valenceAuthProvider.enabled = true;
  
  // Valence Auth
  valenceAuthProvider.endpoints = {
    login: {
      URL: valenceProvider.api+'session',
      requires: ['username', 'password'],
      method: 'POST',
      sucess: '/'
    },
    logout: {
      URL: valenceProvider.api+'session',
      method: 'DELETE',
      success : '/'
    },
    validate: {
      URL: 'http://localhost:9001/session',
      method: 'GET'
    },
    create: {
      URL: 'http://localhost:9001/users',
      method: 'POST',
      success: '/',
      validateOnCreate: true
    }
  };

  valenceAuthProvider.config = {
    headers: {
      withCredentials: true,
    }
  };

  valenceAuthProvider.authEvery = true;


  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
