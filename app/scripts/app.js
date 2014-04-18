/// <reference path="../typings/tsd.d.ts" />

'use strict';

angular.module('transferWizApp', [
  'ui.router',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'firebase'
])
  .config(function (AccountProvider) {
    AccountProvider.enableFirebase = true;
  });
  	