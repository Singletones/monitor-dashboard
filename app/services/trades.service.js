'use strict';

angular
    .module('services')
    .factory('tradesService', ['$http', function ($http) {
        return {
            get: function (symbol, callback) {
                return $http.get('services/data/trades.json').then(function (response) {
                    callback(response.data[symbol][0]);
                });
            }
        };
    }]);
