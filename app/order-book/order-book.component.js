'use strict';

angular
    .module('orderBook')
    .component('orderBook', {
        templateUrl: 'order-book/order-book.template.html',
        controller: [
            '$scope',
            'orderBookService',
            'tradesService',
            function ($scope, orderBookService, tradesService) {
                var $ctrl = this;

                $ctrl.$onInit = function () {

                    $scope.$broadcast('orderBookLoading');
                    orderBookService.getRecent({
                        symbol: $ctrl.symbol,
                        amount: 1
                    }, function (orderbooks) {
                        $scope.$broadcast('orderBookLoaded');
                        $ctrl.orderbook = orderbooks[0];
                    });

                    $scope.$broadcast('recentTradeLoading');
                    tradesService.getRecent({
                        symbol: $ctrl.symbol,
                        amount: 1
                    }, function (trades) {
                        $scope.$broadcast('recentTradeLoaded');
                        $ctrl.recentTrade = trades[0];
                    });

                };
            }
        ],
        bindings: {
            symbol: '<'
        }
    });
