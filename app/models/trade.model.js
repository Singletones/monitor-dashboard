'use strict';

angular.module('models')
    .factory('TradeModel', function () {
        function Trade(args) {
            Object.call(this);

            this._timestamp = args.timestamp;
            this._price = args.price;
            this._volume = args.volume;
            this._code = args.tradeCode;
            this._level = args.executionLevel;
        }

        Object.assign(Trade.prototype, {

            getTimestamp: function () {
                return moment.utc(this._timestamp);
            },

            getPrice: function () {
                return this._price;
            },

            getVolume: function () {
                return this._volume;
            },

            getCode: function () {
                return this._code;
            },

            getExecutionLevel: function () {
                return this._level;
            }

        });

        return Trade;
    });
