'use strict';

angular
    .module('stockTrades')
    .component('stockTrades', {
        templateUrl: 'stock-trades.template.html',
        controller: [
            '$scope',
            'TradesStatsModel',
            'tradesService',
            'tradesRefreshRate',
            'utils',
            function($scope, TradesStats, tradesService, refreshRate, utils) {
                let $ctrl = this;

                $ctrl.$onInit = function () {
                    $ctrl.lookbacks = [
                        new utils.DropdownItem('recent 10', 10),
                        new utils.DropdownItem('recent 20', 20),
                        new utils.DropdownItem('recent 30', 30)
                    ];
                    $ctrl.selectedLookback = $ctrl.lookbacks[0];

                    let autoRefresher = new utils.AutoRefresher(function (manual) {
                        if (manual === true) {
                            $scope.$broadcast('trades_loading');
                            $scope.$broadcast('tradeLevels_loading');
                            $scope.$broadcast('levelFrequencies_loading');
                        }
                        tradesService.getRecent({
                            symbol: $ctrl.stock.getSymbol(),
                            amount: $ctrl.selectedLookback.value
                        }, function (trades) {
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

                $ctrl.getRecentTrades = function () {
                    return $ctrl.stock.getRecentTrades($ctrl.selectedLookback.value);
                };

                $ctrl.computeTimeIntervalBtwTrades = function () {
                    let oldestTrade = $ctrl.getRecentTrades()[0].getTimestamp(),
                        recentTrade = $ctrl.stock.getRecentTrade().getTimestamp();
                    let interval = moment.duration(recentTrade.diff(oldestTrade));
                    let format = interval.asMinutes() < 1 ? 's [seconds]' : 'h [hours] m.ss [minutes]';
                    return $ctrl.timeIntervalBtwTrades = interval.format(format);
                };

                $ctrl.tradeColor = function(trade, index) {
                    let prevTrade = $ctrl.getRecentTrades()[index-1];
                    if (prevTrade) {
                        let prevPrice = prevTrade.getPrice(),
                            price = trade.getPrice();
                        if (price > prevPrice) {
                            return "higher";
                        }
                        else if (price < prevPrice) {
                            return "lower";
                        }
                        return "similar";
                    }
                    return "";
                };

                $ctrl.$postLink = function () {
                    $scope.$applyAsync(function () {
                        $('select').material_select();
                    });
                };

                $ctrl.plotTotalTrades = function () {
                    let trades = $ctrl.stock.getTrades();
                    let t0 = trades[0].getTimestamp(),
                        t1 = trades[trades.length - 1].getTimestamp();
                    let graphic = new Array(Math.floor(t1.diff(t0)/30000) + 1);
                    for (let i = 0; i < graphic.length; i++) {
                        graphic[i] = {
                            x: moment.utc(t0).add(30*i, 'seconds').format('YYYY-MM-DD HH:mm:ss'),
                            trades: []
                        }
                    }
                    for (let trade of trades) {
                        graphic[Math.floor(trade.getTimestamp().diff(t0)/30000)].trades.push(trade);
                    }
                    
                    $scope.$broadcast('bidNAskProportion_plot', {
                        graphic,
                        plot: function (domElement) {
                            let data = [];
                            for (let trace of new TradesStats().labels()) {
                                data.push({
                                    x: [],
                                    y: [],
                                    type: 'scatter',
                                    name: trace,
                                    connectgaps: true
                                })
                            }

                            for (let {x, trades} of this.graphic) {
                                let stats = new TradesStats().fromTrades(trades);
                                stats.values().forEach((value, i) => {
                                    data[i].x.push(x);
                                    data[i].y.push(value/stats.getTotal());
                                });
                            }

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

                            Plotly.newPlot(domElement, data, layout);
                        }
                    });

                    $scope.$broadcast('totalTrades_plot', {
                        graphic,
                        plot: function (domElement) {
                            let trace1 = {
                                x: [],
                                y: [],
                                type: 'bar'
                            };

                            for (let {x, trades} of this.graphic) {
                                trace1.x.push(x);
                                trace1.y.push(trades.length);
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