'use strict';

angular
    .module('services')
    .factory('candlesService', ['$http', 'CandleChartModel', function ($http, CandleChart) {
        return {
            get: function (params, callback) {
                return $http.get('services/data/candles.json').then(function (response) {
                    callback(new CandleChart(response.data[params.symbol], params));
                });
            }
        };
    }]);
