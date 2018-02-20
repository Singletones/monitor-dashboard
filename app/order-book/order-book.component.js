'use strict';

angular
    .module('orderBook')
    .component('orderBook', {
        templateUrl: 'order-book/order-book.template.html',
        controller: ['orderBookService', 'tradesService', function (orderBookService, tradesService) {
            var ctrl = this;

            orderBookService.get({
                symbol: ctrl.symbol
            }, function (data) {
                ctrl.data = data;
            });

            tradesService.get({
                symbol: ctrl.symbol
            }, function (data) {
                ctrl.recentTrade = data[0];
            });
        }],
        bindings: {
            symbol: '<'
        }
    });
