/**
 * 
 */
var chart1data = null; 
var chart2data = null;
var chart3data = null;
var chart4data = null;
var chart5data = null;
var chart6data = null;
var chart7data = null;
var chart8data = null;
var chart9data = null;
var selectedText = null;

var repeat = null;
var delay = 5000;
repeat = setInterval(realTime, delay); // delay 간격으로 실행

var result = null;

$(function(){
	initSetting();
	setEventListener();
});

function initSetting() {
	
	localStorage.setItem("plant", $("#parameterPlant").val());
	localStorage.setItem("username", $("#parameterUsername").val());
	
	code();
	
	findName();		//공장명 가져오기
	realTime();		// 실시간 알람
	nowTime();		//현재 시간
	PQCDrate()					// PQCD 퍼센트 비교
	selectDayWeekMonthButton();	// 일주월 버튼 클릭
	
	if($("#parameterPlant").val() != "KEM"){// 대표기업시 대표 공정별 생산실적 히든
		$('#isPartner').hide();
		$('#alarm').hide();
		$('#chart1').css('height', '710px');
	}
	
	if($("#parameterPlant").val() == "KEM"){// 기업별 로고
		$('#logo1').show();
		$('#logo2').hide();
		$('#logo3').hide();
		$('#logo4').hide();
	} else if($("#parameterPlant").val() == "LHO"){
		$('#logo1').hide();
		$('#logo2').show();
		$('#logo3').hide();
		$('#logo4').hide();
	} else if($("#parameterPlant").val() == "SYM"){
		$('#logo1').hide();
		$('#logo2').hide();
		$('#logo3').show();
		$('#logo4').hide();
	} else if($("#parameterPlant").val() == "SWH"){
		$('#logo1').hide();
		$('#logo2').hide();
		$('#logo3').hide();
		$('#logo4').show();
	}
	
}

function code() {
	factroy();		// 공장코드 조회
	matarial();		// 자재코드 조회
}

function serchChart(){
	
	PQCDrate()							// PQCD 퍼센트 비교
	set_P_Representative(chart1data);	// P 대표기업 공정별 생산실적
	set_P_Partner(chart2data);			// P 협력사 공정별 생산실적
	set_Q_Erorr(chart3data);			// Q 불량 발생 비중
	set_Q_ErorrDetail(chart4data);		// Q 불량 상세 유형별 빈도 수
	set_C_Equipment(chart5data);		// C 설비 가동율 현황
	set_D_PlanToPerform(chart6data);	// D 계획 대비 실적
	set_DailyAlarmCnt(chart7data);		// 비정형 데이터
	set_WordCloud(chart8data); 			// 워드 클라우드
	set_SmartAlarm(chart9data); 		// 스마트 알람 발생 현황
}

// Jquery에서 해당 함수명이 있으면 자동으로 호출
function setEventListener() {
	setRefreshButtonClick();	//새로고침 버튼 클릭
}

function nowTime(){
	var today = new Date();
    
    var year = today.getFullYear();
	var month = (today.getMonth() + 1).toString().padStart(2, '0');
	var day = today.getDate().toString().padStart(2, '0');

	var formattedDate = year + '-' + month + '-' + day;
	
	var hours = ('0' + today.getHours()).slice(-2); 
	var minutes = ('0' + today.getMinutes()).slice(-2);
	var seconds = ('0' + today.getSeconds()).slice(-2); 
	var formattedDateTime = year + '-' + month + '-' + day + ' ' +hours + ':' + minutes  + ':' + seconds;
	
	$('#refreshTime').text("최근 업데이트 : "+formattedDateTime);
}

function setRefreshButtonClick(){
	$('#refreshButton').click(function(){
		nowTime();
		serchChart()
	})
}

