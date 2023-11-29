/**
 * 
 */
let c_factory = null;
let c_material = null;

$(function() {
	initSetting();
	setEventListener();
	$factoryCodes.trigger("change");
	search();
//	formatAdvancedSearch();
});

function initSetting() {
	
	localStorage.setItem("plant", $("#parameterPlant").val());
	localStorage.setItem("username", $("#parameterUsername").val());

	code();
}

function code() {
	factroy();		// 공장코드 조회
	material();
}

// 작업일보 이벤트
function setEventListener() {

	$factoryCodes = $("#factoryCodes");
	
	$factoryCodes.change(function() {

		let $dropdown2 = $("#materialCodes");
		$dropdown2.empty();

		if (c_material) {
			$.each(c_material, function() {
				if ($factoryCodes.val() == this.mcode) {
					$dropdown2.append($("<option/>").val(this.code).text(this.value));
				}
			});
		} else {
			$dropdown2.append($("<option/>").val("").text("자재 선택"));
		}
	});
	
	$("#search").click(function(){
		search();
	});
}

function search(){
	let url = "https://dx.idrenvision.com:8171" 
//	let url = "https://localhost:8171"
				+ '/nelsonrule/find';
	
	let data = {
		"workDate": $("#year").val()+$("#month").val(), 
		"factoryid": $("#factoryCodes").val(), 
		"materialid": $("#materialCodes").val()
	};

	$.ajax({
		url: url,
		type: 'GET',
		data: data,
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(result){
			let code = result.status;
			let message = result.message;
			
			if(code == 200){
				prodChart(result.data);
				failChart(result.data);
			}
		},
		error:function(request,status,error){
			let code = request.responseJSON.status;
			let message = request.responseJSON.message
			
			if(code == 400){
				alert(message);
			}
		}
	});
}

function factroy() {
	let url = '/code/factory';

	c_factory = null;

	$.ajax({
		url: url,
		type: 'GET',
		async:false,
		success: function(data) {
			c_factory = data;

			let $dropdown = $("#factoryCodes");
			$dropdown.empty();

			if (c_factory) {
//				$dropdown.append($("<option/>").val("").text("공장 선택"));
				$.each(data, function() {
					$dropdown.append($("<option/>").val(this.code).text(this.value));
				});
			} else {
				$dropdown.append($("<option/>").val("").text("공장 선택"));
			}
		}
	});
}

function material() {
	let url = '/code/matarial';

	c_material = null;

	$.ajax({
		url: url,
		type: 'GET',
		async:false,
		success: function(data) {
			c_material = data;
		}
	});
}

function prodChart(data){

	if(data.prodResult == ""){
		$("#nelsonProdResult").text("");
	}else{
		$("#nelsonProdResult").text("이상감지 : "+data.prodResult);
	}
	
	let categories = [];
	
	data.dateList.forEach(function(arg) {
		categories.push(arg.month+"월 "+arg.day+"일");
	});
	
	Highcharts.chart('nelsonProdChart', {
		    chart: {
		        type: 'line'
		    },
		    title: {
		        text: ''
		    },
		    xAxis: {
		        categories: categories
		    },
		    yAxis: {
		        title: {
		            text: ''
		        },
		        max: data.prodUtc+0.1,
		        min: data.prodLtc-0.1,
		        plotLines: [{
		            color: '#ff0000',
		            width: 2,
		            value: data.prodUtc,
		            label:{
//		              text:"UTC : "+data.prodUtc,
					  text:"UTC",
		              align: 'left',
		              textAlign: 'left',
		              verticalAlign: 'middle'
		            }
		        },{
		            color: '#000000',
		            width: 2,
		            value: data.prodAvg,
		            label:{
//		              text:"달성률 평균 : "+data.prodAvg,
					  text:"달성률 평균",
		              align: 'left',
		              textAlign: 'left',
		              verticalAlign: 'middle'
		            }
		        },{
		            color: '#00ff00',
		            width: 2,
		            value: data.prodLtc,
		            label:{
//		              text:"LTC : "+data.prodLtc,
					  text:"LTC",
		              align: 'left',
		              textAlign: 'left',
		              verticalAlign: 'middle'
		            }
		        }]
		    },
//		    plotOptions: {
//		        line: {
//		            dataLabels: {
//		                enabled: true
//		            },
//		            enableMouseTracking: false
//		        }
//		    },
		    exporting: {
			    enabled: false
			},
			credits: {
		        enabled: false
		    },
		    series: [{
		        name: '',
		        data: data.prodAvgList
		    }]
		});

}

function failChart(data){

	if(data.prodResult == ""){
		$("#nelsonProdResult").text("");
	}else{
		$("#nelsonProdResult").text("이상감지 : "+data.failResult);
	}
	
	let categories = [];
	
	data.dateList.forEach(function(arg) {
		categories.push(arg.month+"월 "+arg.day+"일");
	});
	
	Highcharts.chart('nelsonFailChart', {
		    chart: {
		        type: 'line'
		    },
		    title: {
		        text: ''
		    },
		    xAxis: {
		        categories: categories
		    },
		    yAxis: {
		        title: {
		            text: ''
		        },
		        max: data.failUtc+0.1,
		        min: data.failLtc-0.1,
		        plotLines: [{
		            color: '#ff0000',
		            width: 2,
		            value: data.failUtc,
		            label:{
//		              text:"UTC : "+data.failUtc,
                      text:"UTC",
		              align: 'left',
		              textAlign: 'left',
		              verticalAlign: 'middle'
		            }
		        },{
		            color: '#000000',
		            width: 2,
		            value: data.failAvg,
		            label:{
//		              text:"달성률 평균 : "+data.failAvg,
		              text:"달성률 평균",
		              align: 'left',
		              textAlign: 'left',
		              verticalAlign: 'middle'
		            }
		        },{
		            color: '#00ff00',
		            width: 2,
		            value: data.failLtc,
		            label:{
//		              text:"LTC : "+data.failLtc,
                      text:"LTC",
		              align: 'left',
		              textAlign: 'left',
		              verticalAlign: 'middle'
		            }
		        }]
		    },
//		    plotOptions: {
//		        line: {
//		            dataLabels: {
//		                enabled: true
//		            },
//		            enableMouseTracking: false
//		        }
//		    },
		    exporting: {
			    enabled: false
			},
			credits: {
		        enabled: false
		    },
		    series: [{
		        name: '',
		        data: data.failAvgList
		    }]
		});

}

