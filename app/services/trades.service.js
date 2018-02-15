'use strict';

angular
    .module('services')
    .factory('tradesService', ['$http', function ($http) {
        return {
            get: function (params, callback) {
                return $http.get('services/data/trades.json').then(function (response) {
                    callback(response.data[params.symbol][0]);
                });
            }
        };
    }]);
