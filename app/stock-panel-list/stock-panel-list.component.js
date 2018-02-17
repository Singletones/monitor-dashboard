'use strict';

angular
    .module('stockPanelList')
    .component('stockPanelList', {
        templateUrl: 'stock-panel-list/stock-panel-list.template.html',
        controller: ['StockModel', function (Stock) {
            var ctrl = this;

            this.stocks = [
                new Stock('GPRO', 'NASDAQ'),
                new Stock('GPRE', 'NASDAQ')
            ];
        }]
    });
