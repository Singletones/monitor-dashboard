'use strict';

angular.module('utils', [])
    .factory('utils', [
        '$interval',
        function($interval) {

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

                AutoRefresher: class {
                    constructor(updateFn, updateInterval) {
                        this._updateFn = updateFn;
                        if (updateInterval) {
                            this.setInterval(updateInterval);
                        }
                    }

                    refresh() {
                        this._updateFn(true);
                    }

                    setInterval(updateInterval) {
                        if (this._timeoutId) {
                            $interval.cancel(this._timeoutId);
                        }

                        this._timeoutId = $interval(this._updateFn, updateInterval);


                        this._updateFn(true);
                    }
                },

                toDuration: function (durationStr) {
                    let candleRes = parseInt(durationStr);
                    return moment.duration(
                        candleRes,
                        durationStr[(candleRes + '').length + 1]
                    );
                },

                timestampToMoment: function (timestamp) {
                    return moment('01.01.2000 00:00:00', 'DD.MM.YYYY HH:mm:ss').add(timestamp, 'seconds');
                }
            };
        }
    ]);
