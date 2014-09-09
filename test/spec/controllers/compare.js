'use strict';

describe('Controller: CompareCtrl', function () {

  // load the controller's module
  beforeEach(module('feedScoreApp'));

  var CompareCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CompareCtrl = $controller('CompareCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
