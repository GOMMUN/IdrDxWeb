let item_id = null;
let element = null;
let tableOperation=0;
$(function() {
	setEventListener();
	select();
});

function setEventListener() {
	let $grid = $("#table");
	let $addbtn = $("#addbtn");
	let $removebtn = $("#removebtn");
	let $simulstart = $("#simulstart");
	let $createbtn = $("#Create");

	$simulstart.click(function() {
		
		$.ajax({
			url: "http://idrenvisionhq.iptime.org:8272/pytest",
			type: "GET",
			dataType: "json",
			success: function(data) {
				// 데이터를 표시하기 위해 prompt 대신 alert 사용
				alert(JSON.stringify(data));
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.error("에러: " + textStatus, errorThrown);
			}
		});
		
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

		$('#addmodal').modal('show');
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
		date = new Date(end);
		let endunixTimestamp = date.getTime() / 1000; // 밀리초를 초로 변환

		let data = {
			item_id: parseInt(itemid,10),
			order_name: ordername,
			lot_id: parseInt(lotid,10),
			lot_work: lotwork,
			start_time: startunixTimestamp,
			end_time: endunixTimestamp
		}

		let url = 'http://localhost:8271/primary/insertplan';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result) {
					alert("저장완료");
					
					
			},
			error: function(request, status, error) {
					alert(message);	
			}
		});
	
	})



	$removebtn.click(function() {		//  add 버튼

		params = {
			order_id: element.order_id
		}

		let url = 'http://localhost:8271/primary/remove';

		$.ajax({
			url: url,
			type: 'DELETE',
			data: JSON.stringify(params),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result) {
				$removebtn.prop('disabled', true);
				alert("삭제 되었습니다.");
			}
		});
		
	});

	$("#rejectItemCode").on("change", function() {
		let url = 'http://localhost:8271/primary/getlot';

		item_id = $("#rejectItemCode").val();

		var params = {
			get_id: item_id
		}

		$.get(url + '?' + $.param(params)).then(function(res) {
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
		})

	})
/*
	$modalModifyBtn.click(function() {
	
	
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
		date = new Date(end);
		let endunixTimestamp = date.getTime() / 1000; // 밀리초를 초로 변환


		let url = 'http://localhost:8271/primary/udpate';

		let data = {
			item_id: itemid,
			order_name: ordername,
			lot_id: lotid,
			lot_work: lotwork,
			start_time: startunixTimestamp,
			end_time: endunixTimestamp,
			order_id: tableOperation.order_id
		}
		
		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result) {

				if (code == 200) {

					alert("저장완료");

				}
			},
			error: function(request, status, error) {

				if (code == 400) {
					alert(message);
				}
			}
		});
	});
*/

}


function select() {
	var rows = []
	$table = $("#table");
	var url = 'http://localhost:8271/primary/productionPlan/findAll'
	
	$.get(url).then(function(res) {
		for (var i = 0; i < res.data.length; i++) {
			rows.push({
				order_id: res.data[i].order_id,
				order_name: res.data[i].order_name,
				item_name: res.data[i].item_name,
				start_time: res.data[i].start_time,
				end_time: res.data[i].end_time,
				lot_work: res.data[i].lot_work
			})
		}
		$table.bootstrapTable('append', rows)
	})

}

function item() {
	let url = 'http://localhost:8271/primary/getItem';

	var c_reject_item = null;

	$.ajax({
		url: url,
		type: 'GET',
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
		'<a class="workDailyReportModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

/*
window.operateEvents = {
	"click .workDailyReportModify": function(e, value, row, index) {
		tableOperation = row;

		$("#Create").css('display', "none");
		$("#Modify").css('display', "block");

		$('#addmodal').modal('show');


	}
}*/

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


