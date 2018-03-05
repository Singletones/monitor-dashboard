'use strict';

angular.module('authorizationPage')
    .component('authorizationPage', {
        templateUrl: 'authorization-page/authorization-page.template.html',
        controller: ['$scope', function($scope) {
            var $ctrl = this;

            $ctrl.$onInit = function() {
                console.dir($ctrl.onSignIn);
                console.dir($ctrl);
                $('.modal').modal();
                $('.modal').modal({
                    dismissible: false, // Modal can be dismissed by clicking outside of the modal
                    opacity: .5, // Opacity of modal background
                    inDuration: 300, // Transition in duration
                    outDuration: 200, // Transition out duration
                    startingTop: '35%', // Starting top style attribute
                    endingTop: '20%', // Ending top style attribute

                });
                $('.modal').css('width', '25%');
                $('#modal1').modal('open');
            };

            $ctrl.$onDestroy = function() {
                $('#modal1').modal('close');
            };

            $ctrl.signIn = function() {
                $ctrl.onSignIn();
            };
        }],
        bindings: {
            onSignIn: '&'
        }
    });