function set_P_Representative(chart1data) {
	var dateData = [];
	
	for (var j = 0; j <= 0; j++) {
	    dateData[j] = []; 
	    
	    for (var i = 0; i <= chart1data[j].length-1; i++) {
	        if (chart1data[j][i].dt >= 2000) {
	            dateData[j][i] = formatDate(chart1data[j][i].dt.toString(), "yyyymmdd", "월 일");
	        } else if (chart1data[j][i].dt < 2000 && chart1data[j][i].dt >= 20) {
	            dateData[j][i] = ((chart1data[j][i].dt-(chart1data[j][i].dt%100))/100) + '월' + (chart1data[j][i].dt%100).toString() + '주';
	        } else if (chart1data[j][i].dt < 20) {
	            dateData[j][i] = chart1data[j][i].dt.toString() + '월';
	        }
	    }
	}
	
	var seriesData1 = [];
	var seriesData2 = [];

	for (var j = 0; j <= chart1data.length-1; j++) {
		
	    seriesData1[j] = [];
	    
	    for (var i = 0; i <= chart1data[j].length-1; i++) {        
	        seriesData1[j][i] = Number(chart1data[j][i].prodQty);
	    }
	    
	    var series = {
	        name: chart1data[j][0].lineid,
	        data: seriesData1[j]
	    };
	    
	    seriesData2.push(series);
	
	}
	
	Highcharts.chart('chart1', {
		chart: {
			type: 'column'
		},
		title: {
			text: '',
			align: 'left'
		},
		xAxis: {
			categories: dateData[0],
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
				
	        series: {
				minPointLength:3,
	            },
		},
	    tooltip: {
	        formatter: function () {
	            let xValue = this.x; // X 좌표 값을 가져옵니다.
	            let points = this.points; // 모든 데이터 포인트를 가져옵니다.
	            
	            // X 좌표에 해당하는 모든 데이터를 저장할 배열
	            let dataToShow = [];
	
	            // X 좌표에 해당하는 모든 데이터를 찾아 배열에 추가
	            for (let i = 0; i < points.length; i++) {
	                dataToShow.push({
	                    seriesName: points[i].series.name,
	                    value: points[i].y,
	                    color: points[i].series.color, // 시리즈의 컬러를 가져옵니다.
	                });
	            }
	
	            // 툴팁 내용을 구성
	            let tooltipText = '<strong>' + xValue + '</strong><br>';
	            for (let i = 0; i < dataToShow.length; i++) {
	                tooltipText += '<span style="color:' + dataToShow[i].color + ';">' +
	                               dataToShow[i].seriesName + ': </span>' + dataToShow[i].value.toLocaleString() + '개' + '<br>';
	            }
	
	            return tooltipText;
	        },
	        shared: true, // 툴팁을 공유합니다.		
		},
		credits: {
            enabled: false
        },
        navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
	    legend: {
			itemDistance:15,
    		symbolRadius: 0
		},
		series: seriesData2,
			colors: [
				'#0D70C6',
				'#009CD8',
				'#09D0D9',
				'#0DCF9C'
			]
		}
	);
}

