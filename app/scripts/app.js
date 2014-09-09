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
  .module('feedScoreApp', ['ui.router', 'cgBusy', 'highcharts-ng']).config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/views/login.html',
                controller: 'LoginCtrl'
            })

            .state('base', {
                url: '',
                abstract: true,
                templateUrl: '/views/base.html',
                controller: 'BaseCtrl'
            })

            .state('base.feed', {
                url: '/feed',
                templateUrl: '/views/feed.html',
                controller: 'FeedCtrl'
            })

            .state('base.dashboard', {
                url: '/dashboard',
                templateUrl: '/views/dashboard.html',
                controller: 'DashboardCtrl'
            })

            .state('base.user', {
                url: '/user/:user_id',
                templateUrl: '/views/user.html',
                controller: 'UserCtrl'

            })

            .state('base.search', {
                url: '/search',
                templateUrl: '/views/search.html',
                controller: 'SearchCtrl'
            });
    });