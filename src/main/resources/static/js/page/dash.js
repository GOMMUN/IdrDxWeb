/**
 * 
 */
$(function(){
	chart1();
	chart2();
	chart3();
	chart5();
	chart6();
	chart7();
});



function chart1(){
	Highcharts.chart('chart1', {
    chart: {
        type: 'column'
    },
    title: {
        text: '대표기업 월별 공정별 생산실적',
        align: 'left'
    },
    xAxis: {
        categories: ['USA', 'China', 'Brazil', 'EU', 'India', 'Russia'],
        crosshair: true,
        accessibility: {
            description: 'Countries'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: '1000 metric tons (MT)'
        }
    },
    tooltip: {
        valueSuffix: ' (1000 MT)'
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
        {
            name: 'Corn',
            data: [406292, 260000, 107000, 68300, 27500, 14500]
        },
        {
            name: 'Wheat',
            data: [51086, 136000, 5500, 141000, 107180, 77000]
        },
        {
            name: 'asf',
            data: [51086, 136000, 5500, 141000, 107180, 77000]
        }
    ]
});

}

function chart2(){
	Highcharts.chart('chart2', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Corn vs wheat estimated production for 2020',
        align: 'left'
    },
    subtitle: {
        text:
            'Source: <a target="_blank" ' +
            'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
        align: 'left'
    },
    xAxis: {
        categories: ['USA', 'China', 'Brazil', 'EU', 'India', 'Russia'],
        crosshair: true,
        accessibility: {
            description: 'Countries'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: '1000 metric tons (MT)'
        }
    },
    tooltip: {
        valueSuffix: ' (1000 MT)'
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
        {
            name: 'Corn',
            data: [406292, 260000, 107000, 68300, 27500, 14500]
        },
        {
            name: 'Wheat',
            data: [51086, 136000, 5500, 141000, 107180, 77000]
        }
    ]
});

}

function chart3(){
	Highcharts.chart('chart3', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Corn vs wheat estimated production for 2020',
        align: 'left'
    },
    subtitle: {
        text:
            'Source: <a target="_blank" ' +
            'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
        align: 'left'
    },
    xAxis: {
        categories: ['USA', 'China', 'Brazil', 'EU', 'India', 'Russia'],
        crosshair: true,
        accessibility: {
            description: 'Countries'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: '1000 metric tons (MT)'
        }
    },
    tooltip: {
        valueSuffix: ' (1000 MT)'
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
        {
            name: 'Corn',
            data: [406292, 260000, 107000, 68300, 27500, 14500]
        }
       
    ]
});

}

function chart5(){
	Highcharts.chart('chart5', {

    title: {
        text: 'U.S Solar Employment Growth',
        align: 'left'
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
        
        data: [43934, 48656, 65165, 81827, 112143, 142383,
            171533, 165174, 155157, 161454, 154610]
    }, {
        
        data: [24916, 37941, 29742, 29851, 32490, 30282,
            38121, 36885, 33726, 34243, 31050]
    }, {
        
        data: [11744, 30000, 16005, 19771, 20185, 24377,
            32147, 30912, 29243, 29213, 25663]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
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

}

function chart6(){
Highcharts.chart('chart6', {

    chart: {
        type: 'variwide'
    },

    title: {
        text: 'Labor Costs in Europe, 2016'
    },

    subtitle: {
        text: 'Source: <a href="http://ec.europa.eu/eurostat/web/' +
            'labour-market/labour-costs/main-tables">eurostat</a>'
    },

    xAxis: {
        type: 'category'
    },

    caption: {
        text: 'Column widths are proportional to GDP'
    },

    legend: {
        enabled: false
    },

    series: [{
        name: 'Labor Costs',
        data: [
            ['Norway', 50.2, 335504],
            ['Denmark', 42, 277339],
            ['Belgium', 39.2, 421611],
            ['Sweden', 38, 462057],
            ['France', 35.6, 2228857],
            ['Netherlands', 34.3, 702641],
            ['Finland', 33.2, 215615],
            ['Germany', 33.0, 3144050],
            ['Austria', 32.7, 349344],
            ['Ireland', 30.4, 275567],
            ['Italy', 27.8, 1672438],
            ['United Kingdom', 26.7, 2366911],
            ['Spain', 21.3, 1113851],
            ['Greece', 14.2, 175887],
            ['Portugal', 13.7, 184933],
            ['Czech Republic', 10.2, 176564],
            ['Poland', 8.6, 424269],
            ['Romania', 5.5, 169578]

        ],
        dataLabels: {
            enabled: true,
            format: '€{point.y:.0f}'
        },
        tooltip: {
            pointFormat: 'Labor Costs: <b>€ {point.y}/h</b><br>' +
                'GDP: <b>€ {point.z} million</b><br>'
        },
        borderRadius: 3,
        colorByPoint: true
    }]

});

}

function chart7(){
	const text =
        'Chapter 1. Down the Rabbit-Hole ' +
        'Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: ' +
        'once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations ' +
        'in it, \'and what is the use of a book,\' thought Alice \'without pictures or conversation?\'' +
        'So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy ' +
        'and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking ' +
        'the daisies, when suddenly a White Rabbit with pink eyes ran close by her.',
    lines = text.replace(/[():'?0-9]+/g, '').split(/[,\. ]+/g),
    data = lines.reduce((arr, word) => {
        let obj = Highcharts.find(arr, obj => obj.name === word);
        if (obj) {
            obj.weight += 1;
        } else {
            obj = {
                name: word,
                weight: 1
            };
            arr.push(obj);
        }
        return arr;
    }, []);

Highcharts.chart('chart7', {
    accessibility: {
        screenReaderSection: {
            beforeChartFormat: '<h5>{chartTitle}</h5>' +
                '<div>{chartSubtitle}</div>' +
                '<div>{chartLongdesc}</div>' +
                '<div>{viewTableButton}</div>'
        }
    },
    series: [{
        type: 'wordcloud',
        data,
        name: 'Occurrences'
    }],
    title: {
        text: 'Wordcloud of Alice\'s Adventures in Wonderland',
        align: 'left'
    },
    subtitle: {
        text: 'An excerpt from chapter 1: Down the Rabbit-Hole',
        align: 'left'
    },
    tooltip: {
        headerFormat: '<span style="font-size: 16px"><b>{point.key}</b></span><br>'
    }
});

}