function set_P_Partner(chart2data){
		var dateData = [];
	
		for (var j = 0; j <= 0; j++) {
		    dateData[j] = []; 
		    
		    for (var i = 0; i <= chart2data[j].length-1; i++) {
		        if (chart2data[j][i].dt >= 2000) {
		            dateData[j][i] = formatDate(chart2data[j][i].dt.toString(), "yyyymmdd", "월 일");
		        } else if (chart2data[j][i].dt < 2000 && chart2data[j][i].dt >= 20) {
		            dateData[j][i] = ((chart2data[j][i].dt-(chart2data[j][i].dt%100))/100) + '월' + (chart2data[j][i].dt%100).toString() + '주';
		        } else if (chart2data[j][i].dt < 20) {
		            dateData[j][i] = chart2data[j][i].dt.toString() + '월';
		        }
		    }
		}
		
		var seriesData1 = [];
		var seriesData2 = [];
	
		for (var j = 0; j <= chart2data.length-1; j++) {
		
			
		    seriesData1[j] = [];
		    
		    for (var i = 0; i <= chart2data[j].length-1; i++) {        
		        seriesData1[j][i] = Number(chart2data[j][i].prodQty);
		    }
		    
		    var series = {
		        name: chart2data[j][0].lineid,
		        data: seriesData1[j]
		    };
		    
		    seriesData2.push(series);
		
		}
		
		Highcharts.chart('chart2', {
	    chart: {
	        type: 'column'
	    },
	    title: {
	        text: '',
	        align: 'left'
	    },
	    xAxis: {
	        categories: dateData[0],
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
	    tooltip: {
	        formatter: function () {
	            let xValue = this.x; // X 좌표 값을 가져옵니다.
	            let points = this.points; // 모든 데이터 포인트를 가져옵니다.
	            
	            // X 좌표에 해당하는 모든 데이터를 저장할 배열
	            let dataToShow = [];
	
	            // X 좌표에 해당하는 모든 데이터를 찾아 배열에 추가
	            for (let i = 0; i < points.length; i++) {
	                dataToShow.push({
	                    seriesName: points[i].series.name,
	                    value: points[i].y,
	                    color: points[i].series.color, // 시리즈의 컬러를 가져옵니다.
	                });
	            }
	
	            // 툴팁 내용을 구성
	            let tooltipText = '<strong>' + xValue + '</strong><br>';
	            for (let i = 0; i < dataToShow.length; i++) {
	                tooltipText += '<span style="color:' + dataToShow[i].color + ';">' +
	                               dataToShow[i].seriesName + ': </span>' + dataToShow[i].value.toLocaleString() + '개' + '<br>';
	            }
	
	            return tooltipText;
	        },
	        shared: true, // 툴팁을 공유합니다.		
		},	    
		credits: {
	        enabled: false
	    },    
	    navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
	    legend: {
    		symbolRadius: 0
		},
	    series: seriesData2,
	    colors: [
			'#0D70C6'
			]
	});
}

function set_Q_Erorr(chart3data){
	var seriesData = [];

	for (var i = 0; i <= chart3data.length-1; i++) {
	 
	    var series = {
	        name: chart3data[i].commgrpcdnm,
	        y: chart3data[i].firsttimerejectQtySum,
	        z: 120
	    };
	    
	    seriesData.push(series);
	
	}
	
	Highcharts.chart('chart3', {
	    chart: {
	        type: 'pie'
	    },
	    title: {
	        text: '',
	        align: 'left'
	    },
		credits: {
	        enabled: false
	    },    
	    navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
	    legend: {
		    align: 'left', // 'right', 'center', 'left' 중에서 선택
		    verticalAlign: 'middle', // 'top', 'middle', 'bottom' 중에서 선택
		    layout: 'vertical', // 'horizontal', 'vertical' 중에서 선택
		    labelFormat: '{name}: {y} 건', // 범례 아이템 이름 뒤에 값 표시
		    itemMarginTop: 20, // 원하는 여백 값으로 설정
		    itemMarginBottom: 20, // 원하는 여백 값으로 설정
    		symbolRadius: 0, // 아이콘의 모서리 반경을 0으로 설정하여 네모 모양으로 만듭니다.
		},
	    plotOptions: {
	        pie: {
	            allowPointSelect: true,
	            cursor: 'pointer',
				dataLabels: {
                    enabled: true, // 데이터 라벨 활성화
                    format: '{point.percentage:.1f}%', // 이름과 y 값 표시
                    distance: -30, // 라벨 위치 조정
                    style: {
                        fontWeight: 'bold',
                        color: 'black'
                    }
                },
	            showInLegend: true
	        }
	    },
	    tooltip: {
	        formatter: function () {
//	            let xValue = this.x; // X 좌표 값을 가져옵니다.
	            let point = this.point; // 모든 데이터 포인트를 가져옵니다.

	            // 툴팁 내용을 구성
	            let tooltipText = '<strong>' + localStorage.getItem('month') + '월' + '</strong><br>';

	            tooltipText += '<span style="color:' + point.color + ';">' + point.name + ': </span>' + point.percentage.toFixed(1) + '%' + '<br>';

	            return tooltipText;
	        },
	        shared: true, // 툴팁을 공유합니다.		
		},
	    series: [{
	        minPointSize: 10,
	        innerSize: '70%',
	        zMin: 0,
	        name: 'failurerate',
	        borderRadius: 5,
	        data: seriesData,
	        colors: [
	            '#94F5F9',
            	'#7D9632',
            	'#0A9B73',
            	'#4FCDFF'
	        ]
	    }]
	});
}

function set_Q_ErorrDetail(chart4data){
	var seriesParent = [];
	var seriesData = [];
	var seriesChild = [];

	for (var i = 0; i <= chart3data.length-1; i++) {
		
	    var series1 = {
			id: chart3data[i].rejectItemId,
	        name: chart3data[i].commgrpcdnm,
	        color: chart3data[i].rejectItemId == 'RI01' ? '#94F5F9' : chart3data[i].rejectItemId == 'RI02' ? '#7D9632' : chart3data[i].rejectItemId == 'RI03' ? '#0A9B73' : '#4FCDFF',
	        isVisibleInLegend: true
	    };
	    seriesParent.push(series1);
	    seriesData.push(series1);
	}    
	for (var j = 0; j <= chart4data.length-1; j++) {
	 
		var series2 = {
			name: chart4data[j].commcdnm,
	        parent: chart4data[j].rejectItemId,
	        value: chart4data[j].firsttimerejectQtySum
		};
		seriesChild.push(series2);    
		seriesData.push(series2);
		
	}

	var H = Highcharts;

    H.addEvent(H.Legend, 'afterGetAllItems', function(seriesData) {
        seriesData.allItems.splice(seriesParent.length, seriesChild.length)
    });
	
	Highcharts.chart('chart4', {
	    series: [{
	        type: 'treemap',
	        layoutAlgorithm: 'stripes',
	        alternateStartingDirection: true,
	        showInLegend: true,
        	legendType: 'point',
	        borderColor: '#fff',
	        borderWidth: 2,
	        dataLabels: {
	            style: {
	                textOutline: 'none'
	            }
	        },
	        data: seriesData
	    }],
	    tooltip: {
	        formatter: function () {
	            let point = this.point; // 모든 데이터 포인트를 가져옵니다.

	            // 툴팁 내용을 구성
	            let tooltipText = '<strong>' + localStorage.getItem('month') + '월' + '</strong><br>';

	            tooltipText += '<span style="color:' + point.color + ';">' + point.name + ': </span>' + point.value.toLocaleString() + '건' + '<br>';

	            return tooltipText;
	        },
	        shared: true, // 툴팁을 공유합니다.		
		},
	    title: {
	        text: '',
	        align: 'left'
	    },
		credits: {
	        enabled: false
	    },
	    navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
	    legend: {
			itemDistance:15,
    		symbolRadius: 0
		}
	});

}
	     
function set_C_Equipment(chart5data) {
	var dateData = [];

	for (var j = 0; j <= 0; j++) {
	    dateData[j] = []; 
	    
	    for (var i = 0; i <= chart5data[j].length-1; i++) {
	        if (chart5data[j][i].dt >= 2000) {
	            dateData[j][i] = formatDate(chart5data[j][i].dt.toString(), "yyyymmdd", "월 일");
	        } else if (chart5data[j][i].dt < 2000 && chart5data[j][i].dt >= 20) {
	            dateData[j][i] = ((chart5data[j][i].dt-(chart5data[j][i].dt%100))/100) + '월' + (chart5data[j][i].dt%100).toString() + '주';
	        } else if (chart5data[j][i].dt < 20) {
	            dateData[j][i] = chart5data[j][i].dt.toString() + '월';
	        }
	    }

	}
	
	var seriesData1 = [];
	var seriesData2 = [];

	for (var j = 0; j <= chart5data.length-1; j++) {
	
		
	    seriesData1[j] = [];
	    
	    for (var i = 0; i <= chart5data[j].length-1; i++) {
	        var percentage = 0;
	        percentage = Number((parseInt(chart5data[j][i].workTotal) / ((parseInt(chart5data[j][i].workTotal) + parseInt(chart5data[j][i].notoperateTotal)) == 0 ? 1 : (parseInt(chart5data[j][i].workTotal) + parseInt(chart5data[j][i].notoperateTotal)))) * 100);
	        var percentage_data = parseFloat(percentage.toFixed(2));
	        seriesData1[j][i] = percentage_data;
	    }
	    
	    var series = {
	        name: chart5data[j][0].lineid,
	        data: seriesData1[j]
	    };
	    
	    seriesData2.push(series);
	
	}
	
	Highcharts.chart('chart5', {

    title: {
        text: '',
        align: 'left'
    },


    legend: {
		itemDistance:15,
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
    
    tooltip: {
        formatter: function () {
            let xValue = this.x; // X 좌표 값을 가져옵니다.
            let points = this.points; // 모든 데이터 포인트를 가져옵니다.
            
            // X 좌표에 해당하는 모든 데이터를 저장할 배열
            let dataToShow = [];

            // X 좌표에 해당하는 모든 데이터를 찾아 배열에 추가
            for (let i = 0; i < points.length; i++) {
                dataToShow.push({
                    seriesName: points[i].series.name,
                    value: points[i].y,
                    color: points[i].series.color, // 시리즈의 컬러를 가져옵니다.
                });
            }

            // 툴팁 내용을 구성
            let tooltipText = '<strong>' + xValue + '</strong><br>';
            for (let i = 0; i < dataToShow.length; i++) {
                tooltipText += '<span style="color:' + dataToShow[i].color + ';">' +
                               dataToShow[i].seriesName + ': </span>' + dataToShow[i].value + "%" + '<br>';
            }

            return tooltipText;
        },
        shared: true, // 툴팁을 공유합니다.		
	},
	
    xAxis: {
        categories: dateData[0],
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
    
	credits: {
        enabled: false
    },    
	navigation: {
        buttonOptions: {
            enabled: false
        }
    },
    series: seriesData2,
    colors: [
	        '#C00500',
	        '#FF85FF',
	        '#993601',
	        '#F78E00'
        ]

	});

}

function set_D_PlanToPerform(chart6data){
	var dateData = [];

	for (var i = 0; i <= chart6data.length-1; i++) {
	    if (chart6data[i].dt >= 2000) {
	            dateData[i] = formatDate(chart6data[i].dt.toString(), "yyyymmdd", "월 일");
	    } else if (chart6data[i].dt < 2000 && chart6data[i].dt >= 20) {
	            dateData[i] = ((chart6data[i].dt-(chart6data[i].dt%100))/100) + '월' + (chart6data[i].dt%100).toString() + '주';
	    } else if (chart6data[i].dt < 20) {
	            dateData[i] = chart6data[i].dt.toString() + '월';
	    }
	}
	
	var plan = [];
	var prod = [];
	    
	for (var i = 0; i <= chart6data.length-1; i++) {

		plan[i] = Number(chart6data[i].planQty);
		prod[i] = Number(chart6data[i].prodQty);

	}

	Highcharts.chart('chart6', {
	    chart: {
	        type: 'column'
	    },
	    
	    title: {
	        text: '',
	        align: 'left'
	    },
	    
	    xAxis: {
	        categories: dateData,
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
	    
		tooltip: {
	        formatter: function () {
	            let xValue = this.x; // X 좌표 값을 가져옵니다.
	            let points = this.points; // 모든 데이터 포인트를 가져옵니다.
	            
	            // X 좌표에 해당하는 모든 데이터를 저장할 배열
	            let dataToShow = [];
	
	            // X 좌표에 해당하는 모든 데이터를 찾아 배열에 추가
	            for (let i = 0; i < points.length; i++) {
	                dataToShow.push({
	                    seriesName: points[i].series.name,
	                    value: points[i].y,
	                    color: points[i].series.color, // 시리즈의 컬러를 가져옵니다.
	                });
	            }
	
	            // 툴팁 내용을 구성
	            let tooltipText = '<strong>' + xValue + '</strong><br>';
	            for (let i = 0; i < dataToShow.length; i++) {
	                tooltipText += '<span style="color:' + dataToShow[i].color + ';">' +
	                               dataToShow[i].seriesName + ': </span>' + dataToShow[i].value.toLocaleString() + '개' + '<br>';
	            }
	            var successRate = (dataToShow[1].value/(dataToShow[0].value == 0 ? 1 : dataToShow[0].value))*100;
	            
				tooltipText += '<span style="color: orange;">' +
	                               '달성율 : </span>' + parseFloat(successRate.toFixed(2)) + '%' + '<br>';
	            return tooltipText;
	        },
	        shared: true, // 툴팁을 공유합니다.		
		},
	    
		credits: {
	        enabled: false
	    },	    
	    navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
	    legend: {
    		symbolRadius: 0
		},
	    series: [
	        {
	            name: '계획',
	            data: plan,
	            color : '#983501'
	        },
	        {
	            name: '실적',
	            data: prod,
	            color : '#FC6D00'
	        }
	    ]
	});

}

function set_DailyAlarmCnt(chart7data){
	$("#alarmCnt").text(chart7data + "건");
}

function set_WordCloud(chart8data){
	const text =

        "A라인 이상발생 불량 이상 언제 몇시까지 협력사 회의실 공지 이상발생 이상발생 이상발생"
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
		chart: {
			width: 250
		},
	    accessibility: {
	        screenReaderSection: {
	            beforeChartFormat: '<h5>{chartTitle}</h5>' +
	                '<div>{chartSubtitle}</div>' +
	                '<div>{chartLongdesc}</div>' +
	                '<div>{viewTableButton}</div>'
	        }
	    },
		credits: {
	        enabled: false
	    },	    
	    navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
	    series: [{
	        type: 'wordcloud',
	        data,
	        name: 'Occurrences'
	    }],
	    title: {
	        text: '',
	        align: 'left'
	    }
	});

}

function set_SmartAlarm(chart9data){
	var dateData = [];

	for (var i = 0; i <= 5; i++) {
	    if (chart8data[i].dt >= 2000) {
	            dateData[i] = formatDate(chart8data[i].dt.toString(), "yyyymmdd", "월 일");
	    } else if (chart8data[i].dt < 2000 && chart8data[i].dt >= 20) {
	            dateData[i] = ((chart8data[i].dt-(chart8data[i].dt%100))/100) + '월' + (chart8data[i].dt%100).toString() + '주';
	    } else if (chart8data[i].dt < 20) {
	            dateData[i] = chart8data[i].dt.toString() + '월';
	    }
	}
	
	Highcharts.chart('chart8', {
	    chart: {
	        type: 'column'
	    },
	    
	    title: {
			text: '',
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
	    
	    credits: {
	        enabled: false
	    },	
	    navigation: {
	        buttonOptions: {
	            enabled: false
	        }
	    },
	    series: [
	        {
	            name: '스마트 알람',
	            data: [Number(chart8data[0].cnt), Number(chart8data[1].cnt), 
					Number(chart8data[2].cnt), Number(chart8data[3].cnt),
					Number(chart8data[4].cnt), Number(chart8data[5].cnt)],
	            color : '#555555'
	        }
	    ]
	});

}
	
function PQCDrate() {
    var urlp = '/dash/findP';
    var urlq = '/dash/findQ';
    var urlc = '/dash/findC';
    var urld = '/dash/findD';
    
      	var params = {
		plant: localStorage.getItem('plant'),
		material : localStorage.getItem('material')
	};

	var today = new Date();

	var year = today.getFullYear();
	var month = (today.getMonth() + 1).toString().padStart(2, '0');
	var day = today.getDate().toString().padStart(2, '0');

	var formattedDate = year + month + day;
//	var formattedDate = "20230831"
		
	$.get(urlp + '?' + $.param(params)).then(function(res) {
		var result = res;
		var ProdQtyTo = 0, ProdQtyYe = 0, ManhourTo = 0, ManhourYe = 0;
		
		result.forEach(function(r) {
			if (r.workDate == formattedDate) {
	            ProdQtyTo = r.prodQty;
	            ManhourTo = r.manhour;
            } else {
	            ProdQtyYe = r.prodQty;
	            ManhourYe = r.manhour;
			}
        });
        
        Uph = ProdQtyTo / ManhourTo; // UPH
        $('#Uph').text(isNaN(Uph) ? '-' : parseFloat(Uph.toFixed(0)));
        
        preUph = ProdQtyYe / ManhourYe;
	    compareUph = Uph-preUph
	    
	    if (compareUph.toFixed(0) > 0){
		    $('#preUph .plus').text(compareUph.toFixed(0)).hide();
		    $('#preUph .same').text(compareUph.toFixed(0)).hide();
		    $('#preUph .minus').text(compareUph.toFixed(0)).show();
		} else if (compareUph.toFixed(0) == 0){
		    $('#preUph .plus').text(0).hide();
		    $('#preUph .same').text(0).show();
		    $('#preUph .minus').text(0).hide();
		} else if (compareUph.toFixed(0) < 0){
		    $('#preUph .plus').text(Math.abs(compareUph.toFixed(0))).show();
		    $('#preUph .same').text(compareUph.toFixed(0)).hide();
		    $('#preUph .minus').text(compareUph.toFixed(0)).hide();
		} else if (isNaN(compareUph)) {
			$('#preUph .plus').hide();
			$('#preUph .same').text('-').show();
			$('#preUph .minus').hide();
		}
	});
	$.get(urlq + '?' + $.param(params)).then(function(res) {
		var result = res;
		var FirstTimeFailQtyTo = 0, FirstTimeFailQtyYe = 0, ProdQtyTo = 0, ProdQtyYe = 0;
		
		result.forEach(function(r) {
			if (r.workDate == formattedDate) {
	            FirstTimeFailQtyTo = r.firsttimeFailQty;
	            ProdQtyTo = r.prodQty;
            } else {
				FirstTimeFailQtyYe = r.firsttimeFailQty;
	            ProdQtyYe = r.prodQty;
			}
        });
        
        failRate = (FirstTimeFailQtyTo / ProdQtyTo) * 100; //불량률
        $('#failRate').text(isNaN(failRate) ? '-' : parseFloat(failRate.toFixed(2)) + '%');
        
        preFailRate = (FirstTimeFailQtyYe / ProdQtyYe) * 100;
	    compareFailRate = failRate-preFailRate
	    
		if (parseFloat(compareFailRate.toFixed(2)) > 0){
			$('#preFailRate .plus').text(parseFloat(compareFailRate.toFixed(2)) + '%').hide();
		    $('#preFailRate .same').text(parseFloat(compareFailRate.toFixed(2)) + '%').hide();
		    $('#preFailRate .minus').text(parseFloat(compareFailRate.toFixed(2)) + '%').show();
		} else if (parseFloat(compareFailRate.toFixed(2)) == 0){
		    $('#preFailRate .plus').text(0 + '%').hide();
		    $('#preFailRate .same').text(0 + '%').show();
		    $('#preFailRate .minus').text(0 + '%').hide();
		} else if (parseFloat(compareFailRate.toFixed(2)) < 0){
		    $('#preFailRate .plus').text(parseFloat(Math.abs(compareFailRate.toFixed(2))) + '%').show();
		    $('#preFailRate .same').text(parseFloat(compareFailRate.toFixed(2)) + '%').hide();
		    $('#preFailRate .minus').text(parseFloat(compareFailRate.toFixed(2)) + '%').hide();
		} else if (isNaN(compareFailRate)) {
			$('#preFailRate .plus').hide();
			$('#preFailRate .same').text('-').show();
			$('#preFailRate .minus').hide();
		}
	});
	$.get(urlc + '?' + $.param(params)).then(function(res) {
		var result = res;
		var WorkTimeTo = 0, WorkTimeYe = 0, NotoperateTimeTo = 0, NotoperateTimeYe = 0;
		
		result.forEach(function(r) {
			if (r.workDate == formattedDate) {
	            WorkTimeTo = r.workTotal;
	            NotoperateTimeTo = r.notoperateTotal;
            } else {
	            WorkTimeYe = r.workTotal;
	            NotoperateTimeYe = r.notoperateTotal;
			}
        });
        
        operateRate = (WorkTimeTo / (WorkTimeTo + NotoperateTimeTo)) * 100; //가동률
        $('#operateRate').text(isNaN(operateRate) ? '-' : parseFloat(operateRate.toFixed(2)) + '%');
        
        preOperateRate = (WorkTimeYe / (WorkTimeYe + NotoperateTimeYe)) * 100;
	    compareOperateRate = operateRate-preOperateRate
	    
	    if (parseFloat(compareOperateRate.toFixed(2)) > 0){
			$('#preOperateRate .plus').text(parseFloat(compareOperateRate.toFixed(2)) + '%').hide();
		    $('#preOperateRate .same').text(parseFloat(compareOperateRate.toFixed(2)) + '%').hide();
		    $('#preOperateRate .minus').text(parseFloat(compareOperateRate.toFixed(2)) + '%').show();
		} else if (parseFloat(compareOperateRate.toFixed(2)) == 0) {
			$('#preOperateRate .plus').text(0 + '%').hide();
		    $('#preOperateRate .same').text(0 + '%').show();
		    $('#preOperateRate .minus').text(0 + '%').hide();
		} else if (parseFloat(compareOperateRate.toFixed(2)) < 0){
			$('#preOperateRate .plus').text(parseFloat(Math.abs(compareOperateRate.toFixed(2))) + '%').show();
		    $('#preOperateRate .same').text(parseFloat(compareOperateRate.toFixed(2)) + '%').hide();
		    $('#preOperateRate .minus').text(parseFloat(compareOperateRate.toFixed(2)) + '%').hide();
		} else if (isNaN(compareOperateRate)) {
			$('#preOperateRate .plus').hide();
			$('#preOperateRate .same').text('-').show();
			$('#preOperateRate .minus').hide();
		}
	});
    $.get(urld + '?' + $.param(params)).then(function(res) {
        var result = res;
        var ProdQtyTo = 0, ProdQtyYe = 0, PlanQtyTo = 0, PlanQtyYe = 0;
		
        result.forEach(function(r) {
			if (r.workDate == formattedDate) {
	            ProdQtyTo = r.prodQty;
	            PlanQtyTo = r.planQty;
            } else {
	            ProdQtyYe = r.prodQty;
	            PlanQtyYe = r.planQty;
			}
        });
    
	    successRate = (ProdQtyTo / PlanQtyTo) * 100; //달성율
        $('#successRate').text(isNaN(successRate) ? '-' : parseFloat(successRate.toFixed(2)) + '%'); 
        
        preSuccessRate = (ProdQtyYe / PlanQtyYe) * 100;
	    compareSuccessRate = successRate-preSuccessRate
	    
		if (parseFloat(compareSuccessRate.toFixed(2)) > 0) {
			$('#preSuccessRate .plus').text(parseFloat(compareSuccessRate.toFixed(2)) + '%').hide();
		    $('#preSuccessRate .same').text(parseFloat(compareSuccessRate.toFixed(2)) + '%').hide();
		    $('#preSuccessRate .minus').text(parseFloat(compareSuccessRate.toFixed(2)) + '%').show();
		} else if (parseFloat(compareSuccessRate.toFixed(2)) == 0) {
			$('#preSuccessRate .plus').text(0 + '%').hide();
		    $('#preSuccessRate .same').text(0 + '%').show();
		    $('#preSuccessRate .minus').text(0 + '%').hide();
		} else if (parseFloat(compareSuccessRate.toFixed(2)) < 0) {
			$('#preSuccessRate .plus').text(parseFloat(Math.abs(compareSuccessRate.toFixed(2))) + '%').show();
		    $('#preSuccessRate .same').text(parseFloat(compareSuccessRate.toFixed(2)) + '%').hide();
		    $('#preSuccessRate .minus').text(parseFloat(compareSuccessRate.toFixed(2)) + '%').hide();
		} else if (isNaN(compareSuccessRate)) {
			$('#preSuccessRate .plus').hide();
			$('#preSuccessRate .same').text('-').show();
			$('#preSuccessRate .minus').hide();
		}
     
    });
}

function selectDayWeekMonthButton() {	    
	
	var defaultData = "day";
	var defaultMonth = new Date().getMonth()+1;
	
	for (var chartNumber = 1; chartNumber <= 8; chartNumber++) {
        var chartId = "chart" + chartNumber + "Type";
        
        if (chartNumber != 3 && chartNumber != 4){
			$("#addType[value='" + defaultData + "']").addClass("active");
        	selectType(defaultData, chartId);
		} else {
			$("#addMonth[value='" + defaultMonth + "']").addClass("active");
        	selectType(defaultMonth, chartId);
        	localStorage.setItem('month', defaultMonth);
		}
    }    
	$(".addType").click(function() {	//일 주 월 타입 선택
	    var data = $(this).val(); 
	    var tagId = $(this).parent().attr('id');
	        
	    $(".addType").removeClass("active");
        $(this).addClass("active");
        
	    selectType(data,tagId);
	});
	
	var currentMonth = new Date().getMonth() - 5;
	
	$(".addMonth").each(function(index) {
        var newValue = (currentMonth + index) % 12 + 1;
        $("label[for='month"+index+"']").text(newValue + "월");
        $(this).val(newValue);
    });
    
	$(".addMonth").click(function() {	//월 타입 선택
	    var data = $(this).val(); 
	    var tagId = $(this).parent().attr('id');
	        
	    $(".addMonth").removeClass("active");
        $(this).addClass("active");

	    selectType(data,tagId);
	    localStorage.setItem('month', data);
	});
	$("#factoryCodes").change(function() {
		var data = "day";
		var tagId = $(this).parent().attr('id');
	        
	    $(".addType").removeClass("active");
        $(this).addClass("active");
            
	    selectType(data,tagId);
	});
	
	setRefreshButtonClick();
}

function selectType(data,tagId) {		//차트별 일 주 월 타입 선택
	
	if(tagId == "chart1Type"){
		var url = '/dash/chart1';
		var params = {
			plant: localStorage.getItem('plant'),
			month: data,
			material : localStorage.getItem('material')
		};
		$.get(url+ '?' + $.param(params)).then(function(res) {
			chart1data = res;
			set_P_Representative(chart1data);
		})
				
	}else if(tagId == "chart2Type"){
		var url = '/dash/chart2';
		
		if ($("select[name=factoryid]").val() == ''){
			factory= 'LHO'
		} else {
			factory= $("select[name=factoryid]").val();
		}
		
		var params = {
			plant: localStorage.getItem('plant'),
			factory: factory,
			month: data,
			material : localStorage.getItem('material')
		};
		$.get(url+ '?' + $.param(params)).then(function(res) {
			chart2data = res;
			set_P_Partner(chart2data);
		})
		
	}else if(tagId == "chart3Type"){
		var url = '/dash/chart3';

		var params = {
			plant: localStorage.getItem('plant'),
			month: data,
			material : localStorage.getItem('material')
		};

		$.get(url+ '?' + $.param(params)).then(function(res) {
			chart3data = res;
			set_Q_Erorr(chart3data);
			
			var url = '/dash/chart4';
		
			var params = {
				plant: localStorage.getItem('plant'),
				month: data,
				material : localStorage.getItem('material')
			};
			$.get(url+ '?' + $.param(params)).then(function(res) {
				chart4data = res;
				set_Q_ErorrDetail(chart4data);
			})
			
		})
	}else if(tagId == "chart5Type"){
		var url = '/dash/chart5';
		
		var params = {
			plant: localStorage.getItem('plant'),
			month: data,
			material : localStorage.getItem('material')
		};
		
		$.get(url + '?' + $.param(params)).then(function(res) {
			chart5data = res;
			set_C_Equipment(chart5data);
		})
		
	}else if(tagId == "chart6Type"){
		var url = '/dash/chart6';
		
		var params = {
			plant: localStorage.getItem('plant'),
			month: data,
			material : localStorage.getItem('material')
		};
		
		$.get(url + '?' + $.param(params)).then(function(res) {
			chart6data = res;
			set_D_PlanToPerform(chart6data);
		});
		
	}else if(tagId == "chart7Type"){
		var url = '/dash/chart7';
		
		$.get(url).then(function(res) {
			chart7data = res;
			set_DailyAlarmCnt(chart7data);
		});
		
	}else if(tagId == "chart8Type"){
		var url = '/dash/chart8';
		
		var params = {
			month: data,
		};
		
		$.get(url+ '?' + $.param(params)).then(function(res) {
			chart8data = res;
			set_WordCloud(chart8data);
			
			var url = '/dash/chart9';
		
			var params = {
				month: data,
			};
			$.get(url+ '?' + $.param(params)).then(function(res) {
				chart9data = res;
				set_SmartAlarm(chart9data);
			})			
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
		async: false,
		success: function(data) {
			c_factory = data;
			let $dropdown = $("#factoryCodes");
			$dropdown.empty();

			if (c_factory) {
				$.each(data, function() {
					if (this.value !== "코렌스이엠") {
                        $dropdown.append($("<option/>").val(this.code).text(this.value));
                    }
                    
				});
				$dropdown.on('change', function() {
                    let selectedText = $(this).find('option:selected').text();

                    // 선택된 옵션의 value 값을 localStorage에 저장
                    getName(selectedText);
                });
			} else {
				$dropdown.append($("<option/>").val("").text("공장 선택"));
			}
		}
	});
}

function matarial() {
	let url = '/code/matarial';

	c_material = null;

	$.ajax({
		url: url,
		type: 'GET',
		async: false,
		success: function(data) {
			c_material = data;

			let $dropdown5 = $("#wdrmatarialid");
			$dropdown5.empty();

			if (c_material) {
				$.each(c_material, function() {
					if (localStorage.getItem('plant') == this.mcode) {
						$dropdown5.append($("<option/>").val(this.code).text(this.value));
						localStorage.setItem("material", this.code);
					}
				});
				$dropdown5.on('change', function() {
                    let selectedText2 = $(this).find('option:selected').text();

                    // 선택된 옵션의 value 값을 localStorage에 저장
                    localStorage.setItem("material", selectedText2);
                });
			} else {
				$dropdown5.append($("<option/>").val("").text("자재 선택"));

			}

		}
	});
}

function realTime() {
	
	let url = '/dash/findAlarm';
	
	$.ajax({
		url: url,
		type: 'GET',
		async: false,
		success: function(data) {
//			alert(data);
			
			$('#alarm1').text(data[0]);
			$('#alarm2').text(data[1]);
			$('#alarm3').text(data[2]);
			
			if(data[0] != '0' && data[0] != data[3]){
				$('#alarm1').css('color', 'red');
				$('#alarmbell1').addClass( 'active' );
			}else{
				$('.alarm1').css('color', '#000');
				$('#alarmbell1').removeClass( 'active' );
			}
			
			if(data[1] != '0' && data[1] != data[4]){
				$('.alarm2').css('color', 'red');
				$('#alarmbell2').addClass( 'active' );
			}else{
				$('.alarm2').css('color', '#000');
				$('#alarmbell2').removeClass( 'active' );
			}
			
			if(data[2] != '0' && data[2] != data[5]){
				$('.alarm3').css('color', 'red');
				$('#alarmbell3').addClass( 'active' );
			}else{
				$('.alarm3').css('color', '#000');
				$('#alarmbell3').removeClass( 'active' );
			}		

		}
	});
		
}

function findName(){
	var url = '/dash/findName';

	var params = {
		plant: localStorage.getItem('plant')
	};
		
	$.get(url + '?' + $.param(params)).then(function(res) {
		result = res;
		
		result.forEach(function(r){
			factoryname = r.factoryname
		});
		
		localStorage.setItem("factoryname", factoryname);
		
		getName(undefined);
	});
}

function getName(selectedText){
		if(selectedText == undefined){
			if(localStorage.getItem('plant') == 'KEM'){
				var selectedValue = '리하온';
			}
		} else {
			var selectedValue = selectedText;
		}
		
		var storedValue = localStorage.getItem('factoryname');
		
		var titleElement = document.getElementById('title');
		var titleElement2 = document.getElementById('title2');
        if (storedValue !== null) {
			if(localStorage.getItem('plant') == 'KEM'){
				titleElement.innerText = storedValue;
			}
            titleElement2.innerText = selectedValue;
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