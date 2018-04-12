'use strict';

angular.module('models')
    .factory('LevelFrequenciesModel', function () {

        let labelMapping = {
            'B-10': 'B10',
            'B-9': 'B9',
            'B-8': 'B8',
            'B-7': 'B7',
            'B-6': 'B6',
            'B-5': 'B5',
            'B-4': 'B4',
            'B-3': 'B3',
            'B-2': 'B2',
            'B-1': 'B1',
            'BTW-0': 'BA',
            'A-1': 'A1',
            'A-2': 'A2',
            'A-3': 'A3',
            'A-4': 'A4',
            'A-5': 'A5',
            'A-6': 'A6',
            'A-7': 'A7',
            'A-8': 'A8',
            'A-9': 'A9',
            'A-10': 'A10'
        };

        return class {

            constructor(trades = []) {
                let tradeLevels = {};
                this._x = ['B10', 'B9', 'B8', 'B7', 'B6', 'B5', 'B4', 'B3', 'B2', 'B1', 'BA', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'];
                this._y = [];

                for (let trade of trades) {
                    let execLevel = labelMapping[trade.getExecutionLevel()];
                    if (tradeLevels.hasOwnProperty(execLevel)) {
                        tradeLevels[execLevel]++;
                    }
                    else {
                        tradeLevels[execLevel] = 1;
                    }
                    // this._x.push(execLevel);
                }

                for (let execLevel of this._x) {
                    this._y.push(tradeLevels[execLevel]||0);
                }
            }

            plot(domElement) {
                let layout = {
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    margin: {
                        l: 28,
                        r: 10,
                        b: 40,
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
