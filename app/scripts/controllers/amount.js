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
            function($scope, L10n, $routeParams, $location) {
	            $scope.awesomeThings = [ 'HTML5 Boilerplate', 'AngularJS',
	                'Karma' ];

	            $scope.token = $routeParams.token;
	            $scope.language = L10n.getLanguage();

	            // TODO change language directive
	            $scope.$watch('language', function() {
	            });
	            $scope.$on('languageChange', function(a) {
		            console.log('change!', a);
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

			            // TODO Better security method for saving the selected account
			            sessionStorage[newToken + '-origin'] = sessionStorage[oldToken
			                + '-origin'];
			            sessionStorage[newToken + '-destination'] = sessionStorage[oldToken
			                + '-destination'];
			            sessionStorage[newToken + '-amount'] = $scope.amount.value;
			            sessionStorage[newToken + '-email'] = $scope.amount.email;
			            sessionStorage[newToken + '-comments'] = $scope.amount.comments;

			            $location.path('/transfer/confirm/' + newToken);
		            } else {
			            $scope.error = true;
			            $scope.errorMessage = $scope.texts.errorMessages.mandatoryFields[$scope.language];
		            }
	            };

	            $scope.cancelAmount = function() {
		            $location.path('/transfer/destination/' + $scope.token);
	            };

            } ]);
