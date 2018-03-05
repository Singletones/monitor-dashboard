'use strict';

angular.module('dashboardApp', ['authorizationPage', 'stockPanelList', 'services'])
    .controller('dashboardApp', [
        '$scope', 'authorizationService',
        function($scope, auth) {
            $scope.isSignedIn = false;

            auth.init(function listen(isSignedIn) {
                console.log('mainCtrl: ' + isSignedIn);

                $scope.$apply(function(scope) {
                    scope.isSignedIn = isSignedIn;
                });
            });

            $scope.signIn = function() {
                if (auth.isAuthorized) {
                    auth.getInstance().signOut();
                    auth.getInstance().disconnect();
                } else {
                    auth.getInstance().signIn();
                }
            };

            // this.$onInit = function() {
            //     $('#signButton').css({
            //         display: 'block'
            //     });
            // };
        }
    ]);