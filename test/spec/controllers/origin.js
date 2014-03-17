'use strict';

describe('Controller: OriginCtrl', function () {

  // load the controller's module
  beforeEach(module('transferWizApp'));

  var OriginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    OriginCtrl = $controller('OriginCtrl', {
      $scope: scope
    });
  }));
  /*
  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });*/
});
