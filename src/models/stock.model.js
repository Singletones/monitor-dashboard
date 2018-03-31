'use strict';

angular
    .module('models')
    .factory('StockModel', [
        'CandleChartModel',
        'OrderBookModel',
        'TradesStatsModel',
        'LevelFrequenciesModel',
        (CandleChart, OrderBook, TradesStats, LevelFrequencies) => class {

            constructor(symbol, market) {
                this._symbol = symbol;
                this._market = market;
                this._latest_timestamp = moment.utc();

                this._candleChart = new CandleChart();
                this._orderBooks = [];
                this._trades = [];
                this._stats = new TradesStats();
                this._levels = new LevelFrequencies();
            }

            getSymbol() {
                return this._symbol;
            }

            getMarket() {
                return this._market;
            }

            getLastUpdate() {
                return moment.utc(this._latest_timestamp);
            }

            updateLatestTimestamp() {
                this._latest_timestamp = moment.utc();
            }

            setCandlesData(candles) {
                this._candleChart = new CandleChart(candles);
            }

            getCandleChart(candles) {
                return this._candleChart;
            }

            setOrderBooksData(orderbooks) {
                this._orderBooks = orderbooks;
            }

            getRecentOrderBook() {
                return this._orderBooks[0];
            }

            setTradesData(trades) {
                this._trades = trades;
                this._stats = new TradesStats().fromTrades(trades);
                this._levels = new LevelFrequencies(trades);
            }

            getTrades() {
                return this._trades;
            }

            getRecentTrade() {
                return this._trades[this._trades.length - 1];
            }

            getTradesStats() {
                return this._stats;
            }

            getLevelFrequencies() {
                return this._levels;
            }

        }
    ]);
