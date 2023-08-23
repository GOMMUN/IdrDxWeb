/**
 * 
 */
var chart1data = null; 
var chart2data = null;
var chart5data = null;
var chart6data = null;

$(function(){
	chart3();
	chart4();
	chart7();
	chart8();
	
	PQCDrate()
	rejectContents("8");
	selectMonthButton();
	selectDayWeekMonthButton()
	factroy();
	
	realTime();
});

function setchart1(chart1data) {
	var dateData = [];

	for (var j = 0; j <= 0; j++) {
	    dateData[j] = []; 
	    
	    for (var i = 0; i <= 5; i++) {
	        if (chart1data[j][i].dt >= 2000) {
	            dateData[j][i] = formatDate(chart1data[j][i].dt.toString(), "yyyymmdd", "월 일");
	        } else if (chart1data[j][i].dt < 2000 && chart1data[j][i].dt >= 20) {
	            dateData[j][i] = ((chart1data[j][i].dt-(chart1data[j][i].dt%100))/100) + '월' + (chart1data[j][i].dt%100).toString() + '주';
	        } else if (chart1data[j][i].dt < 20) {
	            dateData[j][i] = chart1data[j][i].dt.toString() + '월';
	        }
	    }
	}

	function formatDate(dateString, inputFormat, outputFormat) {
	    const year = inputFormat === "yyyymmdd" ? dateString.slice(0, 4) : dateString.slice(0, 2);
	    const month = parseInt(dateString.slice(4, 6));
	    const day = parseInt(dateString.slice(6, 8));
	
	    const monthString = `${month}${outputFormat[0]}`;
	    const dayString = `${day}${outputFormat[2]}`;
	
	    return `${monthString} ${dayString}`;
	}
	
	Highcharts.chart('chart1', {
		chart: {
			type: 'column'
		},
		title: {
			text: '대표기업 공정별 생산실적',
			align: 'left'
		},
		xAxis: {
			categories: [dateData[0][0], dateData[0][1], dateData[0][2], dateData[0][3], dateData[0][4], dateData[0][5]],
			crosshair: true,
			accessibility: {
				description: 'Month'
			}
		},
		yAxis: {
			min: 0,
			title: {
				text: ''
			}
		},
		plotOptions: {
			column: {
				pointPadding: 0.2,
				borderWidth: 0
			},
			series : {
				minPointLength:3
			}
		},
		series: [
			{
				name: chart1data[0][0].lineid,
				data: [Number(chart1data[0][0].prodQty), Number(chart1data[0][1].prodQty), 
				Number(chart1data[0][2].prodQty), Number(chart1data[0][3].prodQty),
				Number(chart1data[0][4].prodQty), Number(chart1data[0][5].prodQty)],
				color: '#0D70C6'
			},
			{
				name: chart1data[1][0].lineid,
				data: [Number(chart1data[1][0].prodQty), Number(chart1data[1][1].prodQty), 
				Number(chart1data[1][2].prodQty), Number(chart1data[1][3].prodQty),
				Number(chart1data[1][4].prodQty), Number(chart1data[1][5].prodQty)],
				color: '#009CD8'
			},
			{
				name: chart1data[2][0].lineid,
				data: [Number(chart1data[2][0].prodQty), Number(chart1data[2][1].prodQty), 
				Number(chart1data[2][2].prodQty), Number(chart1data[2][3].prodQty),
				Number(chart1data[2][4].prodQty), Number(chart1data[2][5].prodQty)],
				color: '#09D0D9'
			},
			{
				name: chart1data[3][0].lineid,
				data: [Number(chart1data[3][0].prodQty), Number(chart1data[3][1].prodQty), 
				Number(chart1data[3][2].prodQty), Number(chart1data[3][3].prodQty),
				Number(chart1data[3][4].prodQty), Number(chart1data[3][5].prodQty)],
				color: '#0DCF9C'
			}
		]
	});
}

