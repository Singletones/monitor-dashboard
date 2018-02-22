'use strict';

angular.module('services', ['models'])
    .constant('apiDomain', 'https://13a608f2-1193-4c33-96db-dc5807db18b1.mock.pstmn.io')

    .constant('apiKey', '')
    .constant('clientId', '206864175283-qgkqfc9g2tfbi78eeqtf1gj9nc33r8of.apps.googleusercontent.com')//'911633169322-6imgubbep0p8v22tc15gv9la86d507m3.apps.googleusercontent.com')
    .constant('clientSecret', '7nkxbcKjoyKZYRgRI2PTF4A0')
    .constant('scope', 'https://www.googleapis.com/auth/activity')
    .constant('discoveryDocs', ['https://people.googleapis.com/$discovery/rest?version=v1']);
