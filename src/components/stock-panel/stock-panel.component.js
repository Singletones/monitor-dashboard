'use strict';

angular
    .module('stockPanel')
    .component('stockPanel', {
        templateUrl: 'components/stock-panel/stock-panel.template.html',
        controller: [
            'CandlesSource',
            '$scope',
            '$interval',
            'authorizationService',
            'utils',
            function(CandlesSource, $scope, $interval, auth, utils) {
                let $ctrl = this;
                let candlesSource;

                $ctrl.$onInit = function () {
                    candlesSource = new CandlesSource($ctrl.stock);
                    let autoRefresher = new utils.AutoRefresher($ctrl.loadData);

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

                    $scope.$watch('$ctrl.selectedLookback', _ => autoRefresher.refresh());
                    $scope.$watch('$ctrl.selectedResolution', interval => autoRefresher.setInterval(interval.value.asMilliseconds()));
                };

                $ctrl.$postLink = function () {
                    $ctrl.selectedLookback = $ctrl.lookbacks[5];
                    $ctrl.selectedResolution = $ctrl.resolutions[1];
                    $scope.$applyAsync(function () {
                        $('select').material_select();
                    });
                };

                $ctrl.loadData = function(manual) {
                    if (manual === true) {
                        $scope.$broadcast('candleChart_loading');
                    }
                    candlesSource.get({
                        candle_type: $ctrl.selectedResolution.value,
                        from_date: moment.utc().subtract($ctrl.selectedLookback.value),
                        to_date: moment.utc()
                    }, function(candleChart) {
                        if (manual === true) {
                            $scope.$broadcast('candleChart_loaded');
                        }
                        $ctrl.stock.setCandlesData(candleChart);
                        $ctrl.stock.updateLatestTimestamp();
                        $scope.$broadcast('candleChart_plot', candleChart);
                    });
                };

                $ctrl.expandPlot = function(){
                    var stockName = $ctrl.stock.getSymbol();
                    $('.modal').modal();
                    $('.modal').modal({
                        dismissible: true, // Modal can be dismissed by clicking outside of the modal
                        opacity: .5, // Opacity of modal background
                        inDuration: 300, // Transition in duration
                        outDuration: 200, // Transition out duration
                        startingTop: '30%', // Starting top style attribute
                        endingTop: '15%' // Ending top style attribute

                    });
                    $('.modal').css('width', '95%');
                    $('#modal'+ stockName).modal('open');
                    $scope.$broadcast('candleChart_plot', $ctrl.stock.getCandleChart());
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