function setchart2(){
	var dateData = [];

	for (var j = 0; j <= 0; j++) {
	    dateData[j] = []; 
	    
	    for (var i = 0; i <= 5; i++) {
	        if (chart2data[j][i].dt >= 2000) {
	            dateData[j][i] = formatDate(chart2data[j][i].dt.toString(), "yyyymmdd", "월 일");
	        } else if (chart2data[j][i].dt < 2000 && chart2data[j][i].dt >= 20) {
	            dateData[j][i] = ((chart2data[j][i].dt-(chart2data[j][i].dt%100))/100) + '월' + (chart2data[j][i].dt%100).toString() + '주';
	        } else if (chart2data[j][i].dt < 20) {
	            dateData[j][i] = chart2data[j][i].dt.toString() + '월';
	        }
	    }
	}

	function formatDate(dateString, inputFormat, outputFormat) {
	    const year = inputFormat === "yyyymmdd" ? dateString.slice(0, 4) : dateString.slice(0, 2);
	    const month = parseInt(dateString.slice(4, 6));
	    const day = parseInt(dateString.slice(6, 8));
	
	    const monthString = `${month}${outputFormat[0]}`;
	    const dayString = `${day}${outputFormat[2]}`;
	
	    return `${monthString} ${dayString}`;
	}
	
	Highcharts.chart('chart2', {
    chart: {
        type: 'column'
    },
    title: {
        text: '협력사 공정별 생산실적',
        align: 'left'
    },
    xAxis: {
        categories: [dateData[0][0], dateData[0][1], dateData[0][2], dateData[0][3], dateData[0][4], dateData[0][5]],
        crosshair: true,
        accessibility: {
            description: 'Month'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        },
        series : {
			minPointLength:3
		}
    },
    series: [
        {
            name: chart2data[0][0].lineid,
				data: [Number(chart2data[0][0].prodQty), Number(chart2data[0][1].prodQty), 
				Number(chart2data[0][2].prodQty), Number(chart2data[0][3].prodQty),
				Number(chart2data[0][4].prodQty), Number(chart2data[0][5].prodQty)],
            color: '#0D70C6'
        }
    ]
});

}

function chart3(data1, data2, data3, data4){
	Highcharts.chart('chart3', {
    chart: {
        type: 'variablepie'
    },
    title: {
        text: '불량 발생 비중',
        align: 'left'
    },
    series: [{
        minPointSize: 10,
        innerSize: '70%',
        zMin: 0,
        name: 'failurerate',
        borderRadius: 5,
        data: [{
            name: '외관',
            y: data1,
            z: 120
        }, {
            name: '기능',
            y: data2,
            z: 120
        }, {
            name: '조립',
            y: data3,
            z: 120
        }, {
            name: '재질',
            y: data4,
            z: 120
        }],
        colors: [
            '#C00500',
            '#FF85FF',
            '#993601',
            '#F78E00'
        ]
    }]
});
}

function chart4(cnt1, cnt2, cnt3, cnt4, cnt5, cnt6, cnt7, cnt8, cnt9, cnt10, cnt11, cnt12){
Highcharts.chart('chart4', {
    series: [{
        type: 'treemap',
        layoutAlgorithm: 'stripes',
        alternateStartingDirection: true,
        borderColor: '#fff',
        borderWidth: 2,
        dataLabels: {
            style: {
                textOutline: 'none'
            }
        },
        levels: [{
            level: 1,
            layoutAlgorithm: 'stripes',
            dataLabels: {
                enabled: true,
                align: 'left',
                verticalAlign: 'top',
                style: {
                    fontSize: '15px',
                    fontWeight: 'bold'
                }
            }
        }],
        data: [{
            id: 'A',
            name: '외관',
            color: '#C00500'
        }, {
            id: 'B',
            name: '기능',
            color: '#FF85FF'
        }, {
            id: 'C',
            name: '조립',
            color: '#993601'
        }, {
            id: 'D',
            name: '재질',
            color: '#F78E00'
        }, {
            name: '도장',
            parent: 'A',
            value: cnt1
        }, {
            name: '긁힘',
            parent: 'A',
            value: cnt2
        }, {
            name: '변형',
            parent: 'A',
            value: cnt3
        }, {
            name: '이색',
            parent: 'A',
            value: cnt4
        }, {
            name: '성능',
            parent: 'B',
            value: cnt5
        }, {
            name: '안전',
            parent: 'B',
            value: cnt6
        }, {
            name: '동작',
            parent: 'B',
            value: cnt7
        }, {
            name: '결합',
            parent: 'C',
            value: cnt8
        }, {
            name: '누락',
            parent: 'C',
            value: cnt9
        }, {
            name: '결합',
            parent: 'C',
            value: cnt10
        },
        {
            name: '소재',
            parent: 'D',
            value: cnt11
        },
        {
            name: '강도',
            parent: 'D',
            value: cnt12
        }]
    }],
    title: {
        text: '불량 상세 유형별 빈도 수',
        align: 'left'
    }
});

}

