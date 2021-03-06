'use strict';

angular.module('models')
    .factory('TradeModel', [
        () => class {
            constructor({
                timestamp,
                price,
                volume,
                tradeCode,
                executionLevel,
                ID
            } = {}) {
                this._timestamp = timestamp;
                this._price = price;
                this._volume = volume;
                this._code = tradeCode;
                this._level = executionLevel;
                this._id = ID;
            }

            getID() {
                return this._id;
            }

            getTimestamp() {
                return moment.utc(this._timestamp);
            }

            getPrice() {
                return this._price;
            }

            getVolume() {
                return this._volume;
            }

            getCode() {
                return this._code;
            }

            getExecutionLevel() {
                return this._level;
            }
        }
    ]);
