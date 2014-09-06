'use strict';

/**
 * @ngdoc service
 * @name feedScoreApp.FeedService
 * @description
 * # FeedService
 * Service in the feedScoreApp.
 */
angular.module('feedScoreApp')
  .service('FeedService', function FeedService($http) {

        var authorizationUrl = 'http://localhost:8000/authorize_user';

        this.getAuthorizationUrl = function(){
          return authorizationUrl;
        };

        this.getUser = function(userId){
            return $http({method: 'GET', url: 'http://localhost:8000/user?user_id='+userId});
        };

        this.getUserMediaRecent = function(userId){
            return $http({method: 'GET', url: 'http://localhost:8000/user_media_recent?user_id='+userId});
        };

        this.getSelfFeed = function(){
            return $http({method: 'GET', url: 'http://localhost:8000/user_self_feed'});
        };
  });











