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
            }
        };
    });
