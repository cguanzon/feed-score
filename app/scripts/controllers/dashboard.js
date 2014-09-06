'use strict';

angular.module('feedScoreApp')
  .controller('DashboardCtrl', function ($scope, FeedService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $scope.getSelfUser = function(){
        FeedService.getUser('self').then(function(res){
            $scope.selfUser = res.data;
        });
    };

    $scope.getUserRecent = function(){
        $scope.promise = FeedService.getUserMediaRecent('self').then(function(res){
           $scope.selfMediaRecent = res.data;
           $scope.selfMediaRecentArray = res.data.mediaArray;
        });
    };

    $scope.getSelfUser();
    $scope.getUserRecent();

  });
