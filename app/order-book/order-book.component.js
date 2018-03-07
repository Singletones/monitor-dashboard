'use strict';

angular
    .module('orderBook')
    .component('orderBook', {
        templateUrl: 'order-book/order-book.template.html',
        controller: ['orderBookService', 'tradesService', function (orderBookService, tradesService) {
            var $ctrl = this;

            orderBookService.getRecent({
                symbol: $ctrl.symbol,
                amount: 1
            }, function (orderbooks) {
                $ctrl.orderbook = orderbooks[0];
            });

            tradesService.getRecent({
                symbol: $ctrl.symbol,
                amount: 1
            }, function (trades) {
                $ctrl.recentTrade = trades[0];
            });
        }],
        bindings: {
            symbol: '<'
        }
    });
