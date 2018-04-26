'use strict';

angular
    .module('settingsPopup')
    .component('settingsPopup', {
        templateUrl: 'settings-popup.template.html',
        controller: [
            '$scope',
            
            function ($scope) {
                let $ctrl = this;

                $ctrl.$onInit = function () {
                    $('.modal').modal();
                    $('.modal').modal({
                        dismissible: false, // Modal can be dismissed by clicking outside of the modal
                        opacity: .5, // Opacity of modal background
                        inDuration: 300, // Transition in duration
                        outDuration: 200, // Transition out duration
                        startingTop: '35%', // Starting top style attribute
                        endingTop: '20%' // Ending top style attribute

                    });
                    $('.modal').css('width', '25%');
                };


                $ctrl.$postLink = function () {
                    // $scope.$applyAsync(function () {
                    //     $('select').material_select();
                    // });
                };
            }
        ]
    });
