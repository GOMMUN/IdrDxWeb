/**
 * 
 */

$(function() {
	init();
	setEventListener();
	$search = $("#search");
	$search.trigger('click');
});

function init() {
	factroy();
	$('#date').val(getToday());
}

function setPlant(){
	localStorage.setItem("plant", $("#parameterPlant").val());
	localStorage.setItem("username", $("#parameterUsername").val());
	
	if(localStorage.getItem("plant") == "KEM"){
		$("#factoryCodes").val("KEM").prop("selected", true);
	} else if(localStorage.getItem("plant") == "LHO"){
		$("#factoryCodes").val("LHO").prop("selected", true);
	} else if(localStorage.getItem("plant") == "SYM"){
		$("#factoryCodes option:eq(3)").prop("selected", true);
	} else if(localStorage.getItem("plant") == "SWH"){
		$("#factoryCodes option:eq(4)").prop("selected", true);
	}
}

function setEventListener() {
	$search = $("#search");
	$factoryCodes = $("#factoryCodes");
	$date = $("#date");

	$factoryCodes.change(function() {

		getmatarial();

	});

	$search.click(function() {

		$matarialCode = $("#matarialCode");
		var selectedMaterial = $matarialCode.val();

		var params = {
			workDate: $date.val(),
			factoryid: $factoryCodes.val(),
			materialid: selectedMaterial
		};

		planam(params);
		planpm(params);
		rejectper(params);
		eqoperate(params);
		deliveryComplianceRate(params);
		rejectRate(params);
		notOperateRate(params);
	});

}

function planam(params) {
	let url = '/monitoring/planAM';

	$.ajax({
		url: url,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(params),
		success: function(data) {
			if (data.per != null) {
				$("#prodqtyam").text(data.prodQty);
				$("#goodqtyam").text(data.goodQty);
				
				let dataChange = Number(data.per);
				$("#peram").text(parseFloat(dataChange.toFixed(2)) + "%");

				chart1(data);
			} else {
				if (data.prodQty != null) {
					$("#prodqtyam").text(data.prodQty);
				} else {
					$("#prodqtyam").text('0');
				}
				if (data.goodQty != null) {
					$("#goodqtyam").text(data.goodQty);
				} else {
					$("#goodqtyam").text('0');
				}
				$("#peram").text("0" + '%');
				zerochart('monitoringchart1');
			}

		}
	});
}

function planpm(params) {
	let url = '/monitoring/planPM';

	$.ajax({
		url: url,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(params),
		success: function(data) {
			if (data.per != null) {
				$("#prodqtypm").text(data.prodQty);
				$("#goodqtypm").text(data.goodQty);
				
				let dataChange = Number(data.per);
				$("#perpm").text(parseFloat(dataChange.toFixed(2)) + "%");

				chart2(data);
			} else {
				if (data.prodQty != null) {
					$("#prodqtypm").text(data.prodQty);
				} else {
					$("#prodqtypm").text('0');
				}
				if (data.goodQty != null) {
					$("#goodqtypm").text(data.goodQty);
				} else {
					$("#goodqtypm").text('0');
				}
				$("#perpm").text("0" + '%');
				zerochart('monitoringchart2');
			}
		}
	});
}

function rejectper(params) {
	let url = '/monitoring/rejectper';

	$.ajax({
		url: url,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(params),
		success: function(data) {
			if (data.per != null) {
				let dataChange = Number(data.per);
				$("#rejectper").text(parseFloat(dataChange.toFixed(2)) + "%");
			} else {
				$("#rejectper").text("0" + '%');
			}


		}
	});
}

function eqoperate(params) {
	let url = '/monitoring/uptime';
	$.ajax({
		url: url,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(params),
		success: function(data) {
			if (data == "NaN") {
				$("#eqoperate").text("0" + '%');
			}
			else {
				let dataChange = Number(data);
				$("#eqoperate").text(parseFloat(dataChange.toFixed(2)) + "%");
			}

		}
	});
}

