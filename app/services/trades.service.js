'use strict';

angular
    .module('services')
    .factory('tradesService', ['$http', 'apiDomain', function($http, apiDomain) {
        return {
            get: function(params, callback) {
                // return $http.get(apiDomain + '/equities/'+params.symbol+'/trades').then(function (response) {
                //     callback(response.data);
                // });
                return $http.get('services/data/trades.json').then(function(response) {
                    callback(response.data);
                });
            }
        };
    }]);