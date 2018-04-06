'use strict';

angular
    .module('models')
    .factory('StockModel', [
        'CandleChartModel',
        'OrderBookModel',
        'TradesStatsModel',
        'LevelFrequenciesModel',
        'orderBookMaxPeriods',
        (CandleChart, OrderBook, TradesStats, LevelFrequencies, orderBookMaxPeriods) => class {

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

            setCandlesData(candleChart) {
                this._candleChart = candleChart;
            }

            getCandleChart() {
                return this._candleChart;
            }

            setOrderBooks(orderbooks) {
                this._orderBooks = orderbooks;
            }

            updateOrderBooks(orderBooks) {
                this._orderBooks.push(...orderBooks);
                if (this._orderBooks.length > orderBookMaxPeriods) {
                    this._orderBooks.splice(0, this._orderBooks.length - orderBookMaxPeriods);
                }
            }

            getRecentOrderBook() {
                return this._orderBooks[this._orderBooks.length - 1];
            }

            getOrderBooksRatioOverTime(levels) {
                return this._orderBooks.map(orderBook => [
                    orderBook.getDatetime(),
                    orderBook.getLevelsRatio(levels)
                ]);
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