function deliveryComplianceRate(params) {
	let url = '/monitoring/deliveryComplianceRate';

	$.ajax({
		url: url,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(params),
		success: function(data) {
			deliveryratechart(data);
		}
	});
}

function rejectRate(params) {
	let url = '/monitoring/rejectRate';

	$.ajax({
		url: url,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(params),
		success: function(data) {
			rejectratechart(data);
		}
	});
}

function notOperateRate(params) {
	let url = '/monitoring/notoperateRate';

	$.ajax({
		url: url,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(params),
		success: function(data) {
			notoperateRateChart(data);
		}
	});
}
function getmatarial() {
	let url = '/materialmaster/find';
	$.ajax({
		url: url,
		type: 'GET',
		success: function(data) {
			let materials = data;

			$matarialCode = $("#matarialCode");
			$matarialCode.empty();

			// factoryCode와 factoryId가 일치하는 데이터 필터링
			let matchingMaterials = materials.filter(function(material) {
				return material.factoryid === $factoryCodes.val();
			});

			// dropdown에 일치하는 데이터 추가
			matchingMaterials.forEach(function(material) {
				$matarialCode.append($('<option>', {
					value: material.materialid,
					text: material.materialname
				}));
			});
		},
		error: function(error) {
			console.error('Error fetching material data:', error);
		}
	});
}

function factroy() {
	let url = '/code/factory';

	factorys = null;

	$.ajax({
		url: url,
		type: 'GET',
		success: function(data) {
			factorys = data;

			let $dropdown = $("#factoryCodes");
			$dropdown.empty();

			if (factorys) {
				$dropdown.append($("<option/>").val("").text("공장 선택"));
				$.each(data, function() {
					$dropdown.append($("<option/>").val(this.code).text(this.value));
				});
				setPlant();
				//$("#factoryCodes option:eq(1)").prop("selected", true);
				data.factoryid = $("select[name=factoryid]").val();
			} else {
				$dropdown.append($("<option/>").val("").text("공장 선택"));
			}
		}
	});
	getmatarial();
}

function getToday() {
	var date = new Date();
	var year = date.getFullYear();
	var month = ("0" + (1 + date.getMonth())).slice(-2);
	var day = ("0" + date.getDate()).slice(-2);

	return year + "-" + month + "-" + day;
}

function chart1(data) {
	Highcharts.chart('monitoringchart1', {
		colors: ['#d1d3e2', '#232aa1'],
		chart: {
			type: 'pie'
		},
		title: {
			text: '',
			align: 'left'
		},
		tooltip: {
			valueSuffix: '개'
		},
		navigation: {
			buttonOptions: {
				enabled: false
			}
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
					format: '{point.name}: {y}'
				},
				showInLegend: false
			}
		},
		series: [{
			name: '',
			colorByPoint: true,
			innerSize: '70%',
			data: [{
				name: '부족수량',
				y: data.prodQty - data.goodQty
			}, {
				name: '생산수량',
				y: Number(data.goodQty)
			}]
		}]
	});
}
function chart2(data) {
	Highcharts.chart('monitoringchart2', {
		colors: ['#d1d3e2', '#232aa1'],
		chart: {
			type: 'pie'
		},
		title: {
			text: '',
			align: 'left'
		},
		tooltip: {
			valueSuffix: '개'
		},
		navigation: {
			buttonOptions: {
				enabled: false
			}
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
					format: '{point.name}: {y}'
				},
				showInLegend: false
			}
		},
		series: [{
			name: '',
			colorByPoint: true,
			innerSize: '70%',
			data: [{
				name: '부족수량',
				y: data.prodQty - data.goodQty
			}, {
				name: '생산수량',
				y: Number(data.goodQty)
			}]
		}]
	});
}

function zerochart(name) {
	Highcharts.chart(name, {
		colors: ['#d1d3e2', '#232aa1'],
		chart: {
			type: 'pie'
		},
		title: {
			text: '',
			align: 'left'
		},
		tooltip: {
			valueSuffix: '개'
		},
		navigation: {
			buttonOptions: {
				enabled: false
			}
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false,
					format: '{point.name}: {y}'
				},
				showInLegend: false
			}
		},
		series: [{
			name: '',
			colorByPoint: true,
			innerSize: '70%',
			data: [{
				name: '부족수량',
				y: 1
			}, {
				name: '생산수량',
				y: 0
			}]
		}]
	});
}

