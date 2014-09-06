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
                }
            }
            console.log($scope.likesPerFilterChartData);
            $scope.chartConfig = {
                options: {
                    chart: {
                        type: 'pie',
                        plotBackgroundColor: null,
                        plotBorderWidth: 0,
                        plotShadow: false
                    }
                },
                title: {
                    text: 'Filter Stats',
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 25
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
                },
                series: [{
                    type: 'pie',
                    name: 'Likes per Times Used',
                    innerSize: '50%',
                    data: $scope.likesPerFilterChartData
                }]
            };
        });
    };

    $scope.getSelfUser();
    $scope.getUserRecent();



  });
