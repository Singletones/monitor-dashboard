'use strict';

angular
    .module('stockPanelList')
    .component('stockPanelList', {
        templateUrl: 'stock-panel-list/stock-panel-list.template.html',
        controller: ['StockModel', 'stocksPerPage', function(Stock, stocksPerPage) {
            var ctrl = this;
            this.$postLink = function toggleClass() {
                if ($(window).width() < 800 && $(window).width() > 600) {
                    $('#toggle-input').removeClass('input-field col s3 offset-s4').addClass('input-field col s6 offset-s2');
                    $('#toggle-btn').removeClass('input-field col s3').addClass('input-field col s4');
                } else if ($(window).width() < 600) {
                    $('#toggle-input').removeClass('input-field col s3 offset-s4').addClass('input-field col s6 offset-s1');
                    $('#toggle-btn').removeClass('input-field col s3').addClass('input-field col s5');
                }
            };

            this.stocks = [
                new Stock('GPRO', 'NASDAQ')
            ];
            this.currentPage = [];

            this.activePage = 0;
            this.pagesAmount = 1;

            this.updateCurrentPage = function() {
                var frame = this.activePage * stocksPerPage;
                this.currentPage = this.stocks.slice(frame, frame + stocksPerPage);
            };
            this.updateCurrentPage();

            this.addSymbol = function() {
                this.stocks.unshift(new Stock(this.newSymbol, 'NASDAQ'));
                var ratio = this.stocks.length / stocksPerPage;
                this.pagesAmount = Math.floor(ratio);
                if (this.pagesAmount < ratio) {
                    this.pagesAmount += 1;
                }
                this.updateCurrentPage();
                this.switchPageTo(0);
            };

            this.switchPageTo = function(newPage) {
                if (newPage >= 0 && newPage < this.pagesAmount) {
                    this.activePage = newPage;
                    this.updateCurrentPage();
                }
            };

            this.switchPage = function(direction) {
                this.switchPageTo(this.activePage + direction);
            };

            this.isActivePage = function(index) {
                if (index === this.activePage) {
                    return "active";
                }
                return "waves-effect";
            }
        }]
    });