'use strict';

angular
    .module('stockPanel')
    .component('stockPanel', {
        templateUrl: 'stock-panel/stock-panel.template.html',
        controller: ['candlesService', '$scope', function(candlesService, $scope) {

            var ctrl = this;

            ctrl.lookbacks = [
                { label: '1 day (lookback)', value: 1 },
                { label: '2 days (lookback)', value: 2 },
                { label: '3 days (lookback)', value: 3 },
                { label: '4 days (lookback)', value: 4 },
                { label: '5 days (lookback)', value: 5 },
                { label: '6 days (lookback)', value: 6 },
                { label: '7 days (lookback)', value: 7 },
                { label: '8 days (lookback)', value: 8 }
            ];
            ctrl.resolutions = [
                { label: '30 min candle', value: '30 min' },
                { label: '1 hour candle', value: '1 hour' },
                { label: '5 hours candle', value: '5 hours' },
                { label: '10 hours candle', value: '10 hours' },
                { label: '1 day candle', value: '1 day' },
                { label: '5 day candle', value: '5 day' },
                { label: '10 day candle', value: '10 day' }
            ];

            ctrl.selectedLookback = ctrl.lookbacks[3];
            ctrl.selectedResolution = ctrl.resolutions[2];
            $scope.$watch('$ctrl.selectedLookback', function() {
                ctrl.loadData();
            });
            $scope.$watch('$ctrl.selectedResolution', function() {
                ctrl.loadData();
            });

            ctrl.loadData = function() {
                candlesService.get({
                    symbol: ctrl.stock.getSymbol(),
                    candleType: ctrl.selectedResolution.value,
                    fromDate: moment().subtract(ctrl.selectedLookback.value, 'days'),
                    endDate: moment()
                }, function(candleChart) {
                    ctrl.stock.updateLatestTimestamp();

                    $scope.$emit('replot', candleChart);
                });
            };

            ctrl.print = function() {

                // console.dir(ctrl);
            }
        }],
        bindings: {
            stock: '<'
        }
    });