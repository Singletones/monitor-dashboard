'use strict';

angular
    .module('stockPanelList')
    .component('stockPanelList', {
        templateUrl: 'stock-panel-list.template.html',
        controller: [
            '$scope',
            'StockModel',
            'stocksPerPage',
            function($scope, Stock, stocksPerPage) {
                let $ctrl = this;

                $ctrl.$postLink = function () {
                    if ($(window).width() < 1550 && $(window).width() > 1200) {
                        $('#toggle-input').removeClass('input-field col s3 offset-s4').addClass('input-field col s3 offset-s3');
                        $('#toggle-btn').removeClass('input-field col s1').addClass('input-field col s1');
                    } else if ($(window).width() < 1200 && $(window).width() > 900) {
                        $('#toggle-input').removeClass('input-field col s3 offset-s4').addClass('input-field col s3 offset-s2');
                        $('#toggle-btn').removeClass('input-field col s1').addClass('input-field col s1');
                    } else if ($(window).width() < 900 && $(window).width() > 750) {
                        $('#toggle-input').removeClass('input-field col s3 offset-s4').addClass('input-field col s3 offset-s1');
                        $('#toggle-btn').removeClass('input-field col s1').addClass('input-field col s1');
                    } else if ($(window).width() < 750 && $(window).width() > 600) {
                        $('#toggle-input').removeClass('input-field col s3 offset-s4').addClass('input-field col s6 offset-s2');
                        $('#toggle-btn').removeClass('input-field col s1').addClass('input-field col s4');
                    } else if ($(window).width() < 600 && $(window).width() > 100) {
                        $('#toggle-input').removeClass('input-field col s3 offset-s4').addClass('input-field col s8 offset-s1');
                        $('#toggle-btn').removeClass('input-field col s1').addClass('input-field col s3');
                    }
                };

                $ctrl.$onInit = function () {

                    $ctrl.stocks = $ctrl.stocks || [];
                    $ctrl.currentPage = [];

                    $ctrl.activePage = 0;
                    $ctrl.pagesAmount = 1;

                    $ctrl.updateCurrentPage();

                    $scope.$watch('$ctrl.stocks', $ctrl.updateCurrentPage);
                };


                $ctrl.updateCurrentPage = function() {
                    let frame = $ctrl.activePage * stocksPerPage;
                    $ctrl.currentPage = $ctrl.stocks.slice(frame, frame + stocksPerPage);
                };

                $ctrl.addSymbol = function() {
                    $ctrl.stocks.unshift(new Stock({
                        symbol: $ctrl.newSymbol,
                        market: 'NASDAQ'
                    }));
                    let ratio = $ctrl.stocks.length / stocksPerPage;
                    $ctrl.pagesAmount = Math.floor(ratio);
                    if ($ctrl.pagesAmount < ratio) {
                        $ctrl.pagesAmount += 1;
                    }
                    $ctrl.updateCurrentPage();
                    $ctrl.switchPageTo(0);
                };

                $ctrl.switchPageTo = function(newPage) {
                    if (newPage >= 0 && newPage < $ctrl.pagesAmount) {
                        $ctrl.activePage = newPage;
                        $ctrl.updateCurrentPage();
                    }
                };

                $ctrl.switchPageBy = function(direction) {
                    $ctrl.switchPageTo($ctrl.activePage + direction);
                };

                $ctrl.isActivePage = function(index) {
                    if (index === $ctrl.activePage) {
                        return "active";
                    }
                    return "waves-effect";
                }
            }
        ],
        bindings: {
            stocks: '<',
            immutable: '<'
        }
    });