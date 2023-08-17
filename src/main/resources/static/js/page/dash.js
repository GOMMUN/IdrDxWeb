/**
 * 
 */
var chart1data = null;
var chart2data = null;
$(function(){
	//chart1();
	chart2();
	chart3();
	chart4();
	chart5();
	chart6();
	chart7();
	chart8();
	
	PQCDrate()
	rejectContents("8");
	updateMonthButton();
	updateDayWeekMonthButton()
});

function setchart1(chart1data) {

	Highcharts.chart('chart1', {
		chart: {
			type: 'column'
		},
		title: {
			text: '대표기업 월별 공정별 생산실적',
			align: 'left'
		},
		xAxis: {
			categories: [chart1data[0][0].dt, chart1data[0][1].dt, chart1data[0][2].dt, chart1data[0][3].dt, chart1data[0][4].dt, chart1data[0][5].dt],
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
	Highcharts.chart('chart2', {
    chart: {
        type: 'column'
    },
    title: {
        text: '협력사 A 월별 공정별 생산실적',
        align: 'left'
    },
    xAxis: {
        categories: ['5일전', '4일전', '3일전', '2일전', '하루전', '오늘'],
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

function chart5(){
	Highcharts.chart('chart5', {

    title: {
        text: '대표기업 월별 설비 가동율 현황',
        align: 'left'
    },


    legend: {
        verticalAlign: 'bottom',
        align: 'center'
    },

    xAxis: {
        categories: ['2월', '3월', '4월', '5월', '6월', '7월'],
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
        name: '설비A',
        data: [85, 89, 90, 100, 99, 85],
        color:'#94F5F9'
    }, {
        name: '설비B',
        data: [94, 92, 100, 100, 98, 97],
        color:'#7D9632'
    }, {
        name: '설비C',
        data: [90, 95, 93, 99, 93, 100],
        color:'#0A9B73'
    }, {
        name: '설비D',
        data: [99, 100, 93, 98, 96, 99],
        color:'#4FCDFF'
    }]

});

}

function chart6(res){
Highcharts.chart('chart6', {
    chart: {
        type: 'column'
    },
    title: {
        text: '대표 기업 월별 계획 대비 실적',
        align: 'left'
    },
    xAxis: {
        categories: ['2월', '3월', '4월', '5월', '6월', '7월'],
        crosshair: true,
        accessibility: {
            description: 'Countries'
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
        }
    },
    series: [
        {
            name: '계획',
            data: [1000, 1000, 1200, 1400, 1500, 1600],
            color : '#983501'
        },
        {
            name: '실적',
            data: [800, 700, 1100, 1100, 1500, 1580],
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
			if (r.workdate == formattedDate) {
	            FirstTimeFailQtyTo = r.firsttimeFailQty;
	            ProdQtyTo = r.prodQty;
	            ManhourTo = r.manhour;
	            PlanQtyTo = r.planQty;
	            WorkTimeTo = r.worktime;
	            NotoperateTimeTo = r.notoperatetime;
            } else {
				FirstTimeFailQtyYe = r.firsttimeFailQty;
	            ProdQtyYe = r.prodQty;
	            ManhourYe = r.manhour;
	            PlanQtyYe = r.planQty;
	            WorkTimeYe = r.worktime;
	            NotoperateTimeYe = r.notoperatetime;
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

function updateMonthButton() {
	
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

function updateDayWeekMonthButton() {
	    
    $(".addType").click(function() {	//일 주 월 타입 선택
        var data = $(this).val(); 
        var tagId = $(this).parent().attr('id');
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
		
	}else if(tagId == "chart5Type"){
		var url = '/dash/findDay';
		
		var params = {
			month: data
		};
		
		$.get(url + '?' + $.param(params)).then(function(res) {
			var result = res;
			var LineId = 0, WorkTime = 0, NotoperateTime = 0;
			
			result.foreach(function(r) { 
				
			}); 
		});
	}else if(tagId == "chart6Type"){
		var url = '/dash/findChart6'+data;
		
		$.get(url).then(function(res) {
			chart6(res);
		});
		
	}else{
		
	}
}

//function chart1() {
//	var url = '/dash/chart1';
//	var params = {
//		factory: "KEM"
//	};
//	$.get(url+ '?' + $.param(params)).then(function(res) {
//		chart1data = res;
//		setchart1(chart1data);
//	})
//}

function chart2() {
	var url = '/dash/chart2';
	var params = {
		factory: "LHO"
	};
	$.get(url+ '?' + $.param(params)).then(function(res) {
		chart2data = res;
		setchart2(chart2data);
	})
}

