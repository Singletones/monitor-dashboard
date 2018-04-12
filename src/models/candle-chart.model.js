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

            unpackXaxis(format) {
                return this.candles.map(function(candle) {
                    return candle.timestamp.format(format || 'MM-DD HH:mm:ss');
                });
            }

            getRange(format) {
                return [
                    this.candles[0].timestamp.format(format || 'MM-DD HH:mm:ss'),
                    this.candles[this.candles.length - 1].timestamp.format(format || 'MM-DD HH:mm:ss')
                ];
            }

            getCandlesResolution() {
                return moment.duration(this.candlesResolution);
            }

            plot(domElement) {
                let trace1 = {

                    x: this.unpackXaxis(),

                    open: this.unpack('open'),
                    close: this.unpack('close'),
                    high: this.unpack('high'),
                    low: this.unpack('low'),


                    decreasing: { line: { color: '#f44336' } },
                    increasing: { line: { color: '#4caf50' } },
                    line: { color: 'rgba(31,119,180,1)' },

                    type: 'candlestick',
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
                        range: this.getRange(),
                        rangeslider: { range: this.getRange() },
                        title: 'Date',
                        type: 'category'
                    },
                    yaxis: {
                        autorange: true,
                        title: 'Price',
                        type: 'linear'
                    }
                };

                Plotly.newPlot(domElement, [trace1], layout);
            }

        }
    ]);