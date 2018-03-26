'use strict';

angular.module('services', ['models'])
    .constant('apiDomain', 'http://api.zuluquant.com')
    .constant('apiVersion', 'v1')

    .constant('clientId', '206864175283-qgkqfc9g2tfbi78eeqtf1gj9nc33r8of.apps.googleusercontent.com')
    // .constant('clientSecret', '7nkxbcKjoyKZYRgRI2PTF4A0')
    .constant('GSuiteDomain', 'zuluquant.com')
    .constant('apiCreds', 'enVsdXdhcnJpb3I6Ymt3d3NFNjgzcVFLU0FVZA==')
    .config([
        '$httpProvider',
        'apiCreds',
        function ($httpProvider, apiCreds) {
            $httpProvider.defaults.headers.common.Authorization = 'Basic ' + apiCreds;
        }
    ]);
