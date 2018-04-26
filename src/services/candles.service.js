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

            return {

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
                                low: candle['Low'],
                                netVolume: candle['Net Volume']
                            });
                        }));
                    });
                }
            };
        }
    ]);
