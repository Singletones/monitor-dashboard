'use strict';

angular
    .module('services')
    .factory('tradesService', [
        '$http',
        'apiDomain',
        'TradeModel',
        function ($http, apiDomain, Trade) {
            return {
                get: function (params, callback) {
                    // return $http.get(apiDomain + '/equities/'+params.symbol+'/trades').then(function (response) {
                    return $http.get('services/data/trades.json').then(function (response) {
                        callback(response.data.map(function (trade) {
                            return new Trade({
                                timestamp: trade.timestamp,
                                price: trade.price,
                                volume: trade.size
                            });
                        }));
                    });
                }
            };
        }
    ]);
