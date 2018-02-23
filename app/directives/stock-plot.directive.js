'use strict';

angular
    .module('directives')
    .directive('stockPlot', function() {
        return {
            link: function(scope, element, attr) {
                scope.$on(attr.event, function(event, plotable) {
                    plotable.plot(element[0]);
                });
            }
        };
    });
