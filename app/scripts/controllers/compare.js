'use strict';

/**
 * @ngdoc function
 * @name feedScoreApp.controller:CompareCtrl
 * @description
 * # CompareCtrl
 * Controller of the feedScoreApp
 */
angular.module('feedScoreApp')
  .controller('CompareCtrl', function ($scope, $state, FeedService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.searchTerm1 = '';
    $scope.hasSearched1 = false;
    $scope.hasSelected1 = false;

    $scope.searchForUser1 = function(){
        FeedService.searchForUser($scope.searchTerm1).then( function (res) {
            $scope.searchResults1 = res.data;
            $scope.hasSearched1 = true;
        });
    };

    $scope.searchTerm2 = '';
    $scope.hasSearched2 = false;
    $scope.hasSelected2 = false;

    $scope.searchForUser2 = function(){
        FeedService.searchForUser($scope.searchTerm2).then( function (res) {
            $scope.searchResults2 = res.data;
            $scope.hasSearched2 = true;
        });
    };

    $scope.getUser1 = function(userId){
        FeedService.getUser(userId).then(function(res){
            $scope.selfUser1 = res.data;
        });
    };

    $scope.getUserRecent1 = function(userId){
        $scope.promise = FeedService.getUserMediaRecent(userId).then(function(res){
            $scope.selfMediaRecent1 = res.data;
            console.log($scope.selfMediaRecent1);
            $scope.selfMediaRecentArray1 = res.data.mediaArray;
        });
    };

    $scope.getAllInfo1 = function(userId){
        $scope.getUser1(userId);
        $scope.getUserRecent1(userId);
    };

    $scope.getUser2 = function(userId){
        FeedService.getUser(userId).then(function(res){
            $scope.selfUser2 = res.data;
        });
    };

    $scope.getUserRecent2 = function(userId){
        $scope.promise = FeedService.getUserMediaRecent(userId).then(function(res){
            $scope.selfMediaRecent2 = res.data;
            $scope.selfMediaRecentArray2 = res.data.mediaArray;
        });
    };
  });
