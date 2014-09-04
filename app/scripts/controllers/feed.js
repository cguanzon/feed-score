'use strict';

angular.module('feedScoreApp')
  .controller('FeedCtrl', function ($scope, $window, FeedService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.getSelfFeed = function(){
        FeedService.getSelfFeed().then(function(res){
            $scope.selfFeed = res.data;
        });
    };

    $scope.getSelfUser = function(){
        FeedService.getUser().then(function(res){
            $scope.selfUser = res.data;
            $scope.getSelfFeed();
        });
    };

    $scope.getSelfUser();
  });


