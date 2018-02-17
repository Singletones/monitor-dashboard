'use strict';

angular
    .module('directives')
    .directive('stockPlot', function () {
        return {
            require: '^stockPanel',
            link: function (scope, element, attr, stockPanel) {
                // debugger;

                function updatePlot() {
                    stockPanel.loadData(function (resolution, data) {
                        debugger;
                        plot(element[0], resolution, data);
                    });
                }

                scope.$watch('$ctrl.resolution.fromDate', updatePlot);
                scope.$watch('$ctrl.resolution.endDate', updatePlot);
            }
        };
    });

function plot(domElement, resolution, data) {
    var trace1 = {

        x: [],
        //x: ['2017-01-04', '2017-01-05', '2017-01-06', '2017-01-09', '2017-01-10', '2017-01-11', '2017-01-12', '2017-01-13', '2017-01-17', '2017-01-18', '2017-01-19', '2017-01-20', '2017-01-23', '2017-01-24', '2017-01-25', '2017-01-26', '2017-01-27', '2017-01-30', '2017-01-31', '2017-02-01', '2017-02-02', '2017-02-03', '2017-02-06', '2017-02-07', '2017-02-08', '2017-02-09', '2017-02-10', '2017-02-13', '2017-02-14', '2017-02-15'],

        close: [],

        decreasing: {line: {color: '#7F7F7F'}},

        high: [],

        increasing: {line: {color: '#17BECF'}},

        line: {color: 'rgba(31,119,180,1)'},

        low: [],

        open: [],

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
    };

    for (var i = new Date(resolution.fromDate); i <= resolution.endDate; i.setDate(i.getDate() + 1)) {
        trace1.x.push(dateToStr(i));
    }

    for (var i = 0; i < data.length; i++) {
        trace1.open.push(data[i].open);
        trace1.close.push(data[i].close);
        trace1.high.push(data[i].high);
        trace1.low.push(data[i].low);
    }
    debugger;

    var layout = {
        dragmode: 'zoom',
        margin: {
            r: 10,
            t: 25,
            b: 40,
            l: 60
        },
        showlegend: false,
        xaxis: {
            autorange: true,
            domain: [0, 1],
            range: [dateToStr(resolution.fromDate), dateToStr(resolution.endDate)],
            rangeslider: {range: [dateToStr(resolution.fromDate), dateToStr(resolution.endDate)]},
            title: 'Date',
            type: 'date'
        },
        yaxis: {
            autorange: true,
            domain: [0, 1],
            range: [114.609999778, 137.410004222],
            type: 'linear'
        }
    };

    Plotly.plot(domElement, [trace1], layout);
}

function dateToStr(date) {
    return date.getFullYear()
        + '-' + (date.getMonth() + 1)
        + '-' + date.getDate();
        // + ' ' + date.getHours()
        // + ':' + date.getMinutes();
}
