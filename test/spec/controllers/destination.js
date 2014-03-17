'use strict';

describe('Controller: DestinationCtrl', function () {

  // load the controller's module
  beforeEach(module('transferWizApp'));

  var DestinationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DestinationCtrl = $controller('DestinationCtrl', {
      $scope: scope
    });
  }));
  /*
  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });*/
});
