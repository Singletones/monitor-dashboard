'use strict';

angular
    .module('models')
    .factory('CandleModel', function () {

        function Candle(args) {
            Object.call(this);

            this.resolution = args.resolution;

            this.open = args.open;
            this.close = args.close;
            this.high = args.high;
            this.low = args.low;

            this.timestamp = moment('01.01.2000 00:00:00', 'DD.MM.YYYY H:m:s').add(args.timestamp, 'seconds')
        }

        Object.assign(Candle.prototype, {

            getTimestamp: function () {
                return moment(this.timestamp);
            }

        });

        return Candle;
    });
