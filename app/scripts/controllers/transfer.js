'use strict';

angular.module('transferWizApp')
  .controller('TransferCtrl', ['$scope', 'L10n', 'account', function ($scope, L10n, account) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.language = L10n.getLanguage();   
    
    account.getData().then(function(response) {
    	$scope.accounts = response.data.accounts;
    	$scope.creditCards = response.data.creditCards;
    	$scope.userData = response.data.user;
    });
    
    // TODO change language directive
    $scope.$watch('language', function() { console.log($scope.language, L10n.language); });    
    $scope.$on('languageChange', function(a) { console.log('change!', a)})
    
    L10n.loadTexts().success(function(texts) {
    	$scope.texts = texts;
    	L10n.texts = texts;
    });
    
    
  }]);
