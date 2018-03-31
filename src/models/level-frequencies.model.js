'use strict';

angular.module('models')
    .factory('LevelFrequenciesModel', function () {
        function uniq(array) {
            let seen = {};
            return array.filter(function(item) {
                return seen.hasOwnProperty(item) ? false : (seen[item] = true);
            });
        }

        return class {

            constructor(trades = []) {
                this._tradeLevels = {};
                this._x = [];
                this._y = [];

                trades.map(function (trade) {
                    let execLevel = trade.getExecutionLevel();
                    if (this._tradeLevels.hasOwnProperty(execLevel)) {
                        this._tradeLevels[execLevel]++;
                    }
                    else {
                        this._x.push(execLevel);
                        this._tradeLevels[execLevel] = 1;
                    }
                }, this);

                this._x.map(function (execLevel) {
                    this._y.push(this._tradeLevels[execLevel]);
                }, this);
            }

            plot(domElement) {
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
                    height: 300
                };

                let data = [{
                    x: this._x,
                    y: this._y,
                    type: 'bar'
                }];

                Plotly.newPlot(domElement, data, layout);
            }

        };
    });
