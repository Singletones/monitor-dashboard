'use strict';

angular
    .module('models')
    .factory('CandleChartModel', ['CandleModel', function(Candle) {

        function CandleChart(candles, params) {
            Object.call(this);

            this.fromDate = moment(params.from_date);
            this.endDate = moment(params.to_date);

            this.candlesResolution = params.candle_type;
            this.candles = candles;
        }

        Object.assign(CandleChart.prototype, {

            unpack: function(property) {
                return this.candles.map(function(candle) {
                    return candle[property];
                });
            },

            unpackXaxis: function() {
                return this.candles.map(function(candle) {
                    return candle.timestamp.format('YYYY-MM-DD HH:mm:ss');
                });
            },

            getRange: function() {
                return [this.fromDate.format('YYYY-MM-DD HH:mm:ss'), this.endDate.format('YYYY-MM-DD HH:mm:ss')]
            },

            getCandlesResolution: function() {
                return moment.duration(this.candlesResolution);
            },

            plot: function plot(domElement) {
                var trace1 = {

                    x: this.unpackXaxis(),//.slice(1),

                    open: this.unpack('open'),
                    close: this.unpack('close'),
                    high: this.unpack('high'),
                    low: this.unpack('low'),


                    decreasing: { line: { color: '#f44336' } },
                    increasing: { line: { color: '#4caf50' } },
                    line: { color: 'rgba(31,119,180,1)' },

                    type: 'candlestick',
                    xaxis: 'x',
                    yaxis: 'y'
                };

                var layout = {
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    dragmode: 'zoom',
                    margin: {
                        r: 0,
                        t: 10,
                        b: 20,
                        l: 35
                    },
                    showlegend: false,
                    xaxis: {
                        autorange: true,
                        domain: [0, 1],
                        range: this.getRange(),
                        rangeslider: { range: this.getRange() },
                        title: 'Date',
                        type: 'category'
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