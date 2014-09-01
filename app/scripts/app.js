'use strict';

/**
 * @ngdoc overview
 * @name feedScoreApp
 * @description
 * # feedScoreApp
 *
 * Main module of the application.
 */
angular
  .module('feedScoreApp', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/feed');

        $stateProvider
            .state('feed', {
                url: '/feed',
                templateUrl: '/views/feed.html',
                controller: 'FeedCtrl'
            });
    });