'use strict';

angular
    .module('models')
    .factory('CandleChartModel', ['CandleModel', function (Candle) {

        function CandleChart(candles, params) {
            Object.call(this);

            this.fromDate = moment(params.fromDate);
            this.endDate = moment(params.endDate);

            this.candlesResolution = params.candleType;
            this.candles = [];
            for (var i = 0; i < candles.length; i++) {
                candles[i].resolution = this.candlesResolution;
                this.candles.push(new Candle(candles[i]));
            }
        }

        Object.assign(CandleChart.prototype, {

            unpack: function (property) {
                var res = [];
                for (var i = 0; i < this.candles.length; i++) {
                    res.push(this.candles[i][property]);
                }
                return res;
            },

            unpackXaxis: function () {
                var res = [];
                for (var m = moment(this.fromDate); m.isSameOrBefore(this.endDate); m.add(1, 'day')) {
                    res.push(m.format('YYYY-MM-DD'));
                }
                return res;
            },

            getCandlesResolution: function () {
                return this.candlesResolution;
            }

        });

        return CandleChart;
    }]);
