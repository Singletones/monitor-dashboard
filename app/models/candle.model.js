'use strict';

angular
    .module('models')
    .factory('CandleModel', ['utils', function (utils) {

        function Candle(args) {
            Object.call(this);

            //this.resolution = args.resolution;

            this.open = args.open;
            this.close = args.close;
            this.high = args.high;
            this.low = args.low;

            this.timestamp = utils.timestampToMoment(args.timestamp);
        }

        Object.assign(Candle.prototype, {

            getTimestamp: function () {
                return moment(this.timestamp);
            }

        });

        return Candle;
    }]);
