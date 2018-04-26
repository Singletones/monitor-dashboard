angular.module('stockPanelsTabs')
    .component('stockPanelsTabs', {
        templateUrl: 'stock-panels-tabs.template.html',
        controller: [
            '$scope',
            'StockModel',
            'activityService',
            function ($scope, Stock, activityService) {
                let $ctrl = this;

                $ctrl.$onInit = function () {
                    $ctrl.stocks = [
                        new Stock({
                            symbol: 'GPRO',
                            market: 'NASDAQ'
                        })
                    ];

                    $ctrl.inZoneStocks = [];

                    activityService.getZones({
                        since: moment.utc().subtract(30, 'seconds')
                    }, stocks => {
                        $ctrl.inZoneStocks = stocks;
                    });

                };

                $ctrl.$postLink = function () {
                    $scope.$applyAsync(function () {
                        $('.tabs').tabs();
                    });
                };
            }
        ]
    });
