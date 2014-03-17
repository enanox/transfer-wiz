transfer-wiz
============
[![Build Status](https://travis-ci.org/enanox/transfer-wiz.png)](https://travis-ci.org/enanox/transfer-wiz)

Dummy bank account transfer wizard, with few simple steps and styles. This project is meant to be used as a PoC of AngularJS, HTML5 Storage and E2E testing.

Uses sessionStorage to maintain session token and data through the pages, and uses data sources from static JSON files (accounts and texts). 

### TODO's ###
 
* Maintain session against back-end database.
* Retrieve / save account data from firebase.io or another similar service
* Remove token from routes

### Deploy development version ###

* Install `npm`
* Install dependencies `npm install` (use `sudo` if you are running a *nix OS)
* Install Grunt CLI `npm install grunt-cli -g`
* Install Grunt `npm install grunt-cli -g`
* Install Bower `npm install bower -g`
* `bower install`
* Run with `grunt serve`