'use strict';

angular.module('transferWizApp').provider('Routes', ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$stateProvider
       .state('start', {
         url: '/',        
         views: {
           '@': {
             templateUrl: 'views/pages.html',
             controller: 'StartCtrl'
           },
           'pages@start': {
              templateUrl: 'views/transferPages.html',
            }
         }
       })
      .state('start.transfer', {
      	url: '^/transfer',
        abstract: true,
      })   
      .state('start.transfer.origin', {
      	url: '/origin',
        views: {
          'origin@start': {            
            templateUrl: 'views/origin.html',
            controller: 'OriginCtrl'
          }
        }
      })
      .state('start.transfer.destination', {
      	url: '/destination/:token',
        views: {
          'destination@start': {
            templateUrl: 'views/destination.html',
            controller: 'DestinationCtrl'
          } 
        }        
      })
      .state('start.transfer.amount', {
      	url: '/amount/:token',
        views: {
          'amount@start': {
            templateUrl: 'views/amount.html',
            controller: 'AmountCtrl'
          }
        }        
      })
      .state('start.transfer.success', {
      	url: '/success/:token',
        views: {
          'success@start': {            
            templateUrl: 'views/success.html',
            controller: 'SuccessCtrl'
          }
        }
      })
      .state('start.transfer.confirm', {
      	url: '/confirm/:token',
        views: {
          'confirm@start': {
            templateUrl: 'views/confirm.html',
            controller: 'ConfirmCtrl'    
          }
        }        
      });

  	$urlRouterProvider.otherwise('/');
    
    this.$get = function () {};
}]);