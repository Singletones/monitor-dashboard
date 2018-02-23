'use strict';

angular.module('utils', [])
    .factory('utils', function() {
        return {
            toDuration: function (durationStr) {
                var candleRes = parseInt(durationStr);
                return moment.duration(
                    candleRes,
                    durationStr[(candleRes + '').length + 1]
                );
            },

            timestampToMoment: function (timestamp) {
                return moment('01.01.2000 00:00:00', 'DD.MM.YYYY HH:mm:ss').add(timestamp, 'seconds');
            }
        };
    });
