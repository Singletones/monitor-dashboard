angular
    .module('services')
    .factory('activityService', [
        '$http',
        'apiDomain',
        'apiVersion',
        'StockModel',
        'ZoneActivityModel',
        function ($http, apiDomain, apiVersion, Stock, ZoneActivity) {

            function toZoneActivity(activityJSON) {
                let [candleLen, candleType] = activityJSON['Timescale']['Candle size'].split(' ');
                let [lookbackLen, lookbackType] = activityJSON['Timescale']['Look back'].split(' ');

                let pivots = [];
                for (let pivotJSON of activityJSON['Pivots']) {
                    pivots.push({
                        type: pivotJSON['Type'],
                        x: moment.utc(pivotJSON['x_coord']),
                        y: pivotJSON['y_coord'],
                    });
                }

                let zoneType = activityJSON['Zone Type'];

                return new ZoneActivity({
                    pivots,
                    lookback: moment.duration(parseInt(lookbackLen), lookbackType),
                    candleRes: moment.duration(parseInt(candleLen), candleType),
                    marketPosition: activityJSON['Market Position'],
                    lookbackStart: moment.utc(activityJSON['Look Back Start']),
                    datetime: moment.utc(activityJSON['Datetime']),
                    status: activityJSON['Status'],
                    zoneType: zoneType,
                    zoneTop: activityJSON['Lines'][zoneType + ' Zone Top'].split('=')[1],
                    zoneBottom: activityJSON['Lines'][zoneType + ' Zone Bottom'].split('=')[1]
                });
            }

            return {

                getTrades: function (params, callback) {
                    return $http.get(apiDomain + '/activity/trade', {
                        params: {
                            version: apiVersion,
                            since_dt: params.since.format('YYYY-MM-DD[T]HH:mm:ss')
                        }
                    }).then(function (response) {
                    });
                },

                getZones: function (params, callback) {
                    return $http.get(apiDomain + '/activity/zone', {
                        params: {
                            version: apiVersion,
                            since_dt: params.since.format('YYYY-MM-DD[T]HH:mm:ss')
                        }
                    }).then(function (response) {
                        callback(Object.entries(response.data).map(([symbol, activities]) => new Stock({
                            symbol,
                            activities: activities.map(toZoneActivity)
                        })));
                    });
                }

            };
        }
    ]);
