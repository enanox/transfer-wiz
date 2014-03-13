'use strict';

angular
    .module('transferWizApp')
    .controller(
        'OriginCtrl',
        [
            '$scope',
            'L10n',
            'account',
            '$location',
            '$rootScope',
            function($scope, L10n, account, $location, $rootScope) {
	            $scope.awesomeThings = [ 'HTML5 Boilerplate', 'AngularJS',
	                'Karma' ];

	            $scope.language = L10n.getLanguage();
	           
	            account.getData().then(function(response) {
		            $scope.accounts = response.data.accounts;
		            $scope.creditCards = response.data.creditCards;
		            $scope.userData = response.data.user;
	            });

	            // TODO change language directive
	            $scope.$watch('language', function() {
		            console.log($scope.language, L10n.language);
	            });
	            $scope.$on('languageChange', function(a) {
		            console.log('change!', a)
	            })

	            L10n.loadTexts().success(function(texts) {
		            $scope.texts = texts;
		            L10n.texts = texts;
	            });

	            $scope.selectAccount = function(acc) {
		            $scope.accountSelected = acc;
		            $scope.error = false;
		            $scope.errorMessage = '';
	            };

	            $scope.startTransfer = function() {
		            if ($scope.accountSelected) {
			            var timestamp = new Date().getTime();
			            var token = 'twkey-' + timestamp;
			            // TODO Better security method for saving the selected account
			            sessionStorage[token+'-origin'] = $scope.accountSelected;
			            
			            $location.path('/transfer/destination/' + token);
		            } else {
			            $scope.error = !$scope.error;
			            $scope.errorMessage = $scope.texts.errorMessages.selectAccount[$scope.language];
		            }
	            };
            } ]);