function setchart5(chart5data) {
	var dateData = [];

	for (var j = 0; j <= 0; j++) {
	    dateData[j] = []; 
	    
	    for (var i = 0; i <= 5; i++) {
	        if (chart5data[j][i].dt >= 2000) {
	            dateData[j][i] = formatDate(chart5data[j][i].dt.toString(), "yyyymmdd", "월 일");
	        } else if (chart5data[j][i].dt < 2000 && chart5data[j][i].dt >= 20) {
	            dateData[j][i] = ((chart5data[j][i].dt-(chart5data[j][i].dt%100))/100) + '월' + (chart5data[j][i].dt%100).toString() + '주';
	        } else if (chart5data[j][i].dt < 20) {
	            dateData[j][i] = chart5data[j][i].dt.toString() + '월';
	        }
	    }
	}

	function formatDate(dateString, inputFormat, outputFormat) {
	    const year = inputFormat === "yyyymmdd" ? dateString.slice(0, 4) : dateString.slice(0, 2);
	    const month = parseInt(dateString.slice(4, 6));
	    const day = parseInt(dateString.slice(6, 8));
	
	    const monthString = `${month}${outputFormat[0]}`;
	    const dayString = `${day}${outputFormat[2]}`;
	
	    return `${monthString} ${dayString}`;
	}
	
	var seriesData = [];

	for (var j = 0; j <= 3; j++) {
	    seriesData[j] = []; // 새로운 2차원 배열 생성
	    
	    for (var i = 0; i <= 5; i++) {
	        var percentage = 0;
	        percentage = Number((chart5data[j][i].workTotal / ((chart5data[j][i].workTotal + chart5data[j][i].notoperateTotal) == 0 ? 1 : (chart5data[j][i].workTotal + chart5data[j][i].notoperateTotal))) * 100);
	        
	        seriesData[j][i] = percentage; // 2차원 배열에 작업 완료 비율 추가
	    }
	}
	
	Highcharts.chart('chart5', {

    title: {
        text: '대표기업 설비 가동율 현황',
        align: 'left'
    },


    legend: {
        verticalAlign: 'bottom',
        align: 'center'
    },
    
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
        }
    },

    xAxis: {
        categories: [dateData[0][0], dateData[0][1], dateData[0][2], dateData[0][3], dateData[0][4], dateData[0][5]],
        crosshair: true,
        accessibility: {
            description: 'Month'
        }
    },
    
    yAxis: {
        title: {
            text: ''
        }
    },   

    series: [{
        name: chart5data[0][0].lineid,
        data: [seriesData[0][0], seriesData[0][1], seriesData[0][2], seriesData[0][3], seriesData[0][4], seriesData[0][5]],
        color:'#94F5F9'
    }, {
        name: chart5data[1][0].lineid,
        data: [seriesData[1][0], seriesData[1][1], seriesData[1][2], seriesData[1][3], seriesData[1][4], seriesData[1][5]],
        color:'#7D9632'
    }, {
        name: chart5data[2][0].lineid,
        data: [seriesData[2][0], seriesData[2][1], seriesData[2][2], seriesData[2][3], seriesData[2][4], seriesData[2][5]],
        color:'#0A9B73'
    }, {
        name: chart5data[3][0].lineid,
        data: [seriesData[3][0], seriesData[3][1], seriesData[3][2], seriesData[3][3], seriesData[3][4], seriesData[3][5]],
        color:'#4FCDFF'
    }]

});

}

