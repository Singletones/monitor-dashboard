'use strict';

angular
    .module('orderBook')
    .component('orderBook', {
        templateUrl: 'order-book/order-book.template.html',
        controller: ['orderBookService', 'tradesService', function (orderBookService, tradesService) {
            var ctrl = this;
            orderBookService.get(ctrl.symbol, function (data) {
                ctrl.data = data;
            });
            tradesService.get(ctrl.symbol, function (data) {
                ctrl.recentTrade = data;
            });
        }],
        bindings: {
            symbol: '<'
        }
    });
