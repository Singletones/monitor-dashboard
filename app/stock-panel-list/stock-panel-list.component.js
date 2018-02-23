'use strict';

angular
    .module('stockPanelList')
    .component('stockPanelList', {
        templateUrl: 'stock-panel-list/stock-panel-list.template.html',
        controller: ['StockModel', 'stocksPerPage', function(Stock, stocksPerPage) {
            var ctrl = this;

            this.stocks = [
                new Stock('GPRO', 'NASDAQ')
            ];
            this.currentPage = [];

            this.activePage = 0;
            this.pagesAmount = 1;

            this.updateCurrentPage = function () {
                var frame = this.activePage*stocksPerPage;
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
            };

            this.switchPageTo = function (newPage) {
                if (newPage >= 0 && newPage < this.pagesAmount) {
                    this.activePage = newPage;
                    this.updateCurrentPage();
                }
            };

            this.switchPage = function (direction) {
                this.switchPageTo(this.activePage + direction);
            };

            this.isActivePage = function (index) {
                if (index === this.activePage) {
                    return "active";
                }
                return "waves-effect";
            }
        }]
    });