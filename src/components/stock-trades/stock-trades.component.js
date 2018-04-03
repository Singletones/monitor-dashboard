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

                $ctrl.$onInit = function () {
                    $ctrl.trades = [];
                    $ctrl.lookbacks = [
                        new utils.DropdownItem('recent 10', 10),
                        new utils.DropdownItem('recent 20', 20),
                        new utils.DropdownItem('recent 30', 30)
                    ];
                    $ctrl.selectedLookback = $ctrl.lookbacks[0];

                    let autoRefresher = new utils.AutoRefresher(function () {
                        $scope.$broadcast('trades_loading');
                        $scope.$broadcast('tradeLevels_loading');
                        $scope.$broadcast('levelFrequencies_loading');
                        tradesService.getRecent({
                            symbol: $ctrl.stock.getSymbol(),
                            amount: $ctrl.selectedLookback.value
                        }, function (trades) {
                            $scope.$broadcast('trades_loaded');
                            $scope.$broadcast('tradeLevels_loaded');
                            $scope.$broadcast('levelFrequencies_loaded');
                            $ctrl.stock.setTradesData(trades);
                            $scope.$broadcast('tradeLevels_plot', $ctrl.stock.getTradesStats());
                            $scope.$broadcast('levelFrequencies_plot', $ctrl.stock.getLevelFrequencies());
                        });
                    }, refreshRate);

                    $scope.$watch('$ctrl.selectedLookback', _ => autoRefresher.refresh());
                };

                $ctrl.tradeColor = function(trade, index) {
                    let prevTrade = $ctrl.stock.getTrades()[index-1];
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
            }
        ],
        bindings: {
            stock: '<'
        }
    });
