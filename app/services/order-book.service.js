'use strict';

angular
    .module('services')
    .factory('orderBookService', ['$http', 'apiDomain', function ($http, apiDomain) {
        return {
            get: function (params, callback) {
                // return $http.get(apiDomain + '/equities/'+params.symbol+'/orderbook').then(function (response) {
                return $http.get('services/data/order-book.json').then(function (response) {
                    callback(response.data);
                });
            }
        };
    }]);
