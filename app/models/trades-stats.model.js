'use strict';

angular.module('models')
    .factory('TradesStatsModel', function() {
        function TradesStats(stats) {
            Object.call(this);

            stats = stats || {};

            this.bid = stats.bid || 0;
            this.belowBid = stats.belowBid || 0;
            this.ask = stats.ask || 0;
            this.aboveAsk = stats.aboveAsk || 0;
            this.between = stats.between || 0;
        }

        Object.assign(TradesStats.prototype, {

            fromTrades: function (trades) {

                this.bid = 0;
                this.belowBid = 0;
                this.ask = 0;
                this.aboveAsk = 0;
                this.between = 0;

                trades.map(function (trade) {
                    var code = trade.getCode();
                    switch (code) {
                        case 'A':
                            this.ask++;
                            break;
                        case 'A+':
                            this.aboveAsk++;
                            break;
                        case 'B':
                            this.bid++;
                            break;
                        case 'B-':
                            this.belowBid++;
                            break;
                        case 'BTW':
                            this.between++;
                            break;
                    }
                }, this);

                return this;
            },

            values: function() {
                return [
                    this.between,
                    this.bid,
                    this.ask,
                    this.belowBid,
                    this.aboveAsk
                ];
            },

            labels: function() {
                return [
                    'Between Bid/Ask',
                    'At Bid',
                    'At Ask',
                    'Below Bid',
                    'Above Ask'
                ];
            },

            plot: function(domElement) {
                var data = [{
                    values: this.values(),
                    labels: this.labels(),
                    type: 'pie',
                    marker: {
                        color: 'red'
                    }
                }];

                var layout = {
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    margin: {
                        l: 10,
                        r: 10,
                        b: 30,
                        t: 10,
                        pad: 0
                    },
                    height: 300
                };

                var restyle = {
                    'marker.colors': [
                        ['#ffeb3b', '#ff80ab ', '#2196f3', '#fff59d', '#ff9800']
                    ]
                };


                Plotly.newPlot(domElement, data, layout);
                Plotly.restyle(domElement, restyle);
            }

        });

        return TradesStats;
    });