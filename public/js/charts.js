/**
 * Created by Gallo on 12/15/2014.
 */


$(function () {
    $('#container').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'Price Change on Top Items'
        },
        xAxis: {
            categories: ['Last Month', 'This Month', 'Today']
        },
        yAxis: {
            title: {
                text: 'Price $'
            }
        },
        series: [{
            name: 'Item 1',
            data: [24.99, 24.99, 15.99]
        }, {
            name: 'Item 2',
            data: [49.99, 49.99, 49.99]
        }, {
            name: 'Item 3',
            data: [40.00, 49.99, 37.50]
        }, {
            name: 'Item 4',
            data: [10.99, 10.99, 10.99]
        }, {
            name: 'Item 5',
            data: [5.99, 19.99, 7.50]
        }
        ]
    });
});