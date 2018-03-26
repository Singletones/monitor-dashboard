'use strict';

angular
    .module('orderBook')
    .component('orderBook', {
        templateUrl: 'components/order-book/order-book.template.html',
        controller: [
            '$scope',
            'utils',
            'orderBookService',
            'tradesService',
            function ($scope, utils, orderBookService, tradesService) {
                var $ctrl = this;

                $ctrl.$onInit = function () {

                    $ctrl.levels = [];
                    for (var i = 1; i <= 10; i++) {
                        $ctrl.levels.push(new utils.DropdownItem('Level ' + i, i));
                    }

                    $scope.$broadcast('orderBookLoading');
                    orderBookService.getRecent({
                        symbol: $ctrl.stock.getSymbol(),
                        amount: 1
                    }, function (orderbooks) {
                        $scope.$broadcast('orderBookLoaded');
                        $ctrl.stock.setOrderBooksData(orderbooks);
                    });

                    // $scope.$broadcast('recentTradeLoading');
                    // tradesService.getRecent({
                    //     symbol: $ctrl.stock.getSymbol(),
                    //     amount: 1
                    // }, function (trades) {
                    //     $scope.$broadcast('recentTradeLoaded');
                    //     $ctrl.recentTrade = trades[0];
                    // });

                };

                $ctrl.$postLink = function () {
                    $ctrl.selectedLevel = $ctrl.levels[0];
                    $scope.$applyAsync(function () {
                        $('select').material_select();
                    });
                };
            }
        ],
        bindings: {
            stock: '<'
        }
    });
