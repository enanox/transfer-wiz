'use strict';

angular.module('transferWizApp')
  .provider('Account', function () {    
    // Private variables
    var self = this;
    
    var accounts = [];
    var creditCards = [];
    var userData = [];
    var dbAccounts = new Firebase("https://blistering-fire-3228.firebaseio.com/accounts");
    var dbCreditCards = new Firebase("https://blistering-fire-3228.firebaseio.com/creditCards");
    var dbUser = new Firebase("https://blistering-fire-3228.firebaseio.com/user");
    self.enableFirebase = false;
    
    // Private constructor
    function Account($http, $firebaseArray, $firebaseObject, $q) {  
      
      this.getData = function () {
      	return self.enableFirebase ? this.getDataFromFire() : $http.get('/static/accounts.json');
      };
      
      this.getDataFromFire = function () {
        var deferred = $q.defer();
        
        deferred.resolve({ data: { accounts: $firebaseArray(dbAccounts), creditCards: $firebaseArray(dbCreditCards), user: $firebaseObject(dbUser) } });
        
        return deferred.promise;
      };
               
      this.getData().then(function(data) {
      	accounts = data.accounts;
      	creditCards = data.creditCards;
      	userData = data.user;
      });
    }
    
    // Method for instantiating
    this.$get = ['$http', '$firebaseArray', '$firebaseObject', '$q', function ($http, $firebaseArray, $firebaseObject, $q) {
      return new Account($http, $firebaseArray, $firebaseObject, $q);      
    }];
    
    return this;
  });
