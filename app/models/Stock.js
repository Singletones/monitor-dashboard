'use strict';

angular
    .module('models')
    .factory('StockModel', function () {

        function Stock(symbol, market) {
            Object.call(this);

            this._symbol = symbol;
            this._market = market;
            this._latest_timestamp = moment();
        }

        Object.assign(Stock.prototype, {

            getSymbol: function () {
                return this._symbol;
            },

            getMarket: function () {
                return this._market;
            },

            getLastUpdate: function () {
                return moment(this._latest_timestamp);
            },

            updateLatestTimestamp: function () {
                this._latest_timestamp = moment();
            }

        });

        return Stock;
    });
