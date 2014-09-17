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

    var categories = ['0-4', '5-9', '10-14', '15-19',
        '20-24', '25-29', '30-34', '35-39', '40-44',
        '45-49', '50-54', '55-59', '60-64', '65-69',
        '70-74', '75-79', '80-84', '85-89', '90-94',
        '95-99', '100 + '];

    $scope.chartConfig = {

        options: {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Population pyramid for Germany, midyear 2010'
            },
            subtitle: {
                text: 'Source: www.census.gov'
            },
            xAxis: [
                {
                    categories: categories,
                    reversed: false,
                    labels: {
                        step: 1
                    }
                },
                { // mirror axis on right side
                    opposite: true,
                    reversed: false,
                    categories: categories,
                    linkedTo: 0,
                    labels: {
                        step: 1
                    }
                }
            ],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return (Math.abs(this.value) / 1000000) + 'M';
                    }
                },
                min: -4000000,
                max: 4000000
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            }
        },


        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                    'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
            }
        },

        series: [
            {
                name: 'Male',
                data: [-1746181, -1884428, -2089758, -2222362, -2537431, -2507081, -2443179,
                    -2664537, -3556505, -3680231, -3143062, -2721122, -2229181, -2227768,
                    -2176300, -1329968, -836804, -354784, -90569, -28367, -3878]
            },
            {
                name: 'Female',
                data: [1656154, 1787564, 1981671, 2108575, 2403438, 2366003, 2301402, 2519874,
                    3360596, 3493473, 3050775, 2759560, 2304444, 2426504, 2568938, 1785638,
                    1447162, 1005011, 330870, 130632, 21208]
            }
        ]
    };
  });
