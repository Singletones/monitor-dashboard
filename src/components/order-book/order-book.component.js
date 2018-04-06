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
                            $ctrl.colorPrices();
                            $ctrl.plotRatioOverTime();
                        });
                    }, refreshRate);
                };

                function shuffle(array) {
                    for (let i = array.length - 1; i > 0; i--) {
                        let j = Math.floor(Math.random() * (i + 1));
                        let tmp = array[i];
                        array[i] = array[j];
                        array[j] = tmp;
                    }
                    return array;
                }

                let pricesColors = {},
                    colorObj = {};

                $ctrl.colorPrices = function(){
                    let colors = shuffle(["#CCD34F","#03a9f4","#c41116","#0fa200","#0033CC","#CC0099","#FC9516",
                        "#2D5B71","#712D60","#37898A","#A7A88E","#908EBC","#C194A3","#86711C","#3A1C86","#861C1C",
                        "#64C3BE","#7C64C3","#29BC5C","#650A44"]);

                    let trades = $ctrl.stock.getRecentOrderBook().getAsk().concat($ctrl.stock.getRecentOrderBook().getBid());

                    let index = 0;
                    trades.forEach(function(trade){

                        if (!pricesColors.hasOwnProperty(trade.Price)){
                            pricesColors[trade.Price] = colors[index];
                            index++;
                        }
                    });
                    return pricesColors;
                };

                $ctrl.askPriceColor = function(index) {
                    colorObj = {'color': pricesColors[$ctrl.stock.getRecentOrderBook().getAsk()[index].Price], 'font-weight': 'bold'};
                    return colorObj;
                };

                $ctrl.bidPriceColor = function(index) {
                    colorObj = {'color': pricesColors[$ctrl.stock.getRecentOrderBook().getBid()[index].Price], 'font-weight': 'bold'};
                    return colorObj;
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
