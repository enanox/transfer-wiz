'use strict';

angular.module('transferWizApp').controller(
    'ConfirmCtrl',
    [ '$scope', '$state', 'L10n', '$stateParams', '$location',
        function($scope, $state, L10n, $stateParams, $location) {
	        
	      $scope.token = $stateParams.token;
          $scope.language = sessionStorage['tw-lang'] || L10n.getLanguage();

          $scope.localize = L10n.setLanguage;
    	    
    	    $scope.$on('languageChange', function(a) {
    		    sessionStorage.setItem('tw-lang', $scope.language);
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
          	
          	if ($scope.transfer) {
                $state.go('start.transfer.success', {token: token});
            } else {
          		$scope.error = true;
          		$scope.errorMessage = $scope.texts.errorMessages.transferFailed[$scope.language];
          	}          		
          };
          
          $scope.cancel = function () {
              $state.go('start.transfer.amount', {token: $scope.token});
          };
          
          $scope.isConfirm = function () {
            return $state.$current.name == 'start.transfer.confirm';
          };
        } ]);
