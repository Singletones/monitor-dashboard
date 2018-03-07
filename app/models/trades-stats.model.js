'use strict';

angular.module('models')
    .factory('TradesStatsModel', function() {
        function TradesStats(stats) {
            Object.call(this);

            this.bid = stats.bid || 1;
            this.belowBid = stats.belowBid || 1;
            this.ask = stats.ask || 1;
            this.aboveAsk = stats.aboveAsk || 1;
            this.between = stats.between || 1;
        }

        Object.assign(TradesStats.prototype, {

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