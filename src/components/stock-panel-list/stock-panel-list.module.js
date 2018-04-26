'use strict';

angular.module('stockPanelList', [
    'models',
    'stockPanel',
    'timePanel',
    'settingsPopup'
])
    .constant('stocksPerPage', 2);
