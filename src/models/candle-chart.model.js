'use strict';

angular
    .module('models')
    .factory('CandleChartModel', [
        'CandleModel',
        (Candle) => class {

            constructor(candles = [], {
                from_date = moment.utc(),
                to_date = moment.utc(),
                candle_type = moment.duration()
            } = {}) {
                this.fromDate = from_date;
                this.endDate = to_date;

                this.candlesResolution = candle_type;
                this.candles = candles;
            }

            unpack(property) {
                return this.candles.map(function(candle) {
                    return candle[property];
                });
            }

            unpackXaxis() {
                return this.candles.map(function(candle) {
                    return candle.timestamp.format('YYYY-MM-DD HH:mm:ss');
                });
            }

            getRange() {
                return [this.fromDate.format('YYYY-MM-DD HH:mm:ss'), this.endDate.format('YYYY-MM-DD HH:mm:ss')]
            }

            getCandlesResolution() {
                return moment.duration(this.candlesResolution);
            }

            plot(domElement) {
                let trace1 = {

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

                let layout = {
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

        }
    ]);