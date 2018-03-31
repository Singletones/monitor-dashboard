'use strict';

class Synchronizer {
    constructor(fn) {
        this._fn = fn;
        this._calls = [];
        this._expectedCalls = 0;
        this._synced = false;
    }

    _sync() {
        if (!this._synced && this._calls.length === this._expectedCalls) {
            this._fn(this._calls);
            this._synced = true;
        }
    }

    // callback decorator
    sync(fn) {
        if (fn) {
            this._expectedCalls++;
            return (...args) => {
                let res = fn(...args);
                this._calls.push(res);
                this._sync();
                return res;
            };
        }
        else {
            this._sync();
        }
    }
}

angular.module('dataSources')
    .factory('CandlesSource', [
        'candlesService',
        'CandleModel',
        'CandleChartModel',
        (candlesService, Candle, CandleChart) => class {

            constructor(stock) {
                this._symbol = stock.getSymbol();

                this._candle_type = moment.duration(
                    localStorage.getItem(this._symbol + '_candle_type')
                );
                this._from_date = moment.utc(
                    localStorage.getItem(this._symbol + '_candle_from_date')
                );
                this._to_date = moment.utc(
                    localStorage.getItem(this._symbol + '_candle_to_date')
                );
                this._candles = (JSON.parse(localStorage.getItem(this._symbol + '_candle_cache')) || []).map(
                    candle => new Candle(candle)
                );
            }

            _load(from_date, to_date) {
                if (from_date.isSameOrBefore(this._from_date) && to_date.isSameOrAfter(this._to_date)) {
                    return this._candles;
                }
                else {
                    return this._candles.filter(candle => {
                        return candle.timestamp.isSameOrAfter(from_date) && candle.timestamp.isSameOrBefore(to_date);
                    });
                }
            }

            _store() {
                localStorage.setItem(this._symbol + '_candle_cache', JSON.stringify(this._candles));
                localStorage.setItem(this._symbol + '_candle_type', this._candle_type.toJSON());
                localStorage.setItem(this._symbol + '_candle_from_date', this._from_date.toJSON());
                localStorage.setItem(this._symbol + '_candle_to_date', this._to_date.toJSON());
            }

            get(params, callback) {
                let {
                    candle_type,
                    from_date,
                    to_date
                } = params;

                if (candle_type.asMilliseconds() === this._candle_type.asMilliseconds()) {
                    let lostPieces = this._getLostPieces(from_date, to_date);
                    let synchronizer = new Synchronizer((results) => {
                        let store;

                        for (let [candles, concat] of results) {
                            concat(candles);
                            store = true;
                        }

                        if (store) {
                            this._store();
                        }

                        callback(new CandleChart(this._load(from_date, to_date), params));
                    });

                    for (let [from_date, to_date, concat] of lostPieces) {
                        candlesService.get({
                            symbol: this._symbol,
                            candle_type,
                            from_date,
                            to_date
                        }, synchronizer.sync((candles) => {
                            return [candles, concat];
                        }));
                    }

                    synchronizer.sync();
                }
                else {
                    candlesService.get({
                        symbol: this._symbol,
                        candle_type,
                        from_date,
                        to_date
                    }, (candles) => {
                        this._candle_type = candle_type.clone();
                        this._from_date = from_date.clone();
                        this._to_date = to_date.clone();
                        this._candles = candles;
                        this._store();
                        callback(new CandleChart(candles, params));
                    });
                }
            }

            _getLostPieces(from_date, to_date) {
                let lostPieces = [];
                if (from_date.isBefore(this._from_date)) {
                    if (this._from_date.diff(from_date) >= this._candle_type.asMilliseconds()) {
                        lostPieces.push([from_date, this._from_date, (candles) => {
                            this._candles = candles.concat(this._candles);
                            this._from_date = from_date.clone();
                        }]);
                    }
                }
                if (to_date.isAfter(this._to_date)) {
                    if (to_date.diff(this._to_date) >= this._candle_type.asMilliseconds()) {
                        lostPieces.push([this._to_date, to_date, (candles) => {
                            this._candles.push(...candles);
                            this._to_date = to_date.clone();
                        }]);
                    }
                }
                return lostPieces;
            }

        }
    ]);
