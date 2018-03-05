'use strict';

angular
    .module('stockPanel')
    .component('stockPanel', {
        templateUrl: 'stock-panel/stock-panel.template.html',
        controller: [
            'candlesService',
            '$scope',
            '$interval',
            'authorizationService',
            function(candlesService, $scope, $interval, auth) {
                var ctrl = this;

                ctrl.loadData = function() {
                    candlesService.get({
                        symbol: ctrl.stock.getSymbol(),
                        candleType: ctrl.selectedResolution.duration,
                        fromDate: moment().subtract(ctrl.selectedLookback.duration),
                        endDate: moment()
                    }, function(candleChart) {
                        ctrl.stock.updateLatestTimestamp();
                        $scope.$broadcast('candleChartUpdate', candleChart);
                    });
                };
                ctrl.update = function () {
                    if (ctrl.timeoutId) {
                        $interval.cancel(ctrl.timeoutId);
                    }

                    var updateInterval = ctrl.selectedResolution.duration;
                    ctrl.timeoutId = $interval(ctrl.loadData, updateInterval.asMilliseconds());


                    ctrl.loadData();
                };

                ctrl.lookbacks = [
                    new DropdownItem(moment.duration(1, 'minutes')),
                    new DropdownItem(moment.duration(5, 'minutes')),
                    new DropdownItem(moment.duration(15, 'minutes')),
                    new DropdownItem(moment.duration(30, 'minutes')),
                    new DropdownItem(moment.duration(1, 'hours')),
                    new DropdownItem(moment.duration(2, 'hours')),
                    new DropdownItem(moment.duration(6, 'hours')),
                    new DropdownItem(moment.duration(12, 'hours')),
                    new DropdownItem(moment.duration(1, 'days')),
                    new DropdownItem(moment.duration(2, 'days')),
                    new DropdownItem(moment.duration(3, 'days')),
                    new DropdownItem(moment.duration(4, 'days')),
                    new DropdownItem(moment.duration(5, 'days')),
                    new DropdownItem(moment.duration(6, 'days')),
                    new DropdownItem(moment.duration(7, 'days')),
                    new DropdownItem(moment.duration(8, 'days'))
                ];
                ctrl.resolutions = [
                    new DropdownItem(moment.duration(1, 'seconds')),
                    new DropdownItem(moment.duration(5, 'seconds')),
                    new DropdownItem(moment.duration(10, 'seconds')),
                    new DropdownItem(moment.duration(30, 'seconds')),
                    new DropdownItem(moment.duration(1, 'minutes')),
                    new DropdownItem(moment.duration(5, 'minutes')),
                    new DropdownItem(moment.duration(15, 'minutes')),
                    new DropdownItem(moment.duration(30, 'minutes')),
                    new DropdownItem(moment.duration(1, 'hour')),
                    new DropdownItem(moment.duration(2, 'hour')),
                    new DropdownItem(moment.duration(5, 'hour')),
                    new DropdownItem(moment.duration(10, 'hour')),
                    new DropdownItem(moment.duration(1, 'days')),
                    new DropdownItem(moment.duration(5, 'days'))
                ];

                $scope.$watch('$ctrl.selectedLookback', ctrl.update);
                $scope.$watch('$ctrl.selectedResolution', ctrl.update);

                ctrl.$postLink = function () {
                    ctrl.selectedLookback = ctrl.lookbacks[4];
                    ctrl.selectedResolution = ctrl.resolutions[4];
                    $scope.$applyAsync(function () {
                        $('select').material_select();
                    });
                };

                ctrl.print = function() {
                    // debugger;
                    // console.dir(ctrl);
                    // $('select').material_select();
                    if (auth.isAuthorized) {
                        console.dir(auth.getUser().getHostedDomain());
                    }
                    else {
                        console.log('Nobody is authorized');
                    }

                };
            }
        ],
        bindings: {
            stock: '<'
        }
    });

function DropdownItem(duration) {
    Object.call(this);

    this.label = duration.format('d [days] h [hours] m [minutes] s [seconds]', {
        trim: 'both'
    });
    this.duration = duration;
}
