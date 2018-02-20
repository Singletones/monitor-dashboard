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
        }

        Object.assign(Candle.prototype, {



        });

        return Candle;
    });
