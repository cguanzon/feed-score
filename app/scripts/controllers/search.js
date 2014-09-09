'use strict';

/**
 * @ngdoc function
 * @name feedScoreApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the feedScoreApp
 */
angular.module('feedScoreApp')
  .controller('SearchCtrl', function ($state,$scope, FeedService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.searchTerm = '';
    $scope.hasSearched = false;

    $scope.searchForUser = function(){
        FeedService.searchForUser($scope.searchTerm).then( function (res) {
            $scope.searchResults = res.data;
            $scope.hasSearched = true;
            console.log($scope.searchResults);
        });
    };

    $scope.goToUser = function(userId){
        $state.go('base.user', { user_id: userId } );
    };
  });
