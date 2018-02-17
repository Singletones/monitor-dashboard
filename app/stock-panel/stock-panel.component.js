'use strict';

angular
    .module('stockPanel')
    .component('stockPanel', {
        templateUrl: 'stock-panel/stock-panel.template.html',
        controller: ['candlesService', function (candlesService) {
            var ctrl = this;

            ctrl.resolution = {
                candleType: '1 min',
                fromDate: new Date('02.03.2017'),
                endDate: new Date('02.15.2017')
            };

            ctrl.loadData = function (callback) {
                candlesService.get({
                    symbol: ctrl.stock.getSymbol(),
                    candleType: ctrl.resolution.candleType,
                    fromDate: ctrl.resolution.fromDate,
                    endDate: ctrl.resolution.endDate
                }, function (data) {
                    callback(ctrl.resolution, data);
                });
            };

            ctrl.print = function () {
                debugger;
                console.dir(ctrl.resolution.endDate);
            }
        }],
        bindings: {
            stock: '<'
        }
    });
