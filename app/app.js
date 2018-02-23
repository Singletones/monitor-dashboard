'use strict';

angular.module('dashboardApp', ['authorizationPage', 'stockPanelList', 'services'])
    .controller('dashboardApp', ['$scope', 'authorizationService', function ($scope, auth) {
        $scope.isSignedIn = false;
        auth.init(function listen(isSignedIn) {
            $scope.isSignedIn = isSignedIn;
        });

        $scope.signIn = function () {
            if (auth.isAuthorized) {
                auth.getInstance().signOut();
                auth.getInstance().disconnect();
            }
            else {
                auth.getInstance().signIn();
            }
        }
    }]);
