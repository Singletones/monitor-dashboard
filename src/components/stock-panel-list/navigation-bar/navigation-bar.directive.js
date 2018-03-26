'use strict';

angular.module('navigationBar', [])
    .directive('navigationBar', function () {
        return {
            templateUrl: 'components/stock-panel-list/navigation-bar/navigation-bar.template.html'
        }
    });
