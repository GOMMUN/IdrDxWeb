let item_id = null;
let element = null;
let tableOperation = null;
$(function() {
	setEventListener();
	select();
});

function setEventListener() {
	let $grid = $("#table1");
	let $addbtn = $("#addbtn");
	let $removebtn = $("#removebtn");
	let $simulstart = $("#simulstart");
	let $createbtn = $("#Create");
	let $ModifyBtn = $("#Modify");
	let $modalCloseBtn = $("#ModalClose");
	$simulstart.click(function() {
		openLoading(); // 로딩 화면 표시
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

		let url = 'http://localhost:8271/primary/insertplan';

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

		let url = 'http://localhost:8271/primary/remove';

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
		let url = 'http://localhost:8271/primary/getlot';

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


		let url = 'http://localhost:8271/primary/update';

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
	var rows = []
	$table = $("#table1");
	var url = 'http://localhost:8271/primary/productionPlan/findAll'

	$.get(url).then(function(res) {
		$table.bootstrapTable('removeAll')
		for (var i = 0; i < res.data.length; i++) {
			rows.push({
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
		$table.bootstrapTable('append', rows)
	})

}

function item() {
	let url = 'http://localhost:8271/primary/getItem';

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


