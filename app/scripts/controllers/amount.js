'use strict';

angular
    .module('transferWizApp')
    .controller(
        'AmountCtrl',
        [
            '$scope',
            '$state',
            'L10n',
            '$stateParams',
            '$location',
            'Account',
            function($scope, $state, L10n, $stateParams, $location, Account) {

	            $scope.token = $stateParams.token;
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
			            var newToken = oldToken;
			            var originAccount = sessionStorage[oldToken + '-origin'];

			            // Check available amount against account selected
			            if ($scope.isAvailableAmount(originAccount)) {
				            // TODO Better security method for saving the selected
				            // account
				            sessionStorage[newToken + '-origin'] = sessionStorage[oldToken
				                + '-origin'];
				            sessionStorage[newToken + '-destination'] = sessionStorage[oldToken
				                + '-destination'];
				            
				            sessionStorage[newToken + '-amount'] = $scope.amount.value;
				            sessionStorage[newToken + '-email'] = $scope.amount.email;
				            sessionStorage[newToken + '-comments'] = $scope.amount.comments;

                            $state.go('start.transfer.confirm', {token: newToken});
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
                    $state.go('start.transfer.destination', {token: $scope.token});
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
                $scope.isAmount = function () {
                    return $state.$current.name == 'start.transfer.amount';
                };
            } ]);
