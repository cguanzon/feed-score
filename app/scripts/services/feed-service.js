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

        this.getUser = function(){
            return $http({method: 'GET', url: 'http://localhost:8000/user'});
        };

        this.getUserMediaRecent = function(){
            return $http({method: 'GET', url: 'http://localhost:8000/user_media_recent'});
        };

        this.getSelfFeed = function(){
            return $http({method: 'GET', url: 'http://localhost:8000/user_self_feed'});
        };
  });











