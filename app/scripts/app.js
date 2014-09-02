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
        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider
            .state('feed', {
                url: '/feed',
                templateUrl: '/views/feed.html',
                controller: 'FeedCtrl'
            })

            .state('dashboard', {
                url: '/dashboard',
                templateUrl: '/views/dashboard.html',
                controller: 'DashboardCtrl'
            });
    });