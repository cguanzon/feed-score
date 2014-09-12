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
                        type: 'column'
                    }
                },
                title: {
                    text: 'Like Per Times Used for Recently Used Filters'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },

                yAxis: {
                    min: 0,
                    title: {
                        text: 'Population (millions)'
                    }
                },
                series: [{
//                    type: 'pie',
                    name: 'Likes per Times Used',
//                    innerSize: '50%',
                    data: $scope.likesPerFilterChartData
                }]
            };
        });
    };

    $scope.getSelfUser();
    $scope.getUserRecent();



  });
