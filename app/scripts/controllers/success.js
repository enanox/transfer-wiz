'use strict';

angular
    .module('transferWizApp')
    .controller(
        'SuccessCtrl',
        [
            '$scope',
            'L10n',
            '$routeParams',
            '$location',
            function($scope, L10n, $routeParams, $location) {

	            $scope.token = $routeParams.token;
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

		            if (transfer.origin && transfer.destination && transfer.amount && transfer.email) {
			            $scope.transfer = transfer;
			            $scope.deleteSessionData();			            
		            } else {
			            $scope.error = true;
			            $scope.errorMessage = $scope.texts.errorMessages.transferFailed[$scope.language];
		            }
	            };
	            
	            $scope.deleteSessionData = function() {
	            	var savedKeys = ['-origin','-destination','-amount','-email','-comments'];
	            	var token = $scope.token;
	            	
	            	for(var i = 0, j = 0; i < sessionStorage.length; i++) {
	            		if(sessionStorage.getItem(token + savedKeys[j]))  {
	            			sessionStorage.removeItem(token+savedKeys[j]);
	            			j++;
	            		}
	            	}

	            	for(var key in sessionStorage)  {
	            		if(sessionStorage.hasOwnProperty(key)) {
	            			if(key.match(/^twkey/)) {
	            				sessionStorage.removeItem(key);
	            			}
	            		}
	            	}

	            };
	            
            } ]);
