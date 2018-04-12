'use strict';

angular
    .module('stockPanel')
    .component('stockPanel', {
        templateUrl: 'stock-panel.template.html',
        controller: [
            'CandlesSource',
            '$scope',
            'authorizationService',
            'utils',
            function(CandlesSource, $scope, auth, utils) {
                let $ctrl = this;
                let candlesSource;

                function label(duration) {
                    return duration.format('d [day] h [hour] m [minute] s [second]', {
                        trim: 'both'
                    });
                }

                $ctrl.$onInit = function () {
                    candlesSource = new CandlesSource($ctrl.stock);
                    if (!$ctrl.stock.isInZone()) {
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
                    }
                };

                $ctrl.$postLink = function () {
                    if ($ctrl.stock.isInZone()) {
                        $ctrl.plotInZone();
                    }
                    else {
                        $ctrl.selectedLookback = $ctrl.lookbacks[5];
                        $ctrl.selectedResolution = $ctrl.resolutions[1];
                    }
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
                    let stockName = $ctrl.stock.getSymbol();
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
                    $scope.$broadcast('expandedCandleChart_plot', $ctrl.stock.getCandleChart());
                };

                $ctrl.plotInZone = function () {
                    let activity = $ctrl.stock.getActivities()[0];

                    $scope.$broadcast('candleChart_loading');
                    candlesSource.get({
                        candle_type: activity._candleRes,
                        from_date: activity._fromDate,
                        to_date: activity._toDate
                    }, function(candleChart) {
                        $scope.$broadcast('candleChart_loaded');

                        $ctrl.stock.setCandlesData(candleChart);
                        $ctrl.stock.updateLatestTimestamp();

                        $scope.$broadcast('candleChart_plot', {

                            plot: function (domElement) {
                                let candleTrace = {
                                    name: $ctrl.stock.getSymbol(),

                                    x: candleChart.unpackXaxis(),

                                    open: candleChart.unpack('open'),
                                    close: candleChart.unpack('close'),
                                    high: candleChart.unpack('high'),
                                    low: candleChart.unpack('low'),

                                    decreasing: { line: { color: '#f44336' } },
                                    increasing: { line: { color: '#4caf50' } },
                                    line: { color: 'rgba(31,119,180,1)' },

                                    type: 'candlestick'
                                };
                                let highPivotsTrace = {
                                    x: activity.unpackPivotsXaxis('top'),
                                    y: activity.unpackPivotsYaxis('top'),
                                    type: 'scatter',
                                    name: 'High Pivots'
                                };
                                let lowPivotsTrace = {
                                    x: activity.unpackPivotsXaxis('bottom'),
                                    y: activity.unpackPivotsYaxis('bottom'),
                                    type: 'scatter',
                                    name: 'Low Pivots'
                                };
                                let validLowPivotsTrace = {
                                    x: activity.unpackPivotsXaxis('valid bottom'),
                                    y: activity.unpackPivotsYaxis('valid bottom'),
                                    type: 'scatter',
                                    name: 'Valid Low Pivots'
                                };
                                let zoneTopTrace = {
                                    x: candleChart.getRange(),
                                    y: [activity._zone.top, activity._zone.top],
                                    mode: 'lines',
                                    name: activity._zone.type + ' Zone Top',
                                    line: { color: activity._zone.color }
                                };
                                let zoneBottomTrace = {
                                    x: candleChart.getRange(),
                                    y: [activity._zone.bottom, activity._zone.bottom],
                                    mode: 'lines',
                                    name: activity._zone.type + ' Zone Bottom',
                                    line: { color: activity._zone.color }
                                };

                                let layout = {
                                    paper_bgcolor: 'rgba(0,0,0,0)',
                                    plot_bgcolor: 'rgba(0,0,0,0)',
                                    dragmode: 'zoom',
                                    margin: {
                                        r: 0,
                                        t: 10,
                                        b: 20,
                                        l: 35
                                    },
                                    showlegend: true,
                                    xaxis: {
                                        autorange: true,
                                        range: candleChart.getRange(),
                                        rangeslider: { range: candleChart.getRange() },
                                        title: 'Date',
                                        type: 'category',
                                        categoryorder: 'category ascending'
                                    },
                                    yaxis: {
                                        autorange: true,
                                        title: 'Price',
                                        type: 'linear'
                                    }
                                };

                                Plotly.newPlot(domElement, [
                                    candleTrace,
                                    highPivotsTrace,
                                    lowPivotsTrace,
                                    validLowPivotsTrace,
                                    zoneTopTrace,
                                    zoneBottomTrace
                                ], layout);
                            }

                        });
                    });
                }

            }
        ],
        bindings: {
            stock: '<'
        }
    });
