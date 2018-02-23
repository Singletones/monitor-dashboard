'use strict';

angular.module('services')
    .factory('tradesStatsService', [
        '$http',
        'apiDomain',
        'TradesStatsModel',
        function ($http, apiDomain, TradesStats) {
            return {
                get: function (params, callback) {
                    // return $http.get(apiDomain + '/equities/'+params.symbol+'/stats/trades').then(function (response) {
                    return $http.get('services/data/trades-stats.json').then(function (response) {
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
