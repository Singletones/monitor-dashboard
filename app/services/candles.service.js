'use strict';

angular
    .module('services')
    .factory('candlesService', [
        '$http',
        'apiDomain',
        'CandleChartModel',
        function ($http, apiDomain, CandleChart) {

            function candlyCosine(params) {

                var timeFrame = moment('01.01.2000 00:00:00', 'DD.MM.YYYY HH:mm:ss'),
                    scale = 0.1;

                function normalizeFrame(x) {
                    var x0 = params.fromDate.diff(timeFrame),
                        x1 = params.endDate.diff(timeFrame);

                    return x * scale;
                }

                var step = params.candleType;
                var candles = [];

                for (var m = moment(params.fromDate); m.isSameOrBefore(params.endDate); m.add(step)) {
                    var timestamp = m.diff(timeFrame, 'seconds'),
                        x = normalizeFrame(timestamp),
                        y = function (x) { return Math.cos(x); };

                    candles.push({
                        timestamp: timestamp,
                        open: y(x),
                        close: y(x + step.asSeconds()*scale),
                        high: y(x + step.asSeconds()*scale/2),
                        low: y(x + step.asSeconds()*scale/3)
                    });
                }

                return new CandleChart(candles, params);
            }


            return {
                get: function (params, callback) {
                    return callback(candlyCosine(params));
                    // return $http.get('services/data/candles.json').then(function (response) {
                    //     callback(new CandleChart(response.data, params));
                    // });
                }
            };
        }
    ]);
