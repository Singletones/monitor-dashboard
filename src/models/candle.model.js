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
                timestamp = moment.utc(),
                netVolume = 0
            } = {}) {
                this.open = open;
                this.close = close;
                this.high = high;
                this.low = low;
                this.timestamp = moment.utc(timestamp);
                this.netVolume = netVolume;
            }

            getTimestamp() {
                return moment.utc(this.timestamp);
            }
        }
    ]);
