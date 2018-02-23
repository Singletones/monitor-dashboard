'use strict';

angular
    .module('models')
    .factory('CandleChartModel', ['CandleModel', function (Candle) {

        function CandleChart(candles, params) {
            Object.call(this);

            this.fromDate = moment(params.fromDate);
            this.endDate = moment(params.endDate);

            this.candlesResolution = params.candleType;
            this.candles = candles.map(function (candle) {
                return new Candle(candle);
            });
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
            },

            plot: function plot(domElement) {
                var trace1 = {

                    x: this.unpackXaxis().slice(1),

                    open: this.unpack('open'),
                    close: this.unpack('close'),
                    high: this.unpack('high'),
                    low: this.unpack('low'),


                    decreasing: {line: {color: '#7F7F7F'}},
                    increasing: {line: {color: '#17BECF'}},
                    line: {color: 'rgba(31,119,180,1)'},

                    type: 'candlestick',
                    xaxis: 'x',
                    yaxis: 'y'
                };

                var layout = {
                    dragmode: 'zoom',
                    margin: {
                        r: 10,
                        t: 25,
                        b: 40,
                        l: 60
                    },
                    showlegend: false,
                    xaxis: {
                        autorange: true,
                        domain: [0, 1],
                        range: this.getRange(),
                        rangeslider: {range: this.getRange()},
                        title: 'Date',
                        type: 'date'
                    },
                    yaxis: {
                        autorange: true,
                        domain: [0, 1],
                        range: [114.609999778, 137.410004222],
                        type: 'linear'
                    }
                };

                Plotly.newPlot(domElement, [trace1], layout);
            }

        });

        return CandleChart;
    }]);
