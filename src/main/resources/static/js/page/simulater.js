let item_id = null;
let element = null;
let tableOperation = null;

var result = []; 
var chart1data = []; 
var chart2data = []; 

$(function() {
	setEventListener();
	select();
	get();
	chart1(chart1data);
	chart2(chart2data);
});

function setEventListener() {
	let $grid = $("#table1");
	let $grid2 = $("#table2");
	let $addbtn = $("#addbtn");
	let $removebtn = $("#removebtn");
	let $simulstart = $("#simulstart");
	let $createbtn = $("#Create");
	let $ModifyBtn = $("#Modify");
	let $modalCloseBtn = $("#ModalClose");
	$simulstart.click(function() {
		openLoading(); // 로딩 화면 표시
		$.ajax({
			url: "https://simulator.idrenvision.com:8272/pytest",
			type: "GET",
			dataType: "json",
			success: function(data) {
				// 데이터를 표시하기 위해 prompt 대신 alert 사용
				alert(JSON.stringify(data));
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.error("에러: " + textStatus, errorThrown);
			},
			complete: function() {
				closeLoading(); // AJAX 완료 후 로딩 화면 숨기기
			}
		});

	});

	$modalCloseBtn.click(function() {
		$('#addmodal').modal('hide');
	});

	$grid.on('check.bs.table', function(row, $element) {

		if ($grid.bootstrapTable('getSelections').length == 1) {
			element = $element;
		}

		$removebtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('uncheck.bs.table', function(row, $element) {

		$removebtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	$addbtn.click(function() {		//  add 버튼

		$("#Create").css('display', "block");
		$("#Modify").css('display', "none");
		$("select[name=rejectItemCode]").prop('disabled', false);
		$("select[name=lot]").prop('disabled', false);
		$('#addmodal').modal('show');
		$("#rejectItemCode").val("");
		$("input[name=ordername]").val("");
		$("select[name=lot]").val("");
		$("input[name=lotwork]").val("");
		$("input[name=start]").val("");
		$("input[name=end]").val("");
		item();
	});

	$createbtn.click(function() {

		let itemid = $("#rejectItemCode").val();
		let ordername = $("input[name=ordername]").val();
		let lotid = $("select[name=lot]").val();
		let lotwork = $("input[name=lotwork]").val();
		let start = $("input[name=start]").val();
		let end = $("input[name=end]").val();
		// 날짜 객체 생성
		let date = new Date(start);
		// 유닉스 타임 스탬프로 변환
		let startunixTimestamp = date.getTime() / 1000; // 밀리초를 초로 변환
		let date2 = new Date(end);
		let endunixTimestamp = date2.getTime() / 1000; // 밀리초를 초로 변환

		let data = {
			item_id: parseInt(itemid, 10),
			order_name: ordername,
			lot_id: parseInt(lotid, 10),
			lot_work: lotwork,
			start_time: startunixTimestamp,
			end_time: endunixTimestamp
		}

		if (data.order_name == "") {
			alert("주문명을 입력해주세요");
			$("input[name=ordername]").focus;
			return;
		} else if (Number.isNaN(data.item_id)) {
			$("select[name=rejectItemCode]").focus();
			alert("아이템을 선택해주세요");
			return;
		} else if (Number.isNaN(data.lot_id)) {
			alert("Lot을 선택해주세요");
			$("select[name=lot]").focus();
			return;
		} else if (data.lot_work == "") {
			alert("생산수량을 입력해주세요");
			$("input[name=lotwork]").focus;
			return;
		} else if (Number.isNaN(data.start_time)) {
			alert("날짜를 선택해주세요");
			return;
		} else if (Number.isNaN(data.end_time)) {
			alert("납기를 선택해주세요");
			return;
		} else if (parseInt(data.lot_work, 10) < 0) {
			alert("음수는 입력 할수 없습니다.");
			return;
		}

		if (date > date2) {
			alert("시작 시간이 납기보다 늦을 수 없습니다.");
			return;
		}

		//let url = 'http://localhost:8271/primary/insertplan';
		var url = 'https://simulator.idrenvision.com:8271/primary/insertplan'
		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result) {
				if (result.status == 200) {
					alert("저장완료");
					$('#addmodal').modal('hide');
					select();
				}
			},
			error: function(result) {
				if (result.status == 400) {
					alert("저장실패");
				}
			}
		});

	})
	
	$removebtn.click(function() {		//  add 버튼

		if (!confirm("생산계획 삭제 시 연관된 세부 데이터도 전부 삭제됩니다.\n정말 삭제하시겠습니까?")) {
			return;
		}
		params = {
			order_id: element.order_id
		}

		//let url = 'http://localhost:8271/primary/remove';
		var url = 'https://simulator.idrenvision.com:8271/primary/remove'
		$.ajax({
			url: url,
			type: 'DELETE',
			data: JSON.stringify(params),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result) {
				if (result.status == 200) {
					$removebtn.prop('disabled', true);
					alert("삭제 되었습니다.");
					select();
				} else if (result.status == 400) {
					alert("삭제실패");
				}

			}
		});

	});

	$("#rejectItemCode").on("change", function(event) {
		let url = 'https://simulator.idrenvision.com:8271/primary/getlot';

		let item_id;
		if (event.data) {
			item_id = event.data.item_id; // 데이터에서 item_id를 가져옵니다.
		} else {
			item_id = $(this).val();
		}

		var params = {
			get_id: item_id
		}

		$.ajax({
			url: url + '?' + $.param(params),
			type: 'GET',
			async: false,
			success: function(res) {
				var c_reject_lot = res;

				let $dropdown = $("#lot");
				$dropdown.empty();

				if (c_reject_lot) {
					$dropdown.append($("<option/>").val("").text("lot선택"));
					for (var i = 0; i < res.data.length; i++) {
						$dropdown.append($("<option/>").val(res.data[i].lot_id).text(res.data[i].lot_name));
					}

				} else {
					$dropdown.append($("<option/>").val("").text("item선택"));
				}
			}
		});

	})

	$ModifyBtn.click(function() {

		let itemid = $("#rejectItemCode").val();
		let ordername = $("input[name=ordername]").val();
		let lotid = $("select[name=lot]").val();
		let lotwork = $("input[name=lotwork]").val();
		let start = $("input[name=start]").val();
		let end = $("input[name=end]").val();
		// 날짜 객체 생성
		let date = new Date(start);
		// 유닉스 타임 스탬프로 변환
		let startunixTimestamp = date.getTime() / 1000; // 밀리초를 초로 변환
		date2 = new Date(end);
		let endunixTimestamp = date2.getTime() / 1000; // 밀리초를 초로 변환


		//let url = 'http://localhost:8271/primary/update';
		var url = 'https://simulator.idrenvision.com:8271/primary/update'
		let data = {
			item_id: itemid,
			order_name: ordername,
			lot_id: lotid,
			lot_work: lotwork,
			start_time: startunixTimestamp,
			end_time: endunixTimestamp,
			order_id: tableOperation.order_id
		}

		if (data.order_name == "") {
			alert("주문명을 입력해주세요");
			$("input[name=ordername]").focus;
			return;
		} else if (itemid == "") {
			$("select[name=rejectItemCode]").focus();
			alert("아이템을 선택해주세요");
			return;
		} else if (lotid == "") {
			alert("Lot을 선택해주세요");
			$("select[name=lot]").focus();
			return;
		} else if (data.lot_work == "") {
			alert("생산수량을 입력해주세요");
			$("input[name=lotwork]").focus;
			return;
		} else if (start == "") {
			alert("날짜를 선택해주세요");
			return;
		} else if (end == "") {
			alert("납기를 선택해주세요");
			return;
		} else if (parseInt(data.lot_work, 10) < 0) {
			alert("음수는 입력 할수 없습니다.");
			return;
		}

		if (date > date2) {
			alert("시작 시간이 납기보다 늦을 수 없습니다.");
			return;
		}

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result) {

				if (result.status == 200) {

					alert("수정완료");
					$('#addmodal').modal('hide');
					select();
				}
			},
			error: function(result) {

				if (result.status == 400) {
					alert(message);
				}
			}
		});
	});

}

