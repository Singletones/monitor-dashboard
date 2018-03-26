'use strict';

angular.module('utils', [])
    .factory('utils', function() {

        function DropdownItem(label, value) {
            Object.call(this);

            this.value = value || 'No value specified';

            switch (typeof label) {
                case 'function':
                    this.label = label(value);
                    break;
                case 'string':
                    this.label = label;
                    break;
                default:
                    this.label = 'No label specified';
                    break;
            }
        }

        return {
            DropdownItem: DropdownItem,

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
