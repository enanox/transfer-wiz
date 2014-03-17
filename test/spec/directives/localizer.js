'use strict';

describe('Directive: localizer', function () {

  // load the directive's module
  beforeEach(module('transferWizApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<div localizer></div>');
    element = $compile(element)(scope);
    expect(element.children().count()).toBe(2);
  }));
});
