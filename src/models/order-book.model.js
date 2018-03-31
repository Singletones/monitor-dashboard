'use strict';

angular.module('models')
    .factory('OrderBookModel', [
        () => class {
            constructor({
                Ask,
                Bid,
                datetime
            } = {}) {
                this.ask = Ask;
                this.bid = Bid;

                this.datetime = datetime;
            }

            getAsk() {
                return this.ask;
            }

            getBid() {
                return this.bid;
            }
        }
    ]);
