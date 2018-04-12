'use strict';

angular
    .module('preloader', [])
    .directive('preloader', function() {
        return {
            transclude: true,
            scope: {},
            templateUrl: 'preloader.template.html',
            link: function(scope, element, attr) {
                let preloader = element.children('.preloader-wrapper'),
                    content = element.children('.preloader-content');

                content.hide();

                scope.$on(attr.name + '_loaded', function() {
                    preloader.hide();
                    content.show();
                });

                scope.$on(attr.name + '_loading', function() {
                    content.hide();
                    preloader.show();
                });
            }
        };
    });