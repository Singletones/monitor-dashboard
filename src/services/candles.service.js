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

                let timeFrame = moment('01.01.2000 00:00:00', 'DD.MM.YYYY HH:mm:ss'),
                    scale = 0.1;

                function normalizeFrame(x) {
                    let x0 = params.from_date.diff(timeFrame),
                        x1 = params.to_date.diff(timeFrame);

                    return x * scale;
                }

                let step = params.candle_type;
                let candles = [];

                for (let m = moment(params.from_date); m.isSameOrBefore(params.to_date); m.add(step)) {
                    let timestamp = m.diff(timeFrame, 'seconds'),
                        x = normalizeFrame(timestamp),
                        y = (x => Math.cos(x));

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

                get: function ({
                   candle_type,
                   symbol,
                   from_date,
                   to_date,
                }, callback) {
                    let [candle_length, candle_units] = candle_type.format(
                        'd [day]h [hour]m [minute]s [second]',
                        {
                            trim: 'both',
                            usePlural: false
                        }
                    ).split(' ');

                    return $http.get(apiDomain + '/equities/candles', {
                        params: {
                            symbol,
                            version: apiVersion,
                            candle_type: candle_units,
                            candle_length,
                            from_date: from_date.format('YYYY-MM-DD'),
                            to_date: to_date.format('YYYY-MM-DD'),
                            // from_time: from_date.format('HH:mm:ss'),
                            // to_time: to_date.format('HH:mm:ss')
                        }
                    }).then(function (response) {
                        callback(response.data.map(function (candle) {
                            return new Candle({
                                timestamp: moment.utc(candle['Start'], 'YYYY-MM-DD[T]HH:mm:ss'),
                                open: candle['Open'],
                                close: candle['Close'],
                                high: candle['High'],
                                low: candle['Low']
                            });
                        }));
                    });
                }
            };
        }
    ]);
