'use strict';

angular
    .module('services')
    .factory('orderBookService', ['$http', function ($http) {
        return {
            get: function (symbol, callback) {
                return $http.get('services/data/order-book.json').then(function (response) {
                    callback(response.data[symbol]);
                });
            }
        };
    }]);
