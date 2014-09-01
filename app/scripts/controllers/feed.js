'use strict';

/**
 * @ngdoc function
 * @name feedScoreApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the feedScoreApp
 */
angular.module('feedScoreApp')
  .controller('FeedCtrl', function ($scope, $window, FeedService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $scope.instagramLogin = function(){
        $window.open(FeedService.getAuthorizationUrl());
    };

    $scope.getSelfUser = function(){
        FeedService.getUser().then(function(res){
            $scope.selfUser = res.data;
        });
    };

  });


