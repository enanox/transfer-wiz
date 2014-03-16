'use strict';

angular
    .module('transferWizApp')
    .controller(
        'DestinationCtrl',
        [
            '$scope',
            'L10n',
            'account',
            '$routeParams',
            '$location',
            function($scope, L10n, account, $routeParams, $location) {
	            $scope.awesomeThings = [ 'HTML5 Boilerplate', 'AngularJS',
	                'Karma' ];
	            $scope.types = [ {
		            length : 4
	            }, {
		            length : 4
	            }, {
	              cc : {
		              length : 2
	              },
	              contract : {
		              length : 3
	              }
	            }, {
	              cc : {
		              length : 8
	              },
	              contract : {
		              length : 7
	              }
	            } ];

	            $scope.token = $routeParams.token;
	            $scope.language = L10n.getLanguage();

	            account
	                .getData()
	                .then(
	                    function(response) {
		                    $scope.accounts = response.data.accounts;
		                    $scope.knownDestinationAccounts = response.data.knownDestinationAccounts;
	                    });

	            // TODO change language directive
	            $scope.$watch('language', function() {
		            console.log($scope.language, L10n.language);
	            });
	            $scope.$on('languageChange', function(a) {
		            console.log('change!', a)
	            });

	            L10n.loadTexts().success(function(texts) {
		            $scope.texts = texts;
		            L10n.texts = texts;
	            });

	            $scope.selectAccount = function(index) {
		            $scope.accountSelected = $scope.knownDestinationAccounts[index];
		            $scope.error = false;
		            $scope.errorMessage = '';
	            };

	            $scope.addAccount = function(newAccountFromModel) {
	            	if ($scope.newAccount.hasOwnProperty('number')
		                && $scope.newAccount.number !== '') {
			            var accNumber = $scope.newAccount.number;

			            if ($scope.checkValidAccount(accNumber)) {
				            $scope.setAccountFormat($scope.newAccount);
				            $scope.knownDestinationAccounts.push($scope.newAccount);
				            $scope.newAccount = null;
			            } else {
				            $scope.error = true;
				            $scope.errorMessage = $scope.texts.errorMessages.invalidAccount[$scope.language];
			            }
		            }
	            };

	            $scope.checkValidAccount = function(accountNumber) {
		            var isValid = [];
		            var splittedAccount = accountNumber.split(' ');
		            var types = $scope.types;

		            for ( var i = 0; i < splittedAccount.length; i++) {
			            if (splittedAccount[i].length == types[i].length) {
				            isValid.push(true);
			            } else if (types[i].hasOwnProperty('cc')
			                && splittedAccount[i].length === types[i].cc.length) {
				            isValid.push(true);
			            } else if (types[i].hasOwnProperty('contract')
			                && splittedAccount[i].length === types[i].contract.length) {
				            isValid.push(true);
			            } else {
				            isValid.push(false);
			            }
		            }

		            return isValid.indexOf(false) == -1;
	            };

	            $scope.setAccountFormat = function(accObj) {
		            var types = $scope.types;
		            var splittedAcc = accObj.number.split(' ');

		            for ( var i = 2; i < splittedAcc.length; i++) {
			            if (types[i].cc.length == splittedAcc[i].length) {
				            accObj.type = 'CC';
				            accObj.currency = 'UYU';
			            } else if (types[i].contract.length == splittedAcc[i].length) {
				            accObj.type = 'CA';
				            accObj.currency = 'USD';
			            }
		            }
	            };

	            // When next button is pressed
	            $scope.enterAmount = function() {
		            if ($scope.accountSelected) {
			            var oldToken = $scope.token;
			            var timestamp = new Date().getTime();
			            var newToken = 'twkey-' + timestamp;

			            // TODO Better security method for saving the selected account
			            sessionStorage[newToken + '-origin'] = sessionStorage[oldToken
			                + '-origin'];
			            sessionStorage[newToken + '-destination'] = $scope.accountSelected.number;
			            delete sessionStorage[oldToken+'-origin'];
			            $location.path('/transfer/amount/' + newToken);
		            } else {
			            $scope.error = true;
			            $scope.errorMessage = $scope.texts.errorMessages.selectAccount[$scope.language];
		            }
	            };
            } ]);
