'use strict';

angular
    .module('models')
    .factory('CandleModel', [function () {

        function Candle(args) {

            Object.call(this);

            this.open = args.open;
            this.close = args.close;
            this.high = args.high;
            this.low = args.low;

            this.timestamp = args.timestamp;
        }

        Object.assign(Candle.prototype, {

            getTimestamp: function () {
                return moment.utc(this.timestamp);
            }

        });

        return Candle;
    }]);
