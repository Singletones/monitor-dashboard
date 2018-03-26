'use strict';

angular
    .module('preloader', [])
    .directive('preloader', function() {
        return {
            transclude: true,
            scope: {},
            templateUrl: 'directives/preloader/preloader.template.html',
            link: function(scope, element, attr) {
                var preloader = element.children('.preloader-wrapper'),
                    content = element.children('.preloader-content');

                content.hide();

                scope.$on(attr.onLoaded, function() {
                    preloader.hide();
                    content.show();
                });

                scope.$on(attr.onPreLoad, function() {
                    content.hide();
                    preloader.show();
                });
            }
        };
    });