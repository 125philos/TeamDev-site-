var chart = null;

var myData = [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175];
var myData2 = [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434];
var myData3 = [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387];
var myData4 = [null, null, 7988, 12169, 15112, 22452, 34400, 34227];

    $(document).ready(function() {
    chart = new Highcharts.Chart('container', {

        title: {
            text: 'Solar Employment Growth by Sector, 2010-2016'
        },

        subtitle: {
            text: 'Source: thesolarfoundation.com'
        },

        yAxis: {
            title: {
                text: 'Number of Employees'
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
        },

        series: [{
            name: 'Installation',
            data: myData
        }, {
            name: 'Manufacturing',
            data: myData2
        }, {
            name: 'Sales & Distribution',
            data: myData3
        }, {
            name: 'Project Development',
            data: myData4
        }, {
            name: 'Other',
            data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 1000,
                    maxHeight: 600
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
});