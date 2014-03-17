'use strict';

angular.module('transferWizApp').directive(
    'localizer',
    function() {
	    return {
	      template : '<div class="pull-right">'
	          + '<button class="btn btn-default btn-xs" data-ng-click="localize(\'EN\')">EN</button>'
	          + '<button class="btn btn-default btn-xs" data-ng-click="localize(\'ES\')">ES</button>'
	          + '</div>',
	      restrict : 'A',
	      replace: true,
	      link : function postLink(scope, element, attrs) {
		      //element.text('this is the localizer directive');
	      	var esButton = element.children().eq(0);
	      	var enButton = element.children().eq(1);
	      	
	      	if(sessionStorage['tw-lang'] == 'es')  {
	      		esButton.addClass('active');
	      		enButton.removeClass('active');
	      	} else if(sessionStorage['tw-lang'] == 'en')  {
	      		enButton.addClass('active');
	      		esButton.removeClass('active');
	      	}
	      }
	    };
    });
