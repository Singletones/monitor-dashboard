'use strict';

angular
    .module('stockPanel')
    .component('stockPanel', {
        templateUrl: 'stock-panel/stock-panel.template.html',
        controller: [function () {
            var ctrl = this;

            this.symbol = 'GPRE';
            this.market = 'NASDAQ';
            this.latest_timestamp = 235235;
        }]
    });
