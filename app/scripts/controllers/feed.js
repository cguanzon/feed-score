'use strict';

/**
 * @ngdoc function
 * @name feedScoreApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the feedScoreApp
 */
angular.module('feedScoreApp')
  .controller('FeedCtrl', function ($scope, FeedService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.layout = 'list';

    $scope.setLayout = function(layout){
        $scope.layout = layout;
    };

    $scope.isLayout = function(layout){
        return $scope.layout === layout;
    };

    $scope.authorizationUrl = FeedService.getAuthorizationUrl();

    $scope.pics = [];

    FeedService.fetchPopular(function(data){

        $scope.pics = data;
    });
  });


