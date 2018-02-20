'use strict';

angular
    .module('models')
    .factory('StockModel', function () {

        function Stock(symbol, market) {
            Object.call(this);

            this.symbol = symbol;
            this.market = market;
            this.latest_timestamp = 0;
        }

        Object.assign(Stock.prototype, {

            getSymbol: function () {
                return this.symbol;
            },

            getMarket: function () {
                return this.market;
            },

            getLastUpdate: function () {
                return this.latest_timestamp;
            }

        });

        return Stock;
    });
