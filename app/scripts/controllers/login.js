'use strict';

/**
 * @ngdoc function
 * @name feedScoreApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the feedScoreApp
 */
angular.module('feedScoreApp')
  .controller('LoginCtrl', function ($scope, $state, FeedService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $scope.authorizationUrl = FeedService.getAuthorizationUrl();
  });
