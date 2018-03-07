'use strict';

angular
    .module('services')
    .factory('tradesService', [
        '$http',
        'apiDomain',
        'apiVersion',
        'TradeModel',
        function ($http, apiDomain, apiVersion, Trade) {

            function toTrade(tradeJSON) {
                return new Trade({
                    timestamp: moment.utc(tradeJSON['Datetime'], 'YYYY-MM-DD[T]HH:mm:ssZ'),
                    price: tradeJSON['Trade_Price'],
                    volume: tradeJSON['Trade_Volume']
                });
            }

            return {
                getList: function (params, callback) {
                    return $http.get(apiDomain + '/equities/trades', {
                        params: {
                            symbol: params.symbol,
                            version: apiVersion,
                            from_date: params.from_date.format('YYYY-MM-DD'),
                            to_date: params.to_date.format('YYYY-MM-DD'),
                            // from_time: params.from_date.format('HH:mm:ss'),
                            // to_time: params.to_date.format('HH:mm:ss')
                        }
                    }).then(function (response) {
                        callback(response.data.map(toTrade));
                    });
                },

                getLookback: function (params, callback) {
                    return $http.get(apiDomain + '/equities/lookback/trade', {
                        params: {
                            symbol: params.symbol,
                            version: apiVersion,
                            seconds: params.seconds
                        }
                    }).then(function (response) {
                        callback(response.data.map(toTrade));
                    });
                },

                getRecent: function (params, callback) {
                    return $http.get(apiDomain + '/equities/live/trade', {
                        params: {
                            symbol: params.symbol,
                            version: apiVersion,
                            amount: params.amount
                        }
                    }).then(function (response) {
                        callback(response.data.map(toTrade));
                    });
                }
            };
        }
    ]);
