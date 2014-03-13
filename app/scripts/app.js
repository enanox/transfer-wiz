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
        /*templateUrl: 'views/main.html',
        controller: 'MainCtrl'*/
      	redirectTo: '/transfer'
      })
      .when('/transfer', {
        templateUrl: 'views/transfer.html',
        controller: 'TransferCtrl'
      })      
      .when('/transfer/origin', {
        templateUrl: 'views/origin.html',
        controller: 'OriginCtrl'
      })
      .when('/transfer/destination/:token', {
        templateUrl: 'views/destination.html',
        controller: 'DestinationCtrl'
      })
      .when('/transfer/amount/:token', {
        templateUrl: 'views/amount.html',
        controller: 'AmountCtrl'
      })
      .when('/transfer/success/:token', {
        templateUrl: 'views/success.html',
        controller: 'SuccessCtrl'
      })
      .when('/transfer/confirm/:token', {
        templateUrl: 'views/confirm.html',
        controller: 'ConfirmCtrl'
      })
      .otherwise({
        redirectTo: '/transfer'
      });
  });
