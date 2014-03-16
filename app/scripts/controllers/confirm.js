'use strict';

angular.module('transferWizApp').controller(
    'ConfirmCtrl',
    [ '$scope', 'L10n', '$routeParams', '$location',
        function($scope, L10n, $routeParams, $location) {
	        $scope.awesomeThings = [ 'HTML5 Boilerplate', 'AngularJS', 'Karma' ];
	        
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
            
            $scope.getTransferData();
          });
          
          $scope.getTransferData = function() {
          	var transfer = {}, token = $scope.token;
          	
          	transfer.origin = sessionStorage[token + '-origin'];
          	transfer.destination = sessionStorage[token + '-destination'];
          	transfer.amount = sessionStorage[token + '-amount'];
          	transfer.email = sessionStorage[token + '-email'];
          	transfer.comments = sessionStorage[token + '-comments'];
          	
          	if(transfer.origin && transfer.destination && transfer.amount && transfer.email)  {
          		$scope.transfer = transfer;
          	} else {
          		$scope.error = true;
          		$scope.errorMessage = $scope.texts.errorMessages.transferFailed[$scope.language];
          	}
          };
          
          $scope.processTransfer = function() {
          	var token = $scope.token;
          	
          	if($scope.transfer)
          		$location.path('/transfer/success/'+token);
          	else {
          		$scope.error = true;
          		$scope.errorMessage = $scope.texts.errorMessages.transferFailed[$scope.language];
          	}          		
          };
          
        } ]);
