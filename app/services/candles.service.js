'use strict';

angular
    .module('services')
    .factory('candlesService', ['$http', 'domain', 'CandleChartModel', function ($http, domain, CandleChart) {

        function candlyParabolla(params) {

            var timeFrame = moment('01.01.2000 00:00:00', 'DD.MM.YYYY H:m:s'),
                scale = 0.001;

            function toNormalFrame(x) {
                var x0 = params.fromDate.diff(timeFrame),
                    x1 = params.endDate.diff(timeFrame);

                return (x - x1) * scale;
            }

            var step = parseInt(params.candleType);
            var stepType = params.candleType[(step+'').length + 1];
            // var step = moment.duration(
            //     parseInt(params.candleType),
            //     params.candleType[(step+'').length + 1]
            // );
            var candles = [];

            for (var m = moment(params.fromDate); m.isSameOrBefore(params.endDate); m.add(step, stepType)) {
                var timestamp = m.diff(timeFrame, 'seconds'),
                    x = toNormalFrame(timestamp),
                    y = function (x) { return Math.cos(x); };

                candles.push({
                    timestamp: timestamp,
                    open: y(x),
                    close: y(x + step*60*scale),
                    high: y(x + step*30*scale),
                    low: y(x + step*20*scale)
                });
            }

            return new CandleChart(candles, params);
        }


        return {
            get: function (params, callback) {
                return callback(candlyParabolla(params));
                // return $http.get('services/data/candles.json').then(function (response) {
                //     callback(new CandleChart(response.data[params.symbol], params));
                // });
            }
        };
    }]);