function deliveryratechart(param) {
	var seriesData = [];
	var dateData = [];

	for (var j = 0; j < param.length; j++) {
	    let formattedDate = param[j].dt.substring(4, 6) + "월" + param[j].dt.substring(6, 8) + "일";
	    dateData.push(formattedDate);
	}

	for (var j = 0; j < param.length; j++) {
		var series;
		if (param[j].per == 100) {
			series = Number(param[j].per.substring(0, 3));
		}else if(param[j].per==null){
			series=0;
		}else {
			series = Number(param[j].per.substring(0, 4));
		}
		

		seriesData.push(series);

	}

	Highcharts.chart('deliveryrate', {
		chart: {
			type: 'line'
		},
		colors: ['#232aa1'],
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		credits: {
			enabled: false
		},
		navigation: {
			buttonOptions: {
				enabled: false
			}
		},
		xAxis: {
			categories: dateData,
			crosshair: true,
			accessibility: {
				description: ''
			}
		},
		yAxis: {
			labels: {
                enabled: false
            },
			title: {
				text: ''
			}
		},
		plotOptions: {
			line: {
				dataLabels: {
					enabled: true,
					formatter: function () {
                        return this.y + ' %';
                    }
				},
				enableMouseTracking: false
			}
		},
		series: [{
			name: '납기준수율',
			data: seriesData
		}]

	});
}


function rejectratechart(param) {
	var seriesData = [];
	var dateData = [];

	for (var j = 0; j < param.length; j++) {
	    let formattedDate = param[j].dt.substring(4, 6) + "월" + param[j].dt.substring(6, 8) + "일";
	    dateData.push(formattedDate);
	}

	for (var j = 0; j < param.length; j++) {
		var series;
		if (param[j].per == 100) {
			series = Number(param[j].per.substring(0, 3));
		}else if(param[j].per==null){
			series=0;
		}else {
			series = Number(param[j].per.substring(0, 4));
		}
		

		seriesData.push(series);

	}

	Highcharts.chart('rejectrate', {
		chart: {
			type: 'line'
		},
		colors: ['#232aa1'],
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		credits: {
			enabled: false
		},
		navigation: {
			buttonOptions: {
				enabled: false
			}
		},
		xAxis: {
			categories: dateData,
			crosshair: true,
			accessibility: {
				description: ''
			}
		},
		yAxis: {
			labels: {
                enabled: false
            },
			title: {
				text: ''
			}
		},
		plotOptions: {
			line: {
				dataLabels: {
					enabled: true,
					formatter: function () {
                        return this.y + ' %';
                    }
				},
				enableMouseTracking: false
			}
		},
		series: [{
			name: '불량율',
			data: seriesData
		}]

	});
}

function notoperateRateChart(param) {
    var seriesData = [];
    var dateData = [];
    console.log(param);

    for (var j = 0; j < param.length; j++) {
        let formattedDate = param[j].dt.substring(4, 6) + "월" + param[j].dt.substring(6, 8) + "일";
        dateData.push(formattedDate);
    }

    for (var j = 0; j < param.length; j++) {
        var series;
        series = Math.floor(Number(param[j].notoperatetime) / 60);

        seriesData.push(series);

    }

    Highcharts.chart('notoperateRate', {
        chart: {
            type: 'column'
        },
        colors: ['#232aa1'],
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        credits: {
            enabled: false
        },
        navigation: {
            buttonOptions: {
                enabled: false
            }
        },
        xAxis: {
            categories: dateData,
            crosshair: true,
            accessibility: {
                description: ''
            }
        },
        yAxis: {
            labels: {
                enabled: false
            },
            title: {
                text: ''
            }
        },
        plotOptions: {
            column: {
				pointPadding: 0.2,
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return this.y + ' 분';
                    }
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: '비가동 현황',
            data: seriesData
        }]

    });
}