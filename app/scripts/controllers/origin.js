'use strict';

angular
    .module('transferWizApp')
    .controller(
        'OriginCtrl',
        [
            '$scope',
            '$state',
            'L10n',
            'Account',
            '$location',
            '$rootScope',
            function($scope, $state, L10n, Account, $location, $rootScope) {

	            $scope.language = sessionStorage['tw-lang'] || L10n.getLanguage();

	            Account.getData().then(function(response) {
		            $scope.accounts = response.data.accounts;
	            });
                
	            $scope.localize = L10n.setLanguage;

	            $scope.$on('languageChange', function(a) {
		            sessionStorage.setItem('tw-lang', $scope.language);
	            });

	            $scope.accountSelected = {
		            number : ''
	            };
	            $scope.$watch('accountSelected.number', function() {
		            if ($scope.accountSelected.number) {
			            $scope.error = false;
			            $scope.errorMessage = '';
		            }
	            });

	            $scope.selectAccount = function(index) {
		            $scope.accountSelected = $scope.accounts[index];
	            };

	            L10n.loadTexts().success(function(texts) {
		            $scope.texts = texts;
		            L10n.texts = texts;
	            });

	            $scope.startTransfer = function() {
		            if ($scope.accountSelected.number) {
			            var timestamp = new Date().getTime();
			            var token = 'twkey-' + timestamp;
			            // TODO Better security method for saving the selected account
			            sessionStorage[token + '-origin'] = $scope.accountSelected.number;
			            //$location.path('/transfer/destination/' + token);
                        $state.go("start.transfer.destination", {token: token});
		            } else {
			            $scope.error = !$scope.error;
			            $scope.errorMessage = $scope.texts.errorMessages.selectAccount[$scope.language];
		            }
	            };
                
                $scope.isOrigin = function () {
                    return $state.$current.name == 'start.transfer.origin';
                };
            } ]);
