'use strict';

angular
    .module('orderBook')
    .component('orderBook', {
        templateUrl: 'components/order-book/order-book.template.html',
        controller: [
            '$scope',
            'utils',
            'orderBookService',
            function ($scope, utils, orderBookService) {
                let $ctrl = this;

                $ctrl.$onInit = function () {
                    $ctrl.levels = [];
                    for (let i = 1; i <= 10; i++) {
                        $ctrl.levels.push(new utils.DropdownItem('Level ' + i, i));
                    }

                    $scope.$broadcast('orderBookLoading');
                    orderBookService.getRecent({
                        symbol: $ctrl.stock.getSymbol(),
                        amount: 1
                    }, (orderbooks) => {
                        $scope.$broadcast('orderBookLoaded');
                        $ctrl.stock.setOrderBooksData(orderbooks);
                    });
                };

                $ctrl.$postLink = function () {
                    $ctrl.selectedLevel = $ctrl.levels[0];
                    $scope.$applyAsync(function () {
                        $('select').material_select();
                    });
                }
            }
        ],
        bindings: {
            stock: '<'
        }
    });
