'use strict';

angular.module('transferWizApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/transfer', {
        templateUrl: 'views/transfer.html',
        controller: 'TransferCtrl'
      })      
      .when('/transfer/origin', {
        templateUrl: 'views/origin.html',
        controller: 'OriginCtrl'
      })
      .when('/transfer/destination', {
        templateUrl: 'views/destination.html',
        controller: 'DestinationCtrl'
      })
      .when('/transfer/amount', {
        templateUrl: 'views/amount.html',
        controller: 'AmountCtrl'
      })
      .when('/transfer/success', {
        templateUrl: 'views/success.html',
        controller: 'SuccessCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
