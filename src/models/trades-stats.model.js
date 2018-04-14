'use strict';

angular.module('models')
    .factory('TradesStatsModel', [
        () => class {

            constructor({
                bid = 0,
                belowBid = 0,
                ask = 0,
                aboveAsk = 0,
                between = 0
            } = {}) {
                this.bid = bid;
                this.belowBid = belowBid;
                this.ask = ask;
                this.aboveAsk = aboveAsk;
                this.between = between;

                this.total = this._total();
            }

            _total() {
                return this.bid
                    + this.ask
                    + this.belowBid
                    + this.aboveAsk
                    + this.between;
            }

            fromTrades(trades) {

                this.bid = 0;
                this.belowBid = 0;
                this.ask = 0;
                this.aboveAsk = 0;
                this.between = 0;

                trades.map(function (trade) {
                    let code = trade.getCode();
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

                this.total = this._total();

                return this;
            }

            getTotal() {
                return this.total;
            }

            values() {
                return [
                    this.between,
                    this.bid,
                    this.ask,
                    this.belowBid,
                    this.aboveAsk
                ];
            }

            labels() {
                return [
                    'Between Bid/Ask',
                    'At Bid',
                    'At Ask',
                    'Below Bid',
                    'Above Ask'
                ];
            }

            plot(domElement) {
                let data = [{
                    values: this.values(),
                    labels: this.labels(),
                    type: 'pie',
                    marker: {
                        color: 'red'
                    }
                }];

                let layout = {
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    margin: {
                        l: 10,
                        r: 10,
                        b: 30,
                        t: 10,
                        pad: 0
                    },
                    height: 300,
                    showlegend: false
                };

                let restyle = {
                    'marker.colors': [
                        ['#ffeb3b', '#ff80ab ', '#2196f3', '#fff59d', '#ff9800']
                    ]
                };


                Plotly.newPlot(domElement, data, layout);
                Plotly.restyle(domElement, restyle);
            }

        }
    ]);
