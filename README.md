transfer-wiz
============
[![Build Status](https://travis-ci.org/enanox/transfer-wiz.png)](https://travis-ci.org/enanox/transfer-wiz) [![TypeScript definitions on DefinitelyTyped](http://definitelytyped.org/badges/standard.svg)](http://definitelytyped.org)

Dummy bank account transfer wizard, with few simple steps and styles. This project was meant to be used as a PoC of [AngularJS](http://angularjs.org), [Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) and [E2E testing](https://docs.angularjs.org/guide/e2e-testing).

Uses sessionStorage to maintain session token and data through the pages, and uses data sources from static JSON files (accounts and texts) or from [Firebase](http://firebase.io). 

### Deploy development version ###

* Recommended: installing globally `Bower` and `Grunt`: `npm install bower grunt grunt-cli -g`
* Run `npm install && bower install`
* Start the server with `grunt serve`

### License ###

This project is licensed under the MIT license.