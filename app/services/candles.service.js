'use strict';

angular
    .module('services')
    .factory('candlesService', ['$http', function ($http) {
        return {
            get: function (params, callback) {
                return $http.get('services/data/candles.json').then(function (response) {
                    callback(response.data[params.symbol]);
                });
            }
        };
    }]);
