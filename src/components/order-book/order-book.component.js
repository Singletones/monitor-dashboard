'use strict';

angular
    .module('orderBook')
    .component('orderBook', {
        templateUrl: 'components/order-book/order-book.template.html',
        controller: [
            '$scope',
            'utils',
            'orderBookService',
            'orderBookRefreshRate',
            function ($scope, utils, orderBookService, refreshRate) {
                let $ctrl = this;

                $ctrl.$onInit = function () {
                    $ctrl.levels = [];
                    for (let i = 1; i <= 10; i++) {
                        $ctrl.levels.push(new utils.DropdownItem('Level ' + i, i));
                    }
                    $ctrl.selectedLevel = $ctrl.levels[0];
                    $scope.$watch('$ctrl.selectedLevel', $ctrl.plotRatioOverTime);

                    new utils.AutoRefresher(function () {
                        $scope.$broadcast('orderBook_loading');
                        orderBookService.getRecent({
                            symbol: $ctrl.stock.getSymbol(),
                            amount: 1
                            // from_date: moment.utc().subtract(4, 'days'),
                            // to_date: moment.utc()
                        }, (orderBooks) => {
                            $scope.$broadcast('orderBook_loaded');
                            $ctrl.stock.updateOrderBooks(orderBooks);
                            $ctrl.plotRatioOverTime();
                        });
                    }, refreshRate);
                };

                $ctrl.$postLink = function () {
                    $scope.$applyAsync(function () {
                        $('select').material_select();
                    });
                };

                $ctrl.plotRatioOverTime = function () {
                    let graphic = $ctrl.stock.getOrderBooksRatioOverTime($ctrl.selectedLevel.value);
                    $scope.$broadcast('ratioOverTime_plot', {
                        plot: function (domElement) {
                            let trace1 = {
                                x: [],
                                y: [],
                                type: 'scatter'
                            };

                            for (let [x, y] of graphic) {
                                trace1.x.push(x.format('YYYY-MM-DD HH:mm:ss'));
                                trace1.y.push(y);
                            }

                            Plotly.newPlot(domElement, [trace1]);
                        }
                    });
                };
            }
        ],
        bindings: {
            stock: '<'
        }
    });
