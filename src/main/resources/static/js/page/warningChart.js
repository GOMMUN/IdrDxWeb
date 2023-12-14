/**
 * 
 */
let c_factory = null;
let c_material = null;
let c_line = null;

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
	var currentDate = new Date();
	var currentMonth = currentDate.getMonth() + 1;
	$("#month").val(currentMonth).prop("selected", true);
	code();
}

function code() {
	factroy();		// 공장코드 조회
	line();
	material();
}

// 작업일보 이벤트
function setEventListener() {

	$factoryCodes = $("#factoryCodes");
	
	$factoryCodes.change(function() {
		
		let $dropdown = $("#lineCodes");
		$dropdown.empty();

		if (c_line) {
			$.each(c_line, function() {
				if ($factoryCodes.val() == this.mcode) {
					$dropdown.append($("<option/>").val(this.code).text(this.value));
				}
			});
		} else {
			$dropdown.append($("<option/>").val("").text("공정 선택"));
		}

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
		"lineid": $("#lineCodes").val(), 
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

function line() {
	c_line = null;

	$.ajax({
		url: '/code/line',
		type: 'GET',
		async:false,
		success: function(data) {
			c_line = data;
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
	
	let max = 0;
	let min = 0;
	
	data.prodAvgList.forEach(function(value,index) {
		if(index == 0){
			max = value;
			min = value;
		}else{
			if(max <= value){
				max = value;
			}
			
			if(min >= value){
				min = value;
			}
		}
	});
	
	if(max <= data.prodUcl){
		max = data.prodUcl+0.1;
	}
	
	if(min >= data.prodLcl){
		min = data.prodLcl-0.1;
	}
	
	Highcharts.chart('nelsonProdChart', {
		    chart: {
		        type: 'line',
		        marginLeft: 50
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
		        max: max,
		        min: min,
		        opposite: true,
		        plotLines: [{
		            color: '#ff0000',
		            width: 2,
		            value: data.prodUcl,
		            label:{
//		              text:"UCL : "+data.prodUcl,
					  text:"UCL",
		              align: 'left',
		              textAlign: 'left',
		              verticalAlign: 'middle',
		              x: -50,
                	  y: 3
		            }
		        },{
		            color: '#000000',
		            width: 2,
		            value: data.prodAvg,
		            label:{
//		              text:"달성률 평균 : "+data.prodAvg,
					  text:"평균",
		              align: 'left',
		              textAlign: 'left',
		              verticalAlign: 'middle',
		              x: -50,
                	  y: 3
		            }
		        },{
		            color: '#00ff00',
		            width: 2,
		            value: data.prodLcl,
		            label:{
//		              text:"LCL : "+data.prodLcl,
					  text:"LCL",
		              align: 'left',
		              textAlign: 'left',
		              verticalAlign: 'middle',
		              x: -50,
                	  y: 3
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

	if(data.failResult == ""){
		$("#nelsonFailResult").text("");
	}else{
		$("#nelsonFailResult").text("이상감지 : "+data.failResult);
	}
	
	let categories = [];
	
	data.dateList.forEach(function(arg) {
		categories.push(arg.month+"월 "+arg.day+"일");
	});
	
	let max = 0;
	let min = 0;
	
	data.failAvgList.forEach(function(value,index) {
		if(index == 0){
			max = value;
			min = value;
		}else{
			if(max <= value){
				max = value;
			}
			
			if(min >= value){
				min = value;
			}
		}
	});
	
	if(max <= data.failUcl){
		max = data.failUcl+0.1;
	}
	
	if(min >= data.failLcl){
		min = data.failLcl-0.1;
	}
	
	Highcharts.chart('nelsonFailChart', {
		    chart: {
		        type: 'line',
		        marginLeft: 50
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
		        max: max,
		        min: min,
		        opposite: true,
		        plotLines: [{
		            color: '#ff0000',
		            width: 2,
		            value: data.failUcl,
		            label:{
//		              text:"UCL : "+data.failUcl,
                      text:"UCL",
		              align: 'left',
		              textAlign: 'left',
		              verticalAlign: 'middle',
		              x: -50,
                	  y: 3
		            }
		        },{
		            color: '#000000',
		            width: 2,
		            value: data.failAvg,
		            label:{
//		              text:"달성률 평균 : "+data.failAvg,
		              text:"평균",
		              align: 'left',
		              textAlign: 'left',
		              verticalAlign: 'middle',
		              x: -50,
                	  y: 3
		            }
		        },{
		            color: '#00ff00',
		            width: 2,
		            value: data.failLcl,
		            label:{
//		              text:"LCL : "+data.failLcl,
                      text:"LCL",
		              align: 'left',
		              textAlign: 'left',
		              verticalAlign: 'middle',
		              x: -50,
                	  y: 3
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

