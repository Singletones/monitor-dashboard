'use strict';

angular
    .module('models')
    .factory('StockModel', [
        'CandleChartModel',
        'OrderBookModel',
        'TradesStatsModel',
        'LevelFrequenciesModel',
        function (CandleChart, OrderBook, TradesStats, LevelFrequencies) {

            function Stock(symbol, market) {
                Object.call(this);

                this._symbol = symbol;
                this._market = market;
                this._latest_timestamp = moment.utc();

                this._candleChart = null;
                this._orderBooks = null;
                this._trades = null;
                this._stats = null;
                this._levels = null;

            }

            Object.assign(Stock.prototype, {

                getSymbol: function () {
                    return this._symbol;
                },

                getMarket: function () {
                    return this._market;
                },

                getLastUpdate: function () {
                    return moment.utc(this._latest_timestamp);
                },

                updateLatestTimestamp: function () {
                    this._latest_timestamp = moment.utc();
                },

                setCandlesData: function (candles) {
                    this._candleChart = new CandleChart(candles);
                },

                getCandleChart: function (candles) {
                    return this._candleChart;
                },

                setOrderBooksData: function (orderbooks) {
                    this._orderBooks = orderbooks;
                },

                getRecentOrderBook: function () {
                    return this._orderBooks[0];
                },

                setTradesData: function (trades) {
                    this._trades = trades;
                    this._stats = new TradesStats().fromTrades(trades);
                    this._levels = new LevelFrequencies(trades);
                },

                getTrades: function () {
                    return this._trades;
                },

                getRecentTrade: function () {
                    return this._trades[this._trades.length - 1];
                },

                getTradesStats: function () {
                    return this._stats;
                },

                getLevelFrequencies: function () {
                    return this._levels;
                }

            });

            return Stock;
        }
    ]);
