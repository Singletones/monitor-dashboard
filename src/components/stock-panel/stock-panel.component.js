'use strict';

angular
    .module('stockPanel')
    .component('stockPanel', {
        templateUrl: 'components/stock-panel/stock-panel.template.html',
        controller: [
            'candlesService',
            '$scope',
            '$interval',
            'authorizationService',
            'utils',
            function(candlesService, $scope, $interval, auth, utils) {
                var $ctrl = this;

                $ctrl.loadData = function() {
                    $scope.$broadcast('candleChartLoading');

                    candlesService.get({
                        symbol: $ctrl.stock.getSymbol(),
                        candle_type: $ctrl.selectedResolution.value,
                        from_date: moment.utc().subtract($ctrl.selectedLookback.value),
                        to_date: moment.utc()
                    }, function(candleChart) {
                        $ctrl.stock.updateLatestTimestamp();
                        $scope.$broadcast('candleChartLoaded');
                        $scope.$broadcast('candlePlotUpdate', candleChart);
                    });
                };
                $ctrl.update = function () {
                    if ($ctrl.timeoutId) {
                        $interval.cancel($ctrl.timeoutId);
                    }

                    var updateInterval = $ctrl.selectedResolution.value;
                    $ctrl.timeoutId = $interval($ctrl.loadData, updateInterval.asMilliseconds());


                    $ctrl.loadData();
                };

                $ctrl.lookbacks = [
                    new utils.DropdownItem(label, moment.duration(30, 'minutes')),
                    new utils.DropdownItem(label, moment.duration(1, 'hours')),
                    new utils.DropdownItem(label, moment.duration(2, 'hours')),
                    new utils.DropdownItem(label, moment.duration(6, 'hours')),
                    new utils.DropdownItem(label, moment.duration(12, 'hours')),
                    new utils.DropdownItem(label, moment.duration(1, 'days')),
                    new utils.DropdownItem(label, moment.duration(2, 'days')),
                    new utils.DropdownItem(label, moment.duration(3, 'days')),
                    new utils.DropdownItem(label, moment.duration(4, 'days')),
                    new utils.DropdownItem(label, moment.duration(5, 'days')),
                    new utils.DropdownItem(label, moment.duration(6, 'days')),
                    new utils.DropdownItem(label, moment.duration(7, 'days')),
                    new utils.DropdownItem(label, moment.duration(8, 'days'))
                ];
                $ctrl.resolutions = [
                    new utils.DropdownItem(label, moment.duration(1, 'minutes')),
                    new utils.DropdownItem(label, moment.duration(5, 'minutes')),
                    new utils.DropdownItem(label, moment.duration(15, 'minutes')),
                    new utils.DropdownItem(label, moment.duration(30, 'minutes')),
                    new utils.DropdownItem(label, moment.duration(1, 'hour')),
                    new utils.DropdownItem(label, moment.duration(2, 'hour')),
                    new utils.DropdownItem(label, moment.duration(5, 'hour')),
                    new utils.DropdownItem(label, moment.duration(10, 'hour')),
                    new utils.DropdownItem(label, moment.duration(1, 'day'))
                ];

                $scope.$watch('$ctrl.selectedLookback', $ctrl.update);
                $scope.$watch('$ctrl.selectedResolution', $ctrl.update);

                $ctrl.$postLink = function () {
                    $ctrl.selectedLookback = $ctrl.lookbacks[5];
                    $ctrl.selectedResolution = $ctrl.resolutions[1];
                    $scope.$applyAsync(function () {
                        $('select').material_select();
                    });
                };
            }
        ],
        bindings: {
            stock: '<'
        }
    });

function label(duration) {
    return duration.format('d [day] h [hour] m [minute] s [second]', {
        trim: 'both'
    });
}
