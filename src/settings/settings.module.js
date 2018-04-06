'use strict';

angular.module('settings', [])
    .value('orderBookRefreshRate', moment.duration(30, 'seconds'))
    .value('tradesRefreshRate', moment.duration(30, 'seconds'))
    .value('orderBookMaxPeriods', 10)
    .value('tradesMaxPeriods', 10);
