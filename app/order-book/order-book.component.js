'use strict';

angular
    .module('orderBook')
    .component('orderBook', {
        templateUrl: 'order-book/order-book.template.html',
        controller: ['orderBookService', 'tradesService', function (orderBookService, tradesService) {
            var ctrl = this;

            orderBookService.get({
                symbol: ctrl.symbol,
                from_date: moment('2018-2-13', 'YYYY-MM-DD'),
                to_date: moment('2018-2-20', 'YYYY-MM-DD')
            }, function (data) {
                ctrl.data = data;
            });

            tradesService.get({
                symbol: ctrl.symbol,
                from_date: moment(),
                to_date: moment(),
                limit: 0
            }, function (trades) {
                ctrl.recentTrade = trades[0];
            });
        }],
        bindings: {
            symbol: '<'
        }
    });
