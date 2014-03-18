'use strict';

angular
    .module('transferWizApp')
    .controller(
        'AmountCtrl',
        [
            '$scope',
            'L10n',
            '$routeParams',
            '$location',
            'Account',
            function($scope, L10n, $routeParams, $location, Account) {

	            $scope.token = $routeParams.token;
	            $scope.language = sessionStorage['tw-lang'] || L10n.getLanguage();
	            $scope.validAmountRegexp = /^\d+((\.|\,)\d+)?$/;

	            Account.getData().then(function(response) {
		            $scope.accounts = response.data.accounts;
	            });

	            $scope.localize = L10n.setLanguage;

	            $scope.$on('languageChange', function(a) {
		            sessionStorage.setItem('tw-lang', $scope.language);
	            });

	            L10n.loadTexts().success(function(texts) {
		            $scope.texts = texts;
		            L10n.texts = texts;
	            });

	            $scope.confirmTransfer = function() {
		            if ($scope.amount) {
			            var oldToken = $scope.token;
			            var timestamp = new Date().getTime();
			            var newToken = 'twkey-' + timestamp;
			            var originAccount = sessionStorage[oldToken + '-origin'];

			            // Check available amount against account selected
			            if ($scope.isAvailableAmount(originAccount)) {
				            // TODO Better security method for saving the selected
				            // account
				            sessionStorage[newToken + '-origin'] = sessionStorage[oldToken
				                + '-origin'];
				            sessionStorage[newToken + '-destination'] = sessionStorage[oldToken
				                + '-destination'];

				            delete sessionStorage[oldToken + '-origin'];
				            delete sessionStorage[oldToken + '-destination'];

				            sessionStorage[newToken + '-amount'] = $scope.amount.value;
				            sessionStorage[newToken + '-email'] = $scope.amount.email;
				            sessionStorage[newToken + '-comments'] = $scope.amount.comments;

				            $location.path('/transfer/confirm/' + newToken);
			            } else {
				            var patternError = $scope.amount.$error.pattern.length > 0;

				            if (patternError) {
					            $scope.error = true;
					            $scope.errorMessage = $scope.texts.errorMessages.amountIsNan[$scope.language];
				            } else {
					            $scope.error = true;
					            $scope.errorMessage = $scope.texts.errorMessages.notAvailableAmount[$scope.language];
				            }
			            }
		            } else {
			            $scope.error = true;
			            $scope.errorMessage = $scope.texts.errorMessages.mandatoryFields[$scope.language];
		            }
	            };

	            $scope.cancelAmount = function() {
		            $location.path('/transfer/destination/' + $scope.token);
	            };

	            $scope.isAvailableAmount = function(number) {
		            var available = false;

		            for ( var i = 0; i < $scope.accounts.length; i++) {
			            if ($scope.accounts[i].number === number
			                && $scope.accounts[i].available - $scope.amount.value > 0) {
				            available = true;
			            }
		            }

		            return available;
	            };

            } ]);
