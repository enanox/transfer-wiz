'use strict';

describe('Directive: localizer', function () {
  var element, scope;
  var $httpBackend, $rootScope, $compile;

  beforeEach(function () {    
    module('transferWizApp');
    module('appPartials');
  });
  
  beforeEach(inject(function ($injector, _$compile_) {    
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $compile = _$compile_;
            
    $httpBackend.expectGET('partials/localizer.html').respond(200);
    
    scope = $rootScope;
    element = angular.element('<div localizer></div>');
    $compile(element)(scope);
    
    scope.$digest();
  }));

  it('should have two children elements', function () {
    expect(element.children().length).toBe(2);
  });
});
