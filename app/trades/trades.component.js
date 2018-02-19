'use strict';

angular
    .module('trades')
    .component('trades', {
        templateUrl: 'trades/trades.template.html',
        controller: function GreetUserController() {
            this.user = 'world';
        }
    });