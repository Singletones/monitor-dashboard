'use strict';

angular
    .module('models')
    .factory('CandleModel', [
        () => class Candle{
            constructor({
                open = 0,
                close = 0,
                high = 0,
                low = 0,
                timestamp = moment.utc()
            } = {}) {
                this.open = open;
                this.close = close;
                this.high = high;
                this.low = low;

                this.timestamp = moment.utc(timestamp);
            }

            getTimestamp() {
                return moment.utc(this.timestamp);
            }
        }
    ]);
