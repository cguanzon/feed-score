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

        var authorizationUrl = 'https://api.instagram.com/oauth/authorize/?client_id=be573c8873f5496caab40ab22f60b895&redirect_uri=http://localhost:9000&response_type=token';
        this.fetchPopular = function(callback){

            var endPoint = 'https://api.instagram.com/v1/media/popular?client_id=be573c8873f5496caab40ab22f60b895&callback=JSON_CALLBACK';

            $http.jsonp(endPoint).success(function(response){
                callback(response.data);
            });
        };

        this.getAuthorizationUrl = function(){
          return authorizationUrl;
        };
  });











