'use strict';

angular
    .module('directives')
    .directive('stockPlot', function() {
        return {
            link: function(scope, element, attr) {
                $('select').material_select();
                scope.$on(attr.event, function(event, candleChart) {
                    plot(element[0], candleChart);
                });
            }
        };
    });

function plot(domElement, candleChart) {
    var trace1 = {

        x: candleChart.unpackXaxis().slice(1),

        open: candleChart.unpack('open'),
        close: candleChart.unpack('close'),
        high: candleChart.unpack('high'),
        low: candleChart.unpack('low'),


        decreasing: { line: { color: '#7F7F7F' } },
        increasing: { line: { color: '#17BECF' } },
        line: { color: 'rgba(31,119,180,1)' },

        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
    };

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
            range: candleChart.getRange(),
            rangeslider: { range: candleChart.getRange() },
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

    Plotly.newPlot(domElement, [trace1], layout);
}