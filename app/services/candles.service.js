'use strict';

angular
    .module('services')
    .factory('candlesService', [
        '$http',
        'apiDomain',
        'apiVersion',
        'CandleModel',
        'CandleChartModel',
        function ($http, apiDomain, apiVersion, Candle, CandleChart) {

            function candlyCosine(params) {

                var timeFrame = moment('01.01.2000 00:00:00', 'DD.MM.YYYY HH:mm:ss'),
                    scale = 0.1;

                function normalizeFrame(x) {
                    var x0 = params.from_date.diff(timeFrame),
                        x1 = params.to_date.diff(timeFrame);

                    return x * scale;
                }

                var step = params.candle_type;
                var candles = [];

                for (var m = moment(params.from_date); m.isSameOrBefore(params.to_date); m.add(step)) {
                    var timestamp = m.diff(timeFrame, 'seconds'),
                        x = normalizeFrame(timestamp),
                        y = function (x) { return Math.cos(x); };

                    candles.push({
                        timestamp: moment(m),
                        open: y(x),
                        close: y(x + step.asSeconds()*scale),
                        high: y(x + step.asSeconds()*scale/2),
                        low: y(x + step.asSeconds()*scale/3)
                    });
                }

                return new CandleChart(candles, params);
            }

            return {
                getCosineMockup: function (params, callback) {
                    return callback(candlyCosine(params));
                },

                get: function (params, callback) {
                    var candle = params.candle_type.format(
                        'd[day]h[hour]m[minute]s[second]',
                        {
                            trim: 'both',
                            usePlural: false
                        }
                    );

                    var candle_length = parseInt(candle),
                        candle_type = candle.slice(('' + candle_length).length);

                    return $http.get(apiDomain + '/equities/candles', {
                        params: {
                            symbol: params.symbol,
                            version: apiVersion,
                            candle_type: candle_type,
                            candle_length: candle_length,
                            from_date: params.from_date.format('YYYY-MM-DD'),
                            to_date: params.to_date.format('YYYY-MM-DD'),
                            from_time: params.from_date.format('HH:mm:ss'),
                            to_time: params.to_date.format('HH:mm:ss')
                        }
                    }).then(function (response) {
                        callback(new CandleChart(response.data.map(function (candle) {
                            return new Candle({
                                timestamp: moment.utc(candle['Start'], 'YYYY-MM-DD[T]HH:mm:ss'),
                                open: candle['Open'],
                                close: candle['Close'],
                                high: candle['High'],
                                low: candle['Low']
                            });
                        }), params));
                    });
                }
            };
        }
    ]);
