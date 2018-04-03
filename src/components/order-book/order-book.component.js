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
                        $ctrl.colorPrices();

                    });
                };

                function shuffle(array) {
                    for (let i = array.length - 1; i > 0; i--) {
                        let j = Math.floor(Math.random() * (i + 1));
                        let tmp = array[i];
                        array[i] = array[j];
                        array[j] = tmp;
                    }
                    return array;
                };

                var pricesColors = {},
                    colorObj = {};

                $ctrl.colorPrices = function(){
                    let colors = shuffle(["#CCD34F","#03a9f4","#c41116","#0fa200","#0033CC","#CC0099","#FC9516",
                        "#2D5B71","#712D60","#37898A","#BABC8E","#908EBC","#C194A3","#86711C","#3A1C86","#861C1C",
                        "#64C3BE","#7C64C3","#29BC5C","#650A44"]);

                    let trades = $ctrl.stock.getRecentOrderBook().getAsk().concat($ctrl.stock.getRecentOrderBook().getBid());

                    let index = 0;
                    trades.forEach(function(trade){

                        if (pricesColors.hasOwnProperty(trade.Price)){
                            // great!;
                        }
                        else {
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
