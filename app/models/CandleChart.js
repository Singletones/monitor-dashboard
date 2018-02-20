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
                return this.candles.map(function (candle) {
                    return candle[property];
                });
            },

            unpackXaxis: function () {
                return this.candles.map(function (candle) {
                    return candle.getTimestamp().format('YYYY-MM-DD HH:mm:ss');
                });
            },

            getRange: function () {
                return [this.fromDate.format('YYYY-MM-DD HH:mm:ss'), this.endDate.format('YYYY-MM-DD HH:mm:ss')]
            },

            getCandlesResolution: function () {
                return this.candlesResolution;
            }

        });

        return CandleChart;
    }]);
