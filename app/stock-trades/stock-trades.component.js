'use strict';

angular
    .module('stockTrades')
    .component('stockTrades', {
        templateUrl: 'stock-trades/stock-trades.template.html',
        controller: [
            '$scope',
            'tradesService',
            'tradesStatsService',
            function($scope, tradesService, tradesStatsService) {
                var ctrl = this;

                this.trades = [];

                tradesStatsService.get({
                    symbol: ctrl.symbol,
                    startDate: moment(),
                    endDate: moment()
                }, function(tradesStats) {
                    $scope.$broadcast('tradeLevelsUpdate', tradesStats);
                });

                tradesService.get({
                    symbol: ctrl.symbol,
                    fromDate: moment(),
                    endDate: moment(),
                    limit: 0
                }, function(trades) {
                    ctrl.trades = trades;
                });

                this.$postLink = function() {
                    $scope.$broadcast('levelFrequenciesUpdate', {
                        plot: function(domElement) {
                            var x = [],
                                y = [];


                            for (var i = 66; i <= 79; i++) {
                                x[i] = '' + i;
                                y[i] = Math.random();
                            }

                            var layout = {
                                paper_bgcolor: 'rgba(0,0,0,0)',
                                plot_bgcolor: 'rgba(0,0,0,0)',
                                margin: {
                                    l: 10,
                                    r: 10,
                                    b: 30,
                                    t: 10,
                                    pad: 0
                                },
                                height: 300
                            }

                            var data = [{
                                x: x,
                                y: y,
                                type: 'bar'
                            }];

                            Plotly.newPlot(domElement, data, layout);
                        }
                    });
                };
            }
        ],
        bindings: {
            symbol: '<'
        }
    });