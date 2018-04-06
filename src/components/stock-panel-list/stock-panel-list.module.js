'use strict';

angular.module('stockPanelList', [
    'models',
    'stockPanel',
    'timePanel'
])
    .constant('stocksPerPage', 2);
