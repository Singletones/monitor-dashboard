'use strict';

angular
    .module('stockTrades')
    .component('stockTrades', {
        templateUrl: 'stock-trades/stock-trades.template.html',
        controller: [
            '$scope',
            'LevelFrequenciesModel',
            'TradesStatsModel',
            'tradesService',
            'tradesStatsService',
            function($scope, LevelFrequencies, TradesStats, tradesService, tradesStatsService) {
                var $ctrl = this;

                $ctrl.$onInit = function () {

                    $ctrl.trades = [];
                    $ctrl.lookbacks = [
                        { label: 'recent 10', value: 10},
                        { label: 'recent 20', value: 20},
                        { label: 'recent 30', value: 30}
                    ];
                    $scope.$watch('$ctrl.selectedLookback', function (newVal) {
                        $scope.$broadcast('tradesLoading');
                        $scope.$broadcast('tradeLevelsLoading');
                        $scope.$broadcast('levelFrequenciesLoading');
                        tradesService.getRecent({
                            symbol: $ctrl.symbol,
                            amount: newVal.value
                        }, function (trades) {
                            $scope.$broadcast('tradesLoaded');
                            $scope.$broadcast('tradeLevelsLoaded');
                            $scope.$broadcast('levelFrequenciesLoaded');
                            $ctrl.trades = trades;
                            $scope.$broadcast('tradeLevelsUpdate', new TradesStats().fromTrades(trades));
                            $scope.$broadcast('levelFrequenciesUpdate', new LevelFrequencies(trades));
                        });
                    });
                };

                this.$postLink = function() {
                    $ctrl.selectedLookback = $ctrl.lookbacks[0];
                    $scope.$applyAsync(function () {
                        $('select').material_select();
                    });
                };
            }
        ],
        bindings: {
            symbol: '<'
        }
    });
