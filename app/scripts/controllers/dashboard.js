'use strict';

angular.module('feedScoreApp')
  .controller('DashboardCtrl', function ($scope, FeedService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


    $scope.getSelfUser = function(){
        FeedService.getUser('self').then(function(res){
            $scope.selfUser = res.data;
        });
    };

    $scope.getUserRecent = function(){
        $scope.promise = FeedService.getUserMediaRecent('self').then(function(res){
            $scope.selfMediaRecent = res.data;
            $scope.selfMediaRecentArray = res.data.mediaArray;

            $scope.likesPerFilterChartData = [];
            $scope.commentsPerFilterChartData = [];
            for(var key in $scope.selfMediaRecent.stats.filterStats){
                if ($scope.selfMediaRecent.stats.filterStats.hasOwnProperty(key)){
                    $scope.likesPerFilterChartData.push(
                        {
                            name: key,
                            y: $scope.selfMediaRecent.stats.filterStats[key].likeScorePerTimesUsed,
                            dataLabels: {
                                enabled: true
                            }

                        }
                    );
                    $scope.commentsPerFilterChartData.push(
                        {
                            name: key,
                            y: $scope.selfMediaRecent.stats.filterStats[key].commentScorePerTimesUsed,
                            dataLabels: {
                                enabled: true
                            }
                        }
                    )
                }
            }

            var chartTextStyle = {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                fontWeight: 'bolder',
                color: 'black'
            }

            $scope.chartConfig1 = {

                options: {
                    chart: {
                        type: 'column'
                    }
                },
                title: {
                    text: 'Like/Comments Per Times Used for Recently Used Filters'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
                },
                series: [{
                    name: 'Likes per Times Used',
                    data: $scope.likesPerFilterChartData
                },{
                    name: 'Comments per Times Used',
                    data: $scope.commentsPerFilterChartData
                }]
            };
        });
    };

    $scope.getSelfUser();
    $scope.getUserRecent();



  });
