'use strict';

angular
    .module('services')
    .factory('orderBookService', ['$http', 'domain', function ($http, domain) {
        return {
            get: function (params, callback) {
                // return $http.get(domain + '/equities/'+params.symbol+'/orderbook').then(function (response) {
                //     callback(response.data);
                // });
                return $http.get('services/data/order-book.json').then(function (response) {
                    callback(response.data[params.symbol]);
                });
            }
        };
    }]);
