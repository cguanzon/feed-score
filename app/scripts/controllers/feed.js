'use strict';

angular.module('feedScoreApp')
  .controller('FeedCtrl', function ($state, $scope, $window, FeedService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.getSelfFeed = function(){
        $scope.promise = FeedService.getSelfFeed().then(function(res){
            $scope.selfFeed = res.data;
        });
    };

    $scope.goToUser = function(userId){
        $state.go('base.user', { user_id: userId } );
    };

    $scope.getSelfFeed();


  });