function select() {
	var rows1 = []
	var rows2 = []
	$table = $("#table1");
	$table2 = $("#table2");
	//var url = 'http://localhost:8271/primary/productionPlan/findAll'
	
	var url = 'https://simulator.idrenvision.com:8271/primary/productionPlan/findAll'
    
	$.get(url).then(function(res) {
		$table.bootstrapTable('removeAll')
		for (var i = 0; i < res.data.length; i++) {
			rows1.push({
				order_id: res.data[i].order_id,
				order_name: res.data[i].order_name,
				item_id: res.data[i].item_id,
				item_name: res.data[i].item_name,
				lot_id: res.data[i].lot_id,
				lot_name: res.data[i].lot_name,
				start_time: res.data[i].start_time,
				end_time: res.data[i].end_time,
				lot_work: res.data[i].lot_work
			})
		}
		$table.bootstrapTable('append', rows1)
	})
	
	$.get(url).then(function(res) {
		$table2.bootstrapTable('removeAll')
		for (var i = 0; i < res.data.length; i++) {
			rows2.push({
				order_id: res.data[i].order_id,
				order_name: res.data[i].order_name,
				start_time: res.data[i].start_time,
				end_time: res.data[i].end_time,
			})
		}
		$table2.bootstrapTable('append', rows2)
	})

}

