'use strict';

angular
    .module('stockPanel')
    .component('stockPanel', {
        templateUrl: 'stock-panel/stock-panel.template.html',
        controller: ['candlesService', function (candlesService) {
            var ctrl = this;

            ctrl.resolution = {
                candleType: '1 min',
                fromDate: moment('02.03.2017', 'MM.DD.YYYY'),
                endDate: moment('02.15.2017', 'MM.DD.YYYY')
            };

            ctrl.loadData = function (callback) {
                candlesService.get({
                    symbol: ctrl.stock.getSymbol(),
                    candleType: ctrl.resolution.candleType,
                    fromDate: ctrl.resolution.fromDate,
                    endDate: ctrl.resolution.endDate
                }, function (candleChart) {
                    callback(candleChart);
                });
            };

            ctrl.print = function () {
                console.dir(ctrl.resolution.endDate);
            }
        }],
        bindings: {
            stock: '<'
        }
    });
