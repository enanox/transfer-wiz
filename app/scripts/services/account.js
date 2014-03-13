'use strict';

angular.module('transferWizApp')
  .provider('account', function () {

    // Private variables
    var salutation = 'Hello';
    var accounts = getAccounts();
    var creditCards = [];
    var userData = [];
    var db = {};

    // Private constructor
    function account(provider) {    	
    	this.httpProvider = provider;
      this.confirm = function () {
        return salutation;
      };
      
      this.getData = function () {
      	return this.httpProvider.get('/static/accounts.json');
      };
      
      this.getData().success(function(data) {
      	accounts = data.accounts;
      	creditCards = data.creditCards;
      	userData = data.user;
      });
      
      this.getAccountList = function()  {
      	this.getData().success(function(data) {
        	accounts = data.accounts;
        	return accounts;
      	});/*
      	console.log('afuer',accounts)
      	return accounts;*/
      };
    }
     
    function getAccounts()  {
    	return accounts;
    }
    // Method for instantiating
    this.$get = ['$http', function ($http) {
      return new account($http);      
    }];
  });
