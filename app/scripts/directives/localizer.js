'use strict';

angular.module('transferWizApp').directive(
    'localizer',
    function() {
	    return {
	      templateUrl: 'partials/localizer.html',
	      restrict : 'EA',
	      replace: true,
	      link : function postLink(scope, element, attrs) {
		      //element.text('this is the localizer directive');	      	
	      }
	    };
    });
