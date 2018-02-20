'use strict';

angular
    .module('services')
    .factory('tradesService', ['$http', 'domain', function ($http, domain) {
        return {
            get: function (params, callback) {
                // return $http.get(domain + '/equities/'+params.symbol+'/trades').then(function (response) {
                //     callback(response.data);
                // });
                return $http.get('services/data/trades.json').then(function (response) {
                    callback(response.data[params.symbol]);
                });
            }
        };
    }]);
