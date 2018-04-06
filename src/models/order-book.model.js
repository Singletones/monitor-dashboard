'use strict';

angular.module('models')
    .factory('OrderBookModel', [
        () => class {
            constructor({
                Ask = [],
                Bid = [],
                Datetime = moment.utc(0)
            } = {}) {
                this.ask = Ask;
                this.bid = Bid;

                this.timestamp = Datetime;
            }

            getAsk() {
                return this.ask;
            }

            getBid() {
                return this.bid;
            }

            getTimestamp() {
                return this.timestamp;
            }

            getLevelsRatio(level) {
                let askSize = 0, bidSize = 0;

                for (let i = 0; i < level; i++) {
                    askSize += this.ask[i].Volume;
                    bidSize += this.bid[i].Volume;
                }

                return bidSize/askSize;
            }
        }
    ]);