function get() {
	
	var url1 = 'https://simulator.idrenvision.com:8271/secondary/EquipResult'
    
	$.get(url1).then(function(res) {
		var result = res.data;
		
		var machineName = [];
		var equipPerformace = [];
			
		for(var i=0; i<4; i++) {
			machineName[i] = result[i].machineName;
		    equipPerformace[i] = result[i].equipPerformace;
		}
		
        if (machineName[0] !== null && machineName[0] !== undefined) {
        	$('#machineName1').text(machineName[0]);
        } else {
		    $('#machineName1').text('-');
		}	
        if (equipPerformace[0] !== null && !isNaN(equipPerformace[0])) {
		    $('#equipPerformance1').text(equipPerformace[0] + '%');
		} else {
		    $('#equipPerformance1').text('-');
		}
        if (machineName[1] !== null && !machineName[1] !== undefined) {		
        	$('#machineName2').text(machineName[1]);
        } else {
		    $('#machineName2').text('-');
		}	
		if (equipPerformace[1] !== null && !isNaN(equipPerformace[1])) {        	
        	$('#equipPerformance2').text(equipPerformace[1] + '%');
        } else {
		    $('#equipPerformance2').text('-');
		}
        if (machineName[2] !== null && machineName[2] !== undefined) {
        	$('#machineName3').text(machineName[2]);
        } else {
		    $('#machineName3').text('-');
		}	
        if (equipPerformace[2] !== null && !isNaN(equipPerformace[2])) {        	
        	$('#equipPerformance3').text(equipPerformace[2] + '%');
        } else {
		    $('#equipPerformance3').text('-');
		}
        if (machineName[3] !== null && machineName[3] !== undefined) {
        	$('#machineName4').text(machineName[3]);
        } else {
		    $('#machineName4').text('-');
		}	
        if (equipPerformace[3] !== null && !isNaN(equipPerformace[3])) {        	
        	$('#equipPerformance4').text(equipPerformace[3] + '%');
        } else {
		    $('#equipPerformance4').text('-');
		}
	})
	
	var url2 = 'https://simulator.idrenvision.com:8271/secondary/LeadTime'
    
	$.get(url2).then(function(res) {
		var result = res.data;

        if (result.procTimeH !== null && result.procTimeH !== undefined) {        	
        	$('#procTimeH').text(result.procTimeH);
        } else {
		    $('#procTimeH').text('-');
		}
		if (result.avgLeadTimeH !== null && result.avgLeadTimeH !== undefined) {        	
        	$('#avgLeadTimeH').text(result.avgLeadTimeH);
        } else {
		    $('#avgLeadTimeH').text('-');
		}
		if (result.maxLeadTimeH !== null && result.maxLeadTimeH !== undefined) {        	
        	$('#maxLeadTimeH').text(result.maxLeadTimeH);
        } else {
		    $('#maxLeadTimeH').text('-');
		}
		if (result.minLeadTimeH !== null && result.minLeadTimeH !== undefined) {        	
        	$('#minLeadTimeH').text(result.minLeadTimeH);
        } else {
		    $('#minLeadTimeH').text('-');
		}
		if (result.avgLossTimeH !== null && result.avgLossTimeH !== undefined) {        	
        	$('#avgLossTimeH').text(result.avgLossTimeH);
        } else {
		    $('#avgLossTimeH').text('-');
		}
		if (result.maxLossTimeH !== null && result.maxLossTimeH !== undefined) {        	
        	$('#maxLossTimeH').text(result.maxLossTimeH);
        } else {
		    $('#maxLossTimeH').text('-');
		}
		if (result.minLossTimeH !== null && result.minLossTimeH !== undefined) {        	
        	$('#minLossTimeH').text(result.minLossTimeH);
        } else {
		    $('#minLossTimeH').text('-');
		}
	})
	
	var url3 = 'https://simulator.idrenvision.com:8271/secondary/DailyProduction';
		
	$.get(url3).then(function(res) {
		chart1data = res.data;
		chart1(chart1data);
	});

}

function item() {
	let url = 'https://simulator.idrenvision.com:8271/primary/getItem';

	var c_reject_item = null;

	$.ajax({
		url: url,
		type: 'GET',
		async: false,
		success: function(res) {
			var c_reject_item = res;

			let $dropdown = $("#rejectItemCode");
			$dropdown.empty();

			if (c_reject_item) {
				$dropdown.append($("<option/>").val("").text("item선택"));
				for (var i = 0; i < res.data.length; i++) {
					$dropdown.append($("<option/>").val(res.data[i].item_id).text(res.data[i].item_name));
				}

			} else {
				$dropdown.append($("<option/>").val("").text("item선택"));
			}
		}
	});
}

