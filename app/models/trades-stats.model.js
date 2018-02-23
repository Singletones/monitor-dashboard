'use strict';

angular.module('models')
    .factory('TradesStatsModel', function () {
        function TradesStats(stats) {
            Object.call(this);

            this.bid = stats.bid || 0;
            this.belowBid = stats.belowBid || 0;
            this.ask = stats.ask || 0;
            this.aboveAsk = stats.aboveAsk || 0;
            this.between = stats.between || 0;
        }
        
        Object.assign(TradesStats.prototype, {

            values: function () {
                return [
                    this.between,
                    this.bid,
                    this.ask,
                    this.belowBid,
                    this.aboveAsk
                ];
            },

            labels: function () {
                return [
                    'Between Bid/Ask',
                    'At Bid',
                    'At Ask',
                    'Below Bid',
                    'Above Ask'
                ];
            },
            
            plot: function (domElement) {
                var data = [{
                    values: this.values(),
                    labels: this.labels(),
                    type: 'pie'
                }];

                var layout = {
                    height: 400,
                    width: 500
                };

                Plotly.newPlot(domElement, data, layout);
            }
            
        });
        
        return TradesStats;
    });
