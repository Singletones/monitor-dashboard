'use strict';

angular
    .module('stockPanelList')
    .component('stockPanelList', {
        templateUrl: 'stock-panel-list/stock-panel-list.template.html',
        controller: [
            '$interval',
            'StockModel',
            'stocksPerPage',
            function($interval, Stock, stocksPerPage) {
                var $ctrl = this;

                $ctrl.$postLink = function toggleClass() {
                    if ($(window).width() < 1550 && $(window).width() > 1200) {
                        $('#toggle-panel').removeClass('time-panel col s3').addClass('time-panel col s4');
                        $('#toggle-input').removeClass('input-field col s3 offset-s4').addClass('input-field col s3 offset-s3');
                        $('#toggle-btn').removeClass('input-field col s1').addClass('input-field col s1');
                    } else if ($(window).width() < 1200 && $(window).width() > 900) {
                        $('#toggle-panel').removeClass('time-panel col s3').addClass('time-panel col s5');
                        $('#toggle-input').removeClass('input-field col s3 offset-s4').addClass('input-field col s3 offset-s2');
                        $('#toggle-btn').removeClass('input-field col s1').addClass('input-field col s1');
                    } else if ($(window).width() < 900 && $(window).width() > 750) {
                        $('#toggle-panel').removeClass('time-panel col s3').addClass('time-panel col s6');
                        $('#toggle-input').removeClass('input-field col s3 offset-s4').addClass('input-field col s3 offset-s1');
                        $('#toggle-btn').removeClass('input-field col s1').addClass('input-field col s1');
                    } else if ($(window).width() < 750 && $(window).width() > 600) {
                        $('#toggle-panel').removeClass('time-panel col s3').addClass('time-panel col s8 offset-s2');
                        $('#toggle-input').removeClass('input-field col s3 offset-s4').addClass('input-field col s6 offset-s2');
                        $('#toggle-btn').removeClass('input-field col s1').addClass('input-field col s4');
                    } else if ($(window).width() < 600 && $(window).width() > 100) {
                        $('#toggle-panel').removeClass('time-panel col s3').addClass('time-panel col s12');
                        $('#toggle-input').removeClass('input-field col s3 offset-s4').addClass('input-field col s8 offset-s1');
                        $('#toggle-btn').removeClass('input-field col s1').addClass('input-field col s3');
                    }
                    // else if ($(window).width() < 800 && $(window).width() > 600) {
                    //     $('#toggle-input').removeClass('input-field col s3 offset-s4').addClass('input-field col s6 offset-s2');
                    //     $('#toggle-btn').removeClass('input-field col s1').addClass('input-field col s4');
                    // } else if ($(window).width() < 600) {
                    //     $('#toggle-input').removeClass('input-field col s3 offset-s4').addClass('input-field col s6 offset-s1');
                    //     $('#toggle-btn').removeClass('input-field col s3').addClass('input-field col s5');
                    // }
                };

                $ctrl.$onInit = function () {

                    $ctrl.stocks = [
                        new Stock('GPRO', 'NASDAQ')
                    ];
                    $ctrl.currentPage = [];

                    $ctrl.activePage = 0;
                    $ctrl.pagesAmount = 1;

                    $ctrl.updateCurrentPage();

                    $ctrl.currentTime = moment.utc();
                    $interval(function () {
                        $ctrl.currentTime = moment.utc();
                    }, 30000);
                };

                $ctrl.getTime = function(timeZone) {
                    return timeZone ? moment.tz($ctrl.currentTime, timeZone) : $ctrl.currentTime;
                };


                $ctrl.updateCurrentPage = function() {
                    var frame = $ctrl.activePage * stocksPerPage;
                    $ctrl.currentPage = $ctrl.stocks.slice(frame, frame + stocksPerPage);
                };

                $ctrl.addSymbol = function() {
                    $ctrl.stocks.unshift(new Stock($ctrl.newSymbol, 'NASDAQ'));
                    var ratio = $ctrl.stocks.length / stocksPerPage;
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

                $ctrl.switchPage = function(direction) {
                    $ctrl.switchPageTo($ctrl.activePage + direction);
                };

                $ctrl.isActivePage = function(index) {
                    if (index === $ctrl.activePage) {
                        return "active";
                    }
                    return "waves-effect";
                }
            }
        ]
    });