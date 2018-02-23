'use strict';

angular.module('models')
    .factory('TradeModel', function () {
        function Trade(args) {
            Object.call(this);

            this._timestamp = args.timestamp;
            this._price = args.price;
            this._volume = args.volume;
        }

        Object.assign(Trade.prototype, {

            getTimestamp: function () {
                return moment(this._timestamp);
            },

            getPrice: function () {
                return this._price;
            },

            getVolume: function () {
                return this._volume;
            },

            getCode: function () {
                return 'A+';
            }

        });

        return Trade;
    });
