'use strict';

angular.module('services')
    .factory('tradesStatsService', [
        '$http',
        'apiDomain',
        'apiVersion',
        'TradesStatsModel',
        function ($http, apiDomain, apiVersion, TradesStats) {
            return {
                get: function (params, callback) {
                    return $http.get(apiDomain + '/equities/statistics/historica/tradepercentages', {
                        params: {
                            symbol: params.symbol,
                            version: apiVersion,
                            from_date: params.from_date.format('YYYY-MM-DD'),
                            to_date: params.to_date.format('YYYY-MM-DD'),
                            // from_time: params.from_date.format('HH:mm:ss'),
                            // to_time: params.to_date.format('HH:mm:ss')
                        }
                    }).then(function (response) {
                        var stats = response.data;
                        callback(new TradesStats({
                            bid: stats['bid'],
                            belowBid: stats['below bid'],
                            ask: stats['ask'],
                            aboveAsk: stats['above ask'],
                            between: stats['between']
                        }));
                    });
                }
            }
        }
    ]);