function setchart6(chart6data){
	var dateData = [];

	for (var i = 0; i <= 5; i++) {
	    if (chart6data[i].dt >= 2000) {
	            dateData[i] = formatDate(chart6data[i].dt.toString(), "yyyymmdd", "월 일");
	    } else if (chart6data[i].dt < 2000 && chart6data[i].dt >= 20) {
	            dateData[i] = ((chart6data[i].dt-(chart6data[i].dt%100))/100) + '월' + (chart6data[i].dt%100).toString() + '주';
	    } else if (chart6data[i].dt < 20) {
	            dateData[i] = chart6data[i].dt.toString() + '월';
	    }
	}


	function formatDate(dateString, inputFormat, outputFormat) {
	    const year = inputFormat === "yyyymmdd" ? dateString.slice(0, 4) : dateString.slice(0, 2);
	    const month = parseInt(dateString.slice(4, 6));
	    const day = parseInt(dateString.slice(6, 8));
	
	    const monthString = `${month}${outputFormat[0]}`;
	    const dayString = `${day}${outputFormat[2]}`;
	
	    return `${monthString} ${dayString}`;
	}
	
	Highcharts.chart('chart6', {
	    chart: {
	        type: 'column'
	    },
	    
	    title: {
	        text: '대표 기업 계획 대비 실적',
	        align: 'left'
	    },
	    
	    xAxis: {
	        categories: [dateData[0], dateData[1], dateData[2], dateData[3], dateData[4], dateData[5]],
	        crosshair: true,
	        accessibility: {
	            description: 'Month'
	        }
	    },
	    
	    yAxis: {
	        min: 0,
	        title: {
	            text: ''
	        }
	    },
	    
	    plotOptions: {
	        column: {
	            pointPadding: 0.2,
	            borderWidth: 0
	        },
	        series : {
				minPointLength:3
			}
	    },
	    
	    series: [
	        {
	            name: '계획',
	            data: [Number(chart6data[0].planQty), Number(chart6data[1].planQty), 
					Number(chart6data[2].planQty), Number(chart6data[3].planQty),
					Number(chart6data[4].planQty), Number(chart6data[5].planQty)],
	            color : '#983501'
	        },
	        {
	            name: '실적',
	            data: [Number(chart6data[0].prodQty), Number(chart6data[1].prodQty), 
					Number(chart6data[2].prodQty), Number(chart6data[3].prodQty),
					Number(chart6data[4].prodQty), Number(chart6data[5].prodQty)],
	            color : '#FC6D00'
	        }
	    ]
	});

}

function chart7(){
	const text =
        'A라인 이상발생 불량 작업자 관리자 회의 요청' +
        'A라인 이상발생 불량 알람 요청 이메일 전화 현장 공지' +
        '불량 \' A라인 \' A라인 \' 불량 \'' +
        'A라인 이상발생 불량 이상 언제 몇시까지 협력사 회의실 공지 ' +
        '이상발생 불량 ' +
        '불량',
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
        text: '메신저 키워드 클라우드',
        align: 'left'
    }
});

}

