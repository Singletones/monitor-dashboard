'use strict';

angular.module('models')
    .factory('OrderBookModel', function () {
        function OrderBook(args) {
            Object.call(this);

            this.Ask = args.Ask;
            this.Bid = args.Bid;

            this.datetime = args.datetime;
        }

        Object.assign(OrderBook.prototype, {

            getAsk: function () {
                return this.Ask;
            },

            getBid: function () {
                return this.Bid;
            }

        });

        return OrderBook;
    });
