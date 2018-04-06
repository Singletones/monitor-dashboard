'use strict';

angular
    .module('stockTrades')
    .component('stockTrades', {
            templateUrl: 'components/stock-trades/stock-trades.template.html',
            controller: [
                '$scope',
                'tradesService',
                'tradesRefreshRate',
                'utils',
                function($scope, tradesService, refreshRate, utils) {
                    let $ctrl = this;

                    $ctrl.$onInit = function() {
                        $ctrl.lookbacks = [
                            new utils.DropdownItem('recent 10', 10),
                            new utils.DropdownItem('recent 20', 20),
                            new utils.DropdownItem('recent 30', 30)
                        ];
                        $ctrl.selectedLookback = $ctrl.lookbacks[0];

                        let autoRefresher = new utils.AutoRefresher(function(manual) {
                            if (manual === true) {
                                $scope.$broadcast('trades_loading');
                                $scope.$broadcast('tradeLevels_loading');
                                $scope.$broadcast('levelFrequencies_loading');
                            }
                            tradesService.getRecent({
                                symbol: $ctrl.stock.getSymbol(),
                                amount: $ctrl.selectedLookback.value
                            }, function(trades) {
                                if (manual === true) {
                                    $scope.$broadcast('trades_loaded');
                                    $scope.$broadcast('tradeLevels_loaded');
                                    $scope.$broadcast('levelFrequencies_loaded');
                                }
                                $ctrl.stock.updateTradesData(trades);
                                $ctrl.computeTimeIntervalBtwTrades();
                                $scope.$broadcast('tradeLevels_plot', $ctrl.stock.getTradesStats());
                                $scope.$broadcast('levelFrequencies_plot', $ctrl.stock.getLevelFrequencies());
                                $ctrl.plotTotalTrades();
                            });
                        }, refreshRate);

                        $scope.$watch('$ctrl.selectedLookback', _ => autoRefresher.refresh());
                    };

                    $ctrl.computeTimeIntervalBtwTrades = function() {
                        let oldestTrade = $ctrl.stock.getTrades()[0].getTimestamp(),
                            recentTrade = $ctrl.stock.getRecentTrade().getTimestamp();
                        let interval = moment.duration(recentTrade.diff(oldestTrade));
                        return $ctrl.timeIntervalBtwTrades = interval.format('h [hours] m.ss [minutes]');
                    };

                    $ctrl.tradeColor = function(trade, index) {
                        let prevTrade = $ctrl.stock.getTrades()[index - 1];
                        if (prevTrade) {
                            let prevPrice = prevTrade.getPrice(),
                                price = trade.getPrice();
                            if (price > prevPrice) {
                                return "higher";
                            } else if (price < prevPrice) {
                                return "lower";
                            }
                            return "similar";
                        }
                        return "";
                    };

                    $ctrl.$postLink = function() {
                        $scope.$applyAsync(function() {
                            $('select').material_select();
                        });
                    };

                    $ctrl.plotTotalTrades = function() {
                        let trades = $ctrl.stock.getTrades();
                        let timestamp = trades[0].getTimestamp().add(30, 'seconds');
                        let graphic = trades.reduce((acc, trade) => {
                            if (trade.getTimestamp().isBefore(timestamp)) {
                                acc[acc.length - 1].y++;
                            } else {
                                timestamp.add(30, 'seconds');
                                acc.push({
                                    x: timestamp.format('YYYY-MM-DD HH:mm:ss'),
                                    y: 1
                                });
                            }
                            return acc;
                        }, [{
                            x: timestamp.format('YYYY-MM-DD HH:mm:ss'),
                            y: 0
                        }]);

                        $scope.$broadcast('totalTrades_plot', {
                                graphic,
                                plot: function(domElement) {
                                    let trace1 = {
                                        x: [],
                                        y: [],
                                        type: 'bar'
                                    };

                                    for (let { x, y }
                                        of this.graphic) {
                                        trace1.x.push(x);
                                        trace1.y.push(y);
                                    }

                                    let trace2 = {
                                        x: trace1.x,
                                        y: trace1.y,
                                        type: 'scatter'
                                    };

                                    let layout = {
                                        paper_bgcolor: 'rgba(0,0,0,0)',
                                        plot_bgcolor: 'rgba(0,0,0,0)',
                                        dragmode: 'zoom',
                                        margin: {
                                            r: 0,
                                            t: 10,
                                            b: 35,
                                            l: 20
                                        },
                                        showlegend: false
                                    };

                                        Plotly.newPlot(domElement, [trace1, trace2], layout);
                                    }
                                });
                        };
                    }
                ],
                bindings: {
                    stock: '<'
                }
            });