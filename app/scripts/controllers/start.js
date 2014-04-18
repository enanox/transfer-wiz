'use strict';

angular.module('transferWizApp').controller('StartCtrl',
    [ '$scope', '$state', 'L10n', 'Account', function($scope, $state, L10n, Account) {

	    $scope.language = sessionStorage['tw-lang'] || L10n.getLanguage();

	    Account.getData().then(function(response) {
		    $scope.accounts = response.data.accounts;
		    $scope.creditCards = response.data.creditCards;
		    $scope.userData = response.data.user;
	    });
	    
	    $scope.localize = L10n.setLanguage;
	    
	    $scope.$on('languageChange', function(a) {
		    sessionStorage.setItem('tw-lang', $scope.language);
	    });

	    L10n.loadTexts().success(function(texts) {
		    $scope.texts = texts;
		    L10n.texts = texts;
	    });
        
        $scope.isHome = function () {
         return $state.$current.name == 'start';
       };
    } ]);