function chart8(){
	Highcharts.chart('chart8', {
    chart: {
        type: 'bar'
    },
    title: {
        text: '스마트 알람 키워드 발생 빈도 수'
    },
    xAxis: {
        categories: ['불량', '이상발생', '설비이상', 'A 라인']
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    series: [{
		name:'',
        data: [15, 10, 7, 4]
    }]
});

}
	
function PQCDrate() {
    var url = '/dash/findPQCD';

    $.get(url).then(function(res) {
        var result = res;
        var FirstTimeFailQtyTo = 0, FirstTimeFailQtyYe = 0, ProdQtyTo = 0, ProdQtyYe = 0,
        	ManhourTo = 0, ManhourYe = 0, PlanQtyTo = 0, PlanQtyYe = 0, WorkTimeTo = 0, WorkTimeYe = 0, NotoperateTimeTo = 0, NotoperateTimeYe = 0;
        
        var today = new Date();

		var year = today.getFullYear();
		var month = (today.getMonth() + 1).toString().padStart(2, '0');
		var day = today.getDate().toString().padStart(2, '0');

		var formattedDate = year + month + day;
		
        result.forEach(function(r) {
			if (r.workDate == formattedDate) {
	            FirstTimeFailQtyTo = r.firsttimeFailQty;
	            ProdQtyTo = r.prodQty;
	            ManhourTo = r.manhour;
	            PlanQtyTo = r.planQty;
	            WorkTimeTo = r.workTotal;
	            NotoperateTimeTo = r.notoperateTotal;
            } else {
				FirstTimeFailQtyYe = r.firsttimeFailQty;
	            ProdQtyYe = r.prodQty;
	            ManhourYe = r.manhour;
	            PlanQtyYe = r.planQty;
	            WorkTimeYe = r.workTotal;
	            NotoperateTimeYe = r.notoperateTotal;
			}
        });
        
        Uph = ProdQtyTo / ManhourTo; // UPH
        $('#Uph').text(Uph.toFixed(0));
        
        preUph = ProdQtyYe / ManhourYe;
	    compareUph = Uph-preUph

        failRate = (FirstTimeFailQtyTo / ProdQtyTo) * 100; //불량률
        $('#failRate').text(failRate.toFixed(2) + '%');
        
        preFailRate = (FirstTimeFailQtyYe / ProdQtyYe) * 100;
	    compareFailRate = failRate-preFailRate
	    
	    operateRate = (WorkTimeTo / (WorkTimeTo + NotoperateTimeTo)) * 100; //가동률
        $('#operateRate').text(operateRate.toFixed(2) + '%');
        
        preOperateRate = (WorkTimeYe / (WorkTimeYe + NotoperateTimeYe)) * 100;
	    compareOperateRate = operateRate-preOperateRate
	        
	    successRate = (ProdQtyTo / PlanQtyTo) * 100; //달성율
        $('#successRate').text(successRate.toFixed(2) + '%');
        
        preSuccessRate = (ProdQtyYe / PlanQtyYe) * 100;
	    compareSuccessRate = successRate-preSuccessRate
	    
	    if (compareUph > 0 || compareFailRate > 0 || compareOperateRate > 0 || compareSuccessRate > 0) {
			$('#preUph').text('전일대비 ▲ '+ compareUph.toFixed(0));
			$('#preFailRate').text('전일대비 ▲ '+ compareFailRate.toFixed(2) + '%');
			$('#preOperateRate').text('전일대비 ▲ '+ compareOperateRate.toFixed(2) + '%');
			$('#preSuccessRate').text('전일대비 ▲ '+ compareSuccessRate.toFixed(2) + '%');
		} else if (compareUph == 0 || compareFailRate == 0 || compareOperateRate == 0  || compareSuccessRate == 0) {
			$('#preUph').text('전일대비 - ');
			$('#preFailRate').text('전일대비 - ');
			$('#preOperateRate').text('전일대비 - ');
			$('#preSuccessRate').text('전일대비 - ');
		} else if (compareUph < 0 || compareFailRate < 0 || compareOperateRate < 0  || compareSuccessRate < 0) {
			$('#preUph').text('전일대비 ▼ '+ compareUph.toFixed(0));
			$('#preFailRate').text('전일대비 ▼ '+ compareFailRate.toFixed(2) + '%');
			$('#preOperateRate').text('전일대비 ▼ '+ compareOperateRate.toFixed(2) + '%');
			$('#preSuccessRate').text('전일대비 ▼ '+ compareSuccessRate.toFixed(2) + '%');
		}
     
    });
}

function rejectContents(data) {
    var url = '/dash/findR';

  	var params = {
		month: data
	};
	
	$.get(url + '?' + $.param(params)).then(function(res) {
        var result = res;
        var data1 = 0, data2 = 0, data3 = 0, data4 = 0;
        var cnt1= 0, cnt2= 0, cnt3= 0, cnt4= 0, cnt5= 0, cnt6= 0, cnt7= 0, cnt8= 0, cnt9= 0, cnt10= 0, cnt11= 0, cnt12= 0;


        result.forEach(function(r) { 
            if (r.rejectItemid == 'RI01'){
				
				data1 += r.firsttimeRejectQty;
				
				if (r.rejectType == 'A') {
					cnt1 += r.firsttimeRejectQty;
				} else if (r.rejectType == 'B') {
					cnt2 += r.firsttimeRejectQty;
				} else if (r.rejectType == 'C') {
					cnt3 += r.firsttimeRejectQty;
				} else if (r.rejectType == 'D') {
					cnt4 += r.firsttimeRejectQty;
				}
                
            } else if (r.rejectItemid == 'RI02'){
				
				data2 += r.firsttimeRejectQty;
				
                if (r.rejectType == 'A') {
					cnt5 += r.firsttimeRejectQty;
				} else if (r.rejectType == 'B') {
					cnt6 += r.firsttimeRejectQty;
				} else if (r.rejectType == 'C') {
					cnt7 += r.firsttimeRejectQty;
				} 
            } else if (r.rejectItemid == 'RI03'){
				
				data3 += r.firsttimeRejectQty;
				
                if (r.rejectType == 'A') {
					cnt8 += r.firsttimeRejectQty;
				} else if (r.rejectType == 'B') {
					cnt9 += r.firsttimeRejectQty;
				} else if (r.rejectType == 'C') {
					cnt10 += r.firsttimeRejectQty;
				}
            } else if (r.rejectItemid == 'RI04'){
				
				data4 += r.firsttimeRejectQty;
				
                if (r.rejectType == 'A') {
					cnt11 += r.firsttimeRejectQty;
				} else if (r.rejectType == 'B') {
					cnt12 += r.firsttimeRejectQty;
				}
            }
        });

        chart3(data1, data2, data3, data4);
        
        chart4(cnt1, cnt2, cnt3, cnt4, cnt5, cnt6, cnt7, cnt8, cnt9, cnt10, cnt11, cnt12);
	});
}

function selectMonthButton() {
	
	var Month= (new Date().getMonth()) % 12 + 1;
	var currentMonth = new Date().getMonth() - 5;
	
	$(".addMonth").each(function(index) {
        var newValue = (currentMonth + index) % 12 + 1;
        $(this).text(newValue + "월");
        $(this).val(newValue);
    });
        
	$(".addMonth").click(function() {
        var value = $(this).val(); 
        var data = value; 
        rejectContents(data);
    });
    
    $(".addMonth[value='" + Month + "']").addClass("active"); 
    rejectContents(Month);
}

function selectDayWeekMonthButton() {	    
	var defaultData = "day";
	
	for (var chartNumber = 1; chartNumber <= 6; chartNumber++) {
        var chartId = "chart" + chartNumber + "Type";
        
        // Set default active button and call selectType
        $("#addType[value='" + defaultData + "']").addClass("active");
        selectType(defaultData, chartId);
    }    
	$(".addType").click(function() {	//일 주 월 타입 선택
	    var data = $(this).val(); 
	    var tagId = $(this).parent().attr('id');
	        
	    $(".addType").removeClass("active");
        $(this).addClass("active");
            
	    selectType(data,tagId);
	});
}

function selectType(data,tagId) {		//차트별 일 주 월 타입 선택
	
	if(tagId == "chart1Type"){
		var url = '/dash/chart1';
		var params = {
			factory: "KEM",
			month: data
		};
		$.get(url+ '?' + $.param(params)).then(function(res) {
			chart1data = res;
			setchart1(chart1data);
		})
				
	}else if(tagId == "chart2Type"){
		var url = '/dash/chart2';
		
		factory= $("select[name=factoryid]").val();
		
		var params = {
			factory: factory,
			month: data
		};
		$.get(url+ '?' + $.param(params)).then(function(res) {
			chart2data = res;
			setchart2(chart2data);
		})
		
	}else if(tagId == "chart5Type"){
		var url = '/dash/chart5';
		
		var params = {
			factory: "KEM",
			month: data
		};
		
		$.get(url + '?' + $.param(params)).then(function(res) {
			chart5data = res;
			setchart5(chart5data);
		})
		
	}else if(tagId == "chart6Type"){
		var url = '/dash/chart6';
		
		var params = {
			month: data
		};
		
		$.get(url + '?' + $.param(params)).then(function(res) {
			chart6data = res;
			setchart6(chart6data);
		});
		
	}else{
		
	}
}

function factroy() {
	let url = '/code/factory';

	c_factory = null;

	$.ajax({
		url: url,
		type: 'GET',
		success: function(data) {
			c_factory = data;

			let $dropdown = $("#factoryCodes");
			$dropdown.empty();

			if (c_factory) {
				$dropdown.append($("<option/>").val("").text("공장 선택"));
				$.each(data, function() {
					$dropdown.append($("<option/>").val(this.code).text(this.value));
				});
			} else {
				$dropdown.append($("<option/>").val("").text("공장 선택"));
			}
		}
	});
}

var repeat = null;
var delay = 15000;
repeat = setInterval(realTime, delay); // delay 간격으로 실행.

function realTime() {
	
	let url = '/dash/findAlarm';
	
	$.ajax({
		url: url,
		type: 'GET',
		async: true,
		success: function(data) {
//			alert(data);
			
			$('#alarm1').text(data[0]);
			$('#alarm2').text(data[1]);
			$('#alarm3').text(data[2]);
			$('#realTime').text("최근 업데이트 : "+data[3]);
			
			if(data[0] != '0'){
				$('.alarm1').css('background-color', 'yellow');
				$('#alarmbell1').css('color', 'red');
			}else{
				$('.alarm1').css('background-color', '#FFF');
				$('#alarmbell1').css('color', 'gray');
			}
			
			if(data[1] != '0'){
				$('.alarm2').css('background-color', 'yellow');
				$('#alarmbell2').css('color', 'red');
			}else{
				$('.alarm2').css('background-color', '#FFF');
				$('#alarmbell2').css('color', 'gray');
			}
			
			if(data[2] != '0'){
				$('.alarm3').css('background-color', 'yellow');
				$('#alarmbell3').css('color', 'red');
			}else{
				$('.alarm3').css('background-color', '#FFF');
				$('#alarmbell3').css('color', 'gray');
			}		

		}
	});
	
	var url2 = '/dash/findDailyAlarm';

    $.get(url2).then(function(res) {
        var result = res;
        var SumYe = 0, SumYe = 0;
        
        var today = new Date();
        
        var year = today.getFullYear();
		var month = (today.getMonth() + 1).toString().padStart(2, '0');
		var day = today.getDate().toString().padStart(2, '0');

		var formattedDate = year + '-' + month + '-' + day;
		
        result.forEach(function(r) {
			if (r.date == formattedDate) {
	            SumTo = r.sum;
            } else {
				SumYe = r.sum;
			}
        });
        
        // 오늘
        $('#todayAlarm').text(SumTo + '건');
        SumTotal = SumTo - SumYe;

	    if (SumTotal> 0) {
			$('#yesterdayAlarm').text('전일대비 ▲ '+ SumTotal + '건');
		} else if (SumTotal == 0) {
			$('#yesterdayAlarm').text('전일대비 - ');
		} else if (SumTotal< 0) {
			$('#yesterdayAlarm').text('전일대비 ▼ '+ SumTotal + '건');
		}
     
    });
		
}

