'use strict';

angular
    .module('stockTrades')
    .component('stockTrades', {
        templateUrl: 'components/stock-trades/stock-trades.template.html',
        controller: [
            '$scope',
            'LevelFrequenciesModel',
            'TradesStatsModel',
            'tradesService',
            'utils',
            function($scope, LevelFrequencies, TradesStats, tradesService, utils) {
                var $ctrl = this;

                $ctrl.$onInit = function () {

                    $ctrl.trades = [];
                    $ctrl.lookbacks = [
                        new utils.DropdownItem('recent 10', 10),
                        new utils.DropdownItem('recent 20', 20),
                        new utils.DropdownItem('recent 30', 30)
                    ];
                    $scope.$watch('$ctrl.selectedLookback', function (newVal) {
                        $scope.$broadcast('tradesLoading');
                        $scope.$broadcast('tradeLevelsLoading');
                        $scope.$broadcast('levelFrequenciesLoading');
                        tradesService.getRecent({
                            symbol: $ctrl.stock.getSymbol(),
                            amount: newVal.value
                        }, function (trades) {
                            $scope.$broadcast('tradesLoaded');
                            $scope.$broadcast('tradeLevelsLoaded');
                            $scope.$broadcast('levelFrequenciesLoaded');
                            $ctrl.stock.setTradesData(trades);
                            $scope.$broadcast('tradeLevelsUpdate', $ctrl.stock.getTradesStats());
                            $scope.$broadcast('levelFrequenciesUpdate', $ctrl.stock.getLevelFrequencies());
                        });
                    });
                };

                $ctrl.colorClass = function(trade, index){
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
                    $ctrl.selectedLookback = $ctrl.lookbacks[0];
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
