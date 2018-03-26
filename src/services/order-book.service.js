'use strict';

angular
    .module('services')
    .factory('orderBookService', [
        '$http',
        'apiDomain',
        'apiVersion',
        'OrderBookModel',
        function ($http, apiDomain, apiVersion, OrderBook) {

            function toOrderBook(orderbookJSON) {
                return new OrderBook({
                    Ask: orderbookJSON['Ask_Price'].map(function (price, index) {
                        return {
                            Price: price,
                            Volume: orderbookJSON['Ask_Size'][index]
                        };
                    }),
                    Bid: orderbookJSON['Bid_Price'].map(function (price, index) {
                        return {
                            Price: price,
                            Volume: orderbookJSON['Bid_Size'][index]
                        };
                    }),
                    Datetime: moment.utc(orderbookJSON['Datetime'], 'YYYY-MM-DD[T]HH:mm:ssZ')
                });
            }

            return {
                getList: function (params, callback) {
                    return $http.get(apiDomain + '/equities/orderbook', {
                        params: {
                            symbol: params.symbol,
                            version: apiVersion,
                            from_date: params.from_date.format('YYYY-MM-DD'),
                            to_date: params.to_date.format('YYYY-MM-DD'),
                            from_time: params.from_date.format('HH:mm:ss'),
                            to_time: params.to_date.format('HH:mm:ss')
                        }
                    }).then(function (response) {
                        callback(response.data.map(toOrderBook));
                    });
                },

                getLookback: function (params, callback) {
                    return $http.get(apiDomain + '/equities/lookback/orderbook', {
                        params: {
                            symbol: params.symbol,
                            version: apiVersion,
                            seconds: params.seconds
                        }
                    }).then(function (response) {
                        callback(response.data.map(toOrderBook));
                    });
                },

                getRecent: function (params, callback) {
                    return $http.get(apiDomain + '/equities/live/orderbook', {
                        params: {
                            symbol: params.symbol,
                            version: apiVersion,
                            amount: params.amount
                        }
                    }).then(function (response) {
                        callback(response.data.map(toOrderBook));
                    });
                }
            };
        }
    ]);