function tableOperateFormatter(value, row, index) {
	return [
		'<a class="simulaterModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

var simulOperateEvents = {
	"click .simulaterModify": function(e, value, row, index) {
		item();
		tableOperation = row;

		// 이벤트 객체를 생성하고 데이터를 설정


		$("select[name=rejectItemCode]").val(row.item_id);
		$("input[name=ordername]").val(row.order_name);
		var event = $.Event("change");
		event.data = { item_id: row.item_id };
		$("#rejectItemCode").trigger(event);
		$("select[name=lot]").val(row.lot_id);
		$("input[name=lotwork]").val(row.lot_work);
		$("input[name=start]").val(row.start_time.slice(0, 10));
		$("input[name=end]").val(row.end_time.slice(0, 10));

		$("#Create").css('display', "none");
		$("#Modify").css('display', "block");
		$("select[name=rejectItemCode]").prop('disabled', true);
		$("select[name=lot]").prop('disabled', true);
		$('#addmodal').modal('show');

	}

}

// 로딩창 키는 함수
function openLoading() {
	//화면 높이와 너비를 구합니다.
	let maskHeight = $(document).height();
	let maskWidth = window.document.body.clientWidth;
	//출력할 마스크를 설정해준다.
	let mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
	// 로딩 이미지 주소 및 옵션
	let loadingImg = '';
	loadingImg += "<div id='loadingImg' style='position:absolute; top: calc(50% - (200px / 2)); width:100%; z-index:99999999;'>";
	loadingImg += " <img src='/static/image/spinner2.gif' style='position: relative; display: block; margin: 0px auto;'/>";
	loadingImg += "</div>";
	//레이어 추가
	$('body')
		.append(mask)
		.append(loadingImg)
	//마스크의 높이와 너비로 전체 화면을 채운다.
	$('#mask').css({
		'width': maskWidth,
		'height': maskHeight,
		'opacity': '0.3'
	});
	//마스크 표시
	$('#mask').show();
	//로딩 이미지 표시
	$('#loadingImg').show();
}

// 로딩창 끄는 함수
function closeLoading() {
	$('#mask, #loadingImg').hide();
	$('#mask, #loadingImg').empty();
}

function chart1(chart1data){
	
	var date = [];
	var count = [];
			
	for(var i=0; i< chart1data.length; i++) {
		date[i] = parseInt(chart1data[i].date.substring(0, 2)) + '월 ' + parseInt(chart1data[i].date.substring(3,5)) + '일';
		count[i] = chart1data[i].count;
	}

	Highcharts.chart('chart1', {
		chart: {
	        type: 'line'
	    },
	    title: {
	        text: '',
	        align: 'left'
	    },
	
	
	    legend: {
			itemDistance: 40,
	        verticalAlign: 'bottom',
	        align: 'center'
	    },
	    
	    plotOptions: {
	        series: {
	            label: {
	                connectorAllowed: false
	            },
	        },
	        line: {
	            marker: {
	                enabled: false // 점 표시 비활성화
	            }
	        }
	    },
	    lang: {
	        noData: 'No matching records found'
	    },
		noData: {
		    	style: {
		        fontWeight: 'bold',
		        fontSize: '15px',
		        color: '#333333'
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
	                               dataToShow[i].seriesName + ': </span>' + dataToShow[i].value + "개" + '<br>';
	            }
	
	            return tooltipText;
	        },
	        shared: true, // 툴팁을 공유합니다.		
		},
		
	    xAxis: {
	        categories: date,
	        labels: {
		        rotation: -90 // Rotate the labels by -45 degrees
		    }
	    },
	    
	    scrollbar: {
	        enabled: true
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
	    
	    lang: {
	        noData: 'No matching records found'
	    },
		noData: {
		    	style: {
		        fontWeight: 'bold',
		        fontSize: '15px',
		        color: '#333333'
		    }
		},
	
	    series: [{
		        name: 'MOT-DK',
		        data: count,
		        lineWidth: 3
	    	}],
	    	
	    colors: ['#0019F4']
	});
}

function chart2(chart2data){
	
	Highcharts.chart('chart2', {
	    chart: {
	        type: 'column',
	        scrollablePlotArea: {
		      minWidth: 2500,
		      scrollPositionX: 1
		    }
	    },
	    title: {
	        text: '',
	        align: 'left'
	    },
	    xAxis: {
			min: 0,
	        categories: ['7월', '8월', '9월'],
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
		lang: {
	        noData: 'No matching records found'
	    },
		noData: {
		    	style: {
		        fontWeight: 'bold',
		        fontSize: '15px',
		        color: '#333333'
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
	    series: 
			[{
		        name: '납기준수율',
		        data: [77, 87, 93,77, 87, 93,77, 87, 93,77, 87, 93,77, 87, 93,77, 87, 93,77, 87, 93,77, 87, 93,77, 87, 93,77, 87, 93,77, 87, 93]
		    }],
	    colors: [
			'#0D70C6'
			]
	});
}

