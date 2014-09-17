'use strict';

/**
 * @ngdoc function
 * @name feedScoreApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the feedScoreApp
 */
angular.module('feedScoreApp')
  .controller('UserCtrl', function ($scope, FeedService, $stateParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.userId = $stateParams.user_id;

    $scope.getUser = function(){
        FeedService.getUser($scope.userId).then(function(res){
            $scope.selfUser = res.data;
        });
    };

    $scope.getUserRecent = function(){
        $scope.promise = FeedService.getUserMediaRecent($scope.userId).then(function(res){
            if(res.data.error_message) {
                $scope.errorMessage = 'This user has chosen to withhold his/her Instagram info from you.';
            } else {
                $scope.selfMediaRecent = res.data;
                $scope.selfMediaRecentArray = res.data.mediaArray;

                $scope.likesPerFilterChartData = [];
                $scope.commentsPerFilterChartData = [];
                $scope.timesUsedPerFilterChartData = [];
                for(var key in $scope.selfMediaRecent.stats.filterStats){
                    if ($scope.selfMediaRecent.stats.filterStats.hasOwnProperty(key)){
                        $scope.likesPerFilterChartData.push(
                            {
                                name: key,
                                y: Math.round($scope.selfMediaRecent.stats.filterStats[key].likeScorePerTimesUsed*10)/10,
                                dataLabels: {
                                    enabled: true
                                }

                            }
                        );
                        $scope.commentsPerFilterChartData.push(
                            {
                                name: key,
                                y: Math.round($scope.selfMediaRecent.stats.filterStats[key].commentScorePerTimesUsed*10)/10,
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        );
                        $scope.timesUsedPerFilterChartData.push(
                            {
                                name: key,
                                y: $scope.selfMediaRecent.stats.filterStats[key].timesUsed,
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        );

                    }
                }

                var chartTextStyle = {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    fontWeight: 'bolder',
                    color: 'black'
                };

                $scope.chartConfig1 = {

                    options: {
                        chart: {
                            type: 'column',
                            animation: {
                                duration: 2000
                            }
                        },
                        title: {
                            text: 'Like/Comments Per Times Used for Recently Used Filters'
                        },
                        tooltip: {
                            pointFormat: '{series.name}: {point.y:.2f}'
                        },
                        xAxis: {
                            title: {
                                text: 'Filter',
                                style: chartTextStyle
                            },
                            type: 'category',
                            labels: {
                                rotation: -45,
                                style: chartTextStyle
                            }
                        },

                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Likes/Comments per Filter',
                                style: chartTextStyle
                            }
                        },
                        legend: {
                            align: 'right',
                            x: -70,
                            verticalAlign: 'top',
                            y: 20,
                            floating: true,
                            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                            borderColor: '#CCC',
                            borderWidth: 1,
                            shadow: false
                        }
                    },

                    series: [{
                        name: 'Likes per Times Used',
                        data: $scope.likesPerFilterChartData
                    },{
                        name: 'Comments per Times Used',
                        data: $scope.commentsPerFilterChartData
                    }]
                };

                $scope.chartConfig2 = {

                    options: {
                        chart: {
                            type: 'pie',
                            plotBackgroundColor: null,
                            plotBorderWidth: 0,
                            plotShadow: false,
                            animation: {
                                duration: 900
                            }
                        },
                        title: {
                            text: 'Amount of Times Used per Filter'
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                dataLabels: {
                                    enabled: true,
                                    distance: -50,
                                    style: {
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textShadow: '0px 1px 2px black'
                                    }
                                },
                                startAngle: -90,
                                endAngle: 90,
                                center: ['50%', '75%']
                            }
                        }

                    },

                    series: [{
                        type: 'pie',
                        name: 'Times Used',
                        innerSize: '30%',
                        data: $scope.timesUsedPerFilterChartData
                    }]
                };
            }


        });
    };

    $scope.getUser();
    $scope.getUserRecent();
  });
