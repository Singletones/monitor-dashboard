'use strict';

angular
    .module('models')
    .factory('StockModel', [
        'CandleChartModel',
        'OrderBookModel',
        'TradesStatsModel',
        'LevelFrequenciesModel',
        'orderBookMaxPeriods',
        'tradesMaxPeriods',
        'utils',
        (
            CandleChart,
            OrderBook,
            TradesStats,
            LevelFrequencies,
            orderBookMaxPeriods,
            tradesMaxPeriods,
            utils
        ) => class {

            constructor({
                symbol,
                market,
                activities
            } = {}) {
                this._symbol = symbol;
                this._market = market;
                this._latest_timestamp = moment.utc();

                this._activities = activities;

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

            isInZone() {
                return !!this._activities;
            }

            getActivities() {
                return this._activities;
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

            getOrderBooks() {
                return this._orderBooks;
            }

            getRecentOrderBook() {
                return this._orderBooks[this._orderBooks.length - 1];
            }

            setTradesData(trades) {
                this._trades = trades;
                this._stats = new TradesStats().fromTrades(trades);
                this._levels = new LevelFrequencies(trades);
            }

            updateTradesData(trades) {
                this._trades.push(...trades);
                if (this._trades.length > 200) {
                    this._trades.splice(0, this._trades.length - 200);
                }

                this._trades = utils.uniq(this._trades, '_id');
                this._trades.sort((t1, t2) =>
                    t1.getTimestamp().diff(t2.getTimestamp())
                );

                this._stats = new TradesStats().fromTrades(trades);
                this._levels = new LevelFrequencies(trades);
            }

            getTrades() {
                return this._trades;
            }

            getRecentTrade() {
                return this._trades[this._trades.length - 1];
            }

            getRecentTrades(amount) {
                let from = this._trades.length - amount;
                return this._trades.slice(from < 0 ? 0 : from);
            }

            getTradesStats() {
                return this._stats;
            }

            getLevelFrequencies() {
                return this._levels;
            }

        }
    ]);
