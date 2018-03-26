'use strict';

angular.module('services')
    .factory('tradesStatsService', [
        '$http',
        'apiDomain',
        'apiVersion',
        'TradesStatsModel',
        function ($http, apiDomain, apiVersion, TradesStats) {
            return {
                getTradeLevels: function (params, callback) {
                    return $http.get(apiDomain + '/equities/statistics/historical/tradepercentages', {
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
                            bid: stats['bid']*stats['total trades'],
                            belowBid: stats['below bid']*stats['total trades'],
                            ask: stats['ask']*stats['total trades'],
                            aboveAsk: stats['above ask']*stats['total trades'],
                            between: stats['between']*stats['total trades']
                        }));
                    });
                }
            }
        }
    ]);
