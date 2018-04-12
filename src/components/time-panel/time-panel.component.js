angular.module('timePanel')
    .component('timePanel', {
        templateUrl: 'time-panel.template.html',
        controller: [
            '$interval',
            '$timeout',
            function ($interval, $timeout) {
                let $ctrl = this;

                $ctrl.$onInit = function () {
                    $ctrl.currentTime = moment.utc();
                    $interval(function () {
                        $ctrl.currentTime = moment.utc();
                    }, 30000);

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

                $ctrl.$postLink = function () {
                    if ($(window).width() < 1550 && $(window).width() > 1200) {
                        $('#toggle-panel').removeClass('time-panel col s3').addClass('time-panel col s4');
                    } else if ($(window).width() < 1200 && $(window).width() > 900) {
                        $('#toggle-panel').removeClass('time-panel col s3').addClass('time-panel col s5');
                    } else if ($(window).width() < 900 && $(window).width() > 750) {
                        $('#toggle-panel').removeClass('time-panel col s3').addClass('time-panel col s6');
                    } else if ($(window).width() < 750 && $(window).width() > 600) {
                        $('#toggle-panel').removeClass('time-panel col s3').addClass('time-panel col s8 offset-s2');
                    } else if ($(window).width() < 600 && $(window).width() > 100) {
                        $('#toggle-panel').removeClass('time-panel col s3').addClass('time-panel col s12');
                    }
                    // else if ($(window).width() < 800 && $(window).width() > 600) {
                    //     $('#toggle-input').removeClass('input-field col s3 offset-s4').addClass('input-field col s6 offset-s2');
                    //     $('#toggle-btn').removeClass('input-field col s1').addClass('input-field col s4');
                    // } else if ($(window).width() < 600) {
                    //     $('#toggle-input').removeClass('input-field col s3 offset-s4').addClass('input-field col s6 offset-s1');
                    //     $('#toggle-btn').removeClass('input-field col s3').addClass('input-field col s5');
                    // }
                };
            }
        ]
    });
