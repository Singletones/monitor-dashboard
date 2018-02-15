'use strict';

angular
    .module('stockPanelList')
    .component('stockPanelList', {
        templateUrl: 'stock-panel-list/stock-panel-list.template.html',
        controller: ['StockModel', function (StockModel) {
            var ctrl = this;

            this.stocks = [
                new StockModel('GPRO', 'NASDAQ'),
                new StockModel('GPRE', 'NASDAQ')
            ];
        }]
    });
