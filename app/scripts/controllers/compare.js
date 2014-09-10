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
    $scope.hasSearchedButNotSelected1 = false;
    $scope.canDisplayUser1 = false;

    $scope.searchForUser1 = function(){
        FeedService.searchForUser($scope.searchTerm1).then( function (res) {
            $scope.searchResults1 = res.data;
            $scope.canDisplayUser1 = false;
            $scope.hasSearchedButNotSelected1 = true;
        });
    };

    $scope.getUser1 = function(userId){
        FeedService.getUser(userId).then(function(res){
            $scope.selfUser1 = res.data;
        });
    };

    $scope.getUserRecent1 = function(userId){
        $scope.promise1 = FeedService.getUserMediaRecent(userId).then(function(res){
            $scope.selfMediaRecent1 = res.data;
            console.log($scope.selfMediaRecent1);
            $scope.selfMediaRecentArray1 = res.data.mediaArray;
        });
    };

    $scope.getAllInfo1 = function(userId){
        $scope.hasSearchedButNotSelected1 = false;
        $scope.canDisplayUser1 = true;
        $scope.getUser1(userId);
        $scope.getUserRecent1(userId);
    };

    //$scope items for user2

    $scope.searchTerm2 = '';
    $scope.hasSearchedButNotSelected2 = false;
    $scope.canDisplayUser2 = false;

    $scope.searchForUser2 = function(){
        FeedService.searchForUser($scope.searchTerm2).then( function (res) {
            $scope.searchResults2 = res.data;
            $scope.canDisplayUser2 = false;
            $scope.hasSearchedButNotSelected2 = true;
        });
    };

    $scope.getUser2 = function(userId){
        FeedService.getUser(userId).then(function(res){
            $scope.selfUser2 = res.data;
        });
    };

    $scope.getUserRecent2 = function(userId){
        $scope.promise2 = FeedService.getUserMediaRecent(userId).then(function(res){
            $scope.selfMediaRecent2 = res.data;
            $scope.selfMediaRecentArray2 = res.data.mediaArray;
        });
    };

    $scope.getAllInfo2 = function(userId){
        $scope.hasSearchedButNotSelected2 = false;
        $scope.canDisplayUser2 = true;
        $scope.getUser2(userId);
        $scope.getUserRecent2(userId);
        console.log($scope.selfMediaRecent2);
    };
  });
