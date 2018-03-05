'use strict';

angular
    .module('services')
    .factory('orderBookService', ['$http', 'apiDomain', function ($http, apiDomain) {
        return {
            get: function (params, callback) {
                return $http.get(apiDomain + '/equities/orderbook', {
                    params: {
                        symbol: 'GPRO',
                        version: 'v1',
                        from_date: params.from_date.format('YYYY-MM-DD'),
                        to_date: params.to_date.format('YYYY-MM-DD')
                    }
                }).then(function (response) {
                // return $http.get('services/data/order-book.json').then(function (response) {
                    debugger;
                    callback(response.data);
                });
            }
        };
    }]);
