angular.module('timePanel')
    .component('timePanel', {
        templateUrl: 'components/time-panel/time-panel.template.html',
        controller: [
            '$timeout',
            function ($timeout) {
                let $ctrl = this;

                $ctrl.$onInit = function () {
                    $ctrl.currentTime = moment.utc();
                    // $interval(function () {
                    //     $ctrl.currentTime = moment.utc();
                    // }, 30000);

                    let openingBell = new Audio('sounds/opening-bell.mp3');
                    let closingBell = new Audio('sounds/closing-bell.wav');
                    $timeout(function () {
                        openingBell.play();
                    }, 5000);

                    $timeout(function () {
                        closingBell.play();
                    }, 10000);
                };



                $ctrl.getTime = function (timeZone) {
                    return timeZone ? moment.tz($ctrl.currentTime, timeZone) : $ctrl.currentTime;
                };

                // $ctrl.setTimers = function () {
                // };
            }
        ]
    });
