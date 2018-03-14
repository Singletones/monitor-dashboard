'use strict';

angular
    .module('stockTrades')
    .component('stockTrades', {
        templateUrl: 'stock-trades/stock-trades.template.html',
        controller: [
            '$scope',
            'LevelFrequenciesModel',
            'tradesService',
            'tradesStatsService',
            function($scope, LevelFrequencies, tradesService, tradesStatsService) {
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
                        $scope.$broadcast('levelFrequenciesLoading');
                        tradesService.getRecent({
                            symbol: $ctrl.symbol,
                            amount: newVal.value
                        }, function (trades) {
                            $scope.$broadcast('tradesLoaded');
                            $scope.$broadcast('levelFrequenciesLoaded');
                            $ctrl.trades = trades;
                            $scope.$broadcast('levelFrequenciesUpdate', new LevelFrequencies(trades));
                        });
                    });

                    $scope.$broadcast('tradeLevelsLoading');
                    tradesStatsService.getTradeLevels({
                        symbol: $ctrl.symbol,
                        from_date: moment.utc().subtract(1, 'day'),
                        to_date: moment.utc()
                    }, function(tradesStats) {
                        $scope.$broadcast('tradeLevelsLoaded');
                        $scope.$broadcast('tradeLevelsUpdate', tradesStats);
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
