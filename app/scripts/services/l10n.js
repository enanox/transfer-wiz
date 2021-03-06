'use strict';

angular.module('transferWizApp')
    .service('L10n', ['$http', '$rootScope', function($http, $rootScope) {
        this.texts = {};
        
        this.getBrowserLanguage = function() {
            return navigator.language.substring(0, 2)
                || navigator.userLanguage.substring(0, 2);
        };
    
        this.language = this.getBrowserLanguage();
        
        this.setLanguage = function(newLang) {
            this.language = newLang.toLowerCase();
            $rootScope.$broadcast('languageChange',this.language);
        };
        
        this.getLanguage = function() {
        	return this.language;
        };
    
        this.loadTexts = function() {
            return $http.get('/static/texts.json');
        };
    
        this.getTexts = function()  {
        	return this.texts;
        };
        
        this.setTexts = function(texts)  {
        	this.texts = texts;
        };        
    }]);
