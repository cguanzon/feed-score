'use strict';

/**
 * @ngdoc function
 * @name feedScoreApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the feedScoreApp
 */
angular.module('feedScoreApp')
  .controller('UserCtrl', function ($scope, FeedService, $stateParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.userId = $stateParams.user_id;
    console.log($stateParams);
    console.log($scope.userId);

    $scope.getUser = function(){
        FeedService.getUser($scope.userId).then(function(res){
            $scope.selfUser = res.data;
            console.log($scope.selfUser);
        });
    };

    $scope.getUserRecent = function(){
        $scope.promise = FeedService.getUserMediaRecent($scope.userId).then(function(res){
            $scope.selfMediaRecent = res.data;
            $scope.selfMediaRecentArray = res.data.mediaArray;
        });
    };

    $scope.getUser();
    $scope.getUserRecent();
  });
