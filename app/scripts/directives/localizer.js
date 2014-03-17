'use strict';

angular.module('transferWizApp').directive(
    'localizer',
    function() {
	    return {
	      template : '<div class="pull-right">'
	          + '<button class="btn btn-default btn-xs" data-ng-class="{\'active\': language == \'en\'}" data-ng-click="localize(\'EN\')">EN</button>'
	          + '<button class="btn btn-default btn-xs" data-ng-class="{\'active\': language == \'es\'}" data-ng-click="localize(\'ES\')">ES</button>'
	          + '</div>',
	      restrict : 'A',
	      replace: true,
	      link : function postLink(scope, element, attrs) {
		      //element.text('this is the localizer directive');
	      	
	      }
	    };
    });
