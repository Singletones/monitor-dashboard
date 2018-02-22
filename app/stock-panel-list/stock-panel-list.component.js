'use strict';

angular
    .module('stockPanelList')
    .component('stockPanelList', {
        templateUrl: 'stock-panel-list/stock-panel-list.template.html',
        controller: ['StockModel', function(Stock) {
            var ctrl = this;
            this.addSymbol = function() {
                this.stocks.unshift(new Stock(this.newSymbol, 'NASDAQ'))
            }

            this.stocks = [
                new Stock('GPRO', 'NASDAQ')
            ];
        }]
    });