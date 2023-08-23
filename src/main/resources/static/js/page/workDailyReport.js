/**
 * 
 */
//const CORE_URL = "http://localhost:8171";
const CORE_URL = "https://idrenvision.iptime.org:8171";

let c_factory = null;
let c_block = null;
let c_line = null;
let c_shift = null;
let c_model = null;
let c_input_item = null;
let c_material = null;
let c_reject_item = null;
let c_reject_type = null;
let c_person = null;
//let c_model_item=null;
let s_workDailyReport = null;
let dataseq = null;
let s_workerInput = null;
let s_workerManHour = null;
let s_workContent = null;
let s_NonconFormity = null;
let s_NonOperation = null;

$(function() {
	initSetting();
	setEventListener();
});

function initSetting() {

	localStorage.setItem("plant", $("#parameterPlant").val());
	localStorage.setItem("username", $("#parameterUsername").val());

	$("input[name=workDate]").datepicker({
		format: "yyyy-mm-dd",
		autoclose: true,
		language: "ko"
	});

	code();
}

function code() {
	//factroy();		// 공장코드 조회
	//block();
	line();
	shift();		// 주/야간구분 코드 조회
	input_item();
	model();
	matarial();
	reject_item();
	reject_type();
}

// Jquery에서 해당 함수명이 있으면 자동으로 호출
function setEventListener() {

	setWorkDailyReportEventListener();		// 작업일보 이벤트 리스너
	setWorkerInputEventListener();			// 작업자투입현황 이벤트 리스너
	setWorkerManhourEventListener();		// 공수투입현황 이벤트 리스너
	setWorkerSupportEventListener();        // 타라인지원내역 이벤트 리스너
	setWorkContentsEventListener();			// 작업내용 이벤트리스너
	setNonconFormityEventListener();        // 부적합내역 이벤트 리스너
	setNonOperationEventListener();         // 비가동내역 이벤트 리스너
}

// 작업일보 이벤트
function setWorkDailyReportEventListener() {
	let $grid = $("#workDailyReport");							// 작업일보 그리드
	let $gridAddBtn = $("#addWorkDailyReport");					// 작업일보 그리드 add 버튼
	let $gridRemoveBtn = $("#removeWorkDailyReport");			// 작업일보 그리드 delete 버튼		
	let $modalCloseBtn = $("#addWorkDailyReportModalClose");	// 작업일보 모달 close 버튼
	let $modalCreateBtn = $("#addWorkDailyReportModalCreate");	// 작업일보 모달 insert 버튼
	let $modalModifyBtn = $("#addWorkDailyReportModalModify");	// 작업일보 모달 update 버튼

	$grid.on('check.bs.table', function(row, $element) {

		if ($grid.bootstrapTable('getSelections').length == 1) {
			s_workDailyReport = $element;
			dataseq = $element.dataseq;
		} else {
			s_workDailyReport = null;
		}

		if (s_workDailyReport) {
			workerInput($element);
			workerManhour($element);
			workerSupport($element);
			workContents($element);
			rejectContents($element);
			notoperateContents($element);
			personfind($element);
		}

		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('uncheck.bs.table', function(row, $element) {

		if ($grid.bootstrapTable('getSelections').length == 1) {
			s_workDailyReport = $grid.bootstrapTable('getSelections')[0];
		} else {
			s_workDailyReport = null;
		}
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('check-all.bs.table', function(rowsAfter, rowsBefore) {
		s_workDailyReport = null;
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('uncheck-all.bs.table', function(rowsAfter, rowsBefore) {
		s_workDailyReport = null;
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('page-change.bs.table', function(number, size) {
		s_workDailyReport = null;
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$gridAddBtn.click(function() {

		resetWorkDailyReport();

		$("#addWorkDailyReportModalCreate").css('display', "block");
		$("#addWorkDailyReportModalModify").css('display', "none");

		$('#addWorkDailyReportModal').modal('show');
	});

	$modalCloseBtn.click(function() {
		$('#addWorkDailyReportModal').modal('hide');
	});

	$modalCreateBtn.click(function() {

		let data = initWorkDailyReport();

		 // 현재 입력 요소의 값을 가져옵니다.
	    let originalWorkDate = $("input[name=workDate]").val();
	
	    // 하이픈(-)을 제거하여 원하는 형식으로 변환합니다.
	    let convertedWorkDate = originalWorkDate.replace(/-/g, '');
	
	    // 변환된 값을 data.workDate에 저장합니다.
	    data.date = convertedWorkDate;
		//data.blockid = $("select[name=blockid]").val();
		//data.factoryid = $("select[name=factoryid]").val();
		data.plant = localStorage.getItem("plant");
		//data.groupid = $("select[name=groupid]").val();
		data.line = $("select[name=lineid]").val();
		data.shift = $("select[name=shiftid]").val();
		data.material = $("select[name=wdrmatarial]").val();
		data.model = $("select[name=wdrmodel]").val();
		data.planqty = $("input[name=planqty]").val();
		data.notes = $("input[name=notes]").val();
		data.creator = localStorage.getItem("username");
		data.tid = tid();

		//validation check
		if (data.date == "") {
			alert("날짜를 선택해주세요.");
			$("input[name=workDate]").focus();
			return;
		} else if (data.plant == "") {
			alert("공장을 선택해주세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.line == "") {
			alert("공정을 선택해주세요.");
			$("select[name=lineid]").focus();
			return;
		} else if (data.shift == "") {
			alert("작업구분을 선택해주세요.");
			$("select[name=shiftid]").focus();
			return;
		} else if (data.material == "") {
			alert("자재를 선택해주세요.");
			$("select[name=wdrmatarial]").focus();
			return;
		} else if (data.model == "") {
			alert("차종을 선택해주세요.");
			$("select[name=wdrmodel]").focus();
			return;
		} else if (data.planqty == "") {
			alert("계획수량을 선택해주세요.");
			$("select[name=planqty]").focus();
			return;
		}



		let url = CORE_URL + '/workdaily-report/';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify([data]),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				let code = result.status;
				let message = result.message;
				
				if(code == 200){
					if (result == -1) {
						alert("중복된 데이터가 있습니다.");
					}
					else {
						$('#addWorkDailyReportModal').modal('hide');
						alert("저장되었습니다.");
						workDailyReport();
					}
					//$gridRemoveBtn.prop('disabled', true);
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
	});

	$modalModifyBtn.click(function() {

		if (s_workDailyReport) {
			let data = s_workDailyReport;

			data.workDate = $("input[name=workDate]").val();
			//data.blockid = $("select[name=blockid]").val();
			//data.factoryid = $("select[name=factoryid]").val();
			data.factoryid = localStorage.getItem("plant");
			//data.groupid = $("select[name=groupid]").val();
			data.lineid = $("select[name=lineid]").val();
			data.shiftid = $("select[name=shiftid]").val();
			data.metarialid = $("select[name=wdrmatarial]").val();
			data.modelid = $("select[name=wdrmodel]").val();
			data.approver = $("input[name=approver]").val();
			data.reviewer = $("input[name=reviewer]").val();
			data.planQty = $("input[name=planqty]").val();
			data.notes = $("input[name=notes]").val();

			//validation check
			if (data.workDate == "") {
				alert("날짜를 선택해주세요.");
				$("input[name=workDate]").focus();
				return;
			} else if (data.factoryid == "") {
				alert("공장을 선택해주세요.");
				$("select[name=factoryid]").focus();
				return;
			} else if (data.lineid == "") {
				alert("라인을 선택해주세요.");
				$("select[name=lineid]").focus();
				return;
			} else if (data.groupid == "") {
				alert("조구분을 선택해주세요.");
				$("select[name=groupid]").focus();
				return;
			} else if (data.shiftid == "") {
				alert("주/야구분을 선택해주세요.");
				$("select[name=shiftid]").focus();
				return;
			} else if (data.planQty == "") {
				alert("계획수량을 선택해주세요.");
				$("select[name=planqty]").focus();
				return;
			}
			let url = '/workDailyReport/modify';

			$.ajax({
				url: url,
				type: 'PUT',
				data: JSON.stringify(data),
				dataType: "json",
				contentType: 'application/json; charset=utf-8',
				success: function(result){
					$('#addWorkDailyReportModal').modal('hide');
					alert("수정 되었습니다.");
					workDailyReport();
				}
			});
		}
	});

	$gridRemoveBtn.click(function() {

		let selections = [];

		$grid.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);
		});
		if(!confirm("작업일보 마스터 삭제시 연관된 세부데이터도 전부 삭제됩니다.\n정말 삭제하시겠습니까?")){
			return;
		}
		
		let url = '/workDailyReport/remove';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				$gridRemoveBtn.prop('disabled', true);
				alert("삭제 되었습니다.");
				workDailyReport();
			}
		});
	});


	/*
	// modal 
	$factoryCodes = $("#factoryCodes");
	
	$factoryCodes.change(function() {

		let $dropdown1 = $("#blockCodes");
		$dropdown1.empty();

		if (c_block) {
			$dropdown1.append($("<option/>").val("").text("블록 선택"));
			$.each(c_block, function() {
				if (localStorage.getItem('plant') == this.mcode) {
					$dropdown1.append($("<option/>").val(this.code).text(this.value));
				}
			});
		} else {
			$dropdown1.append($("<option/>").val("").text("블록 선택"));
		}


		let $dropdown2 = $("#lineCodes");
		$dropdown2.empty();

		if (c_line) {
			$dropdown2.append($("<option/>").val("").text("공정 선택"));
			$.each(c_line, function() {
				if (localStorage.getItem('plant') == this.mcode) {
					$dropdown2.append($("<option/>").val(this.code).text(this.value));
				}
			});
		} else {
			$dropdown2.append($("<option/>").val("").text("공정 선택"));
		}

		let $dropdown3 = $("#shiftCodes");
		$dropdown3.empty();

		if (c_shift) {
			$dropdown3.append($("<option/>").val("").text("작업구분 선택"));
			$.each(c_shift, function() {
				debugger;
				if (localStorage.getItem('plant') == this.mcode) {
					$dropdown3.append($("<option/>").val(this.code).text(this.value));
				}
			});
		} else {
			$dropdown3.append($("<option/>").val("").text("작업구분 선택"));

		}

		let $dropdown4 = $("#wdrmodelid");
		$dropdown4.empty();

		if (c_model) {
			$dropdown4.append($("<option/>").val("").text("차종 선택"));
			$.each(c_model, function() {

				$dropdown4.append($("<option/>").val(this.code).text(this.value));

			});
		} else {
			$dropdown4.append($("<option/>").val("").text("차종 선택"));

		}

		let $dropdown5 = $("#wdrmatarialid");
		$dropdown5.empty();

		if (c_material) {
			$dropdown5.append($("<option/>").val("").text("자재 선택"));
			$.each(c_material, function() {
				if (localStorage.getItem('plant') == this.mcode) {
					$dropdown5.append($("<option/>").val(this.code).text(this.value));
				}
			});
		} else {
			$dropdown5.append($("<option/>").val("").text("자재 선택"));

		}
	});
	*/
}

function setWorkerInputEventListener() {
	let $grid = $("#workerInput");
	let $gridAddBtn = $("#addWorkerInput");
	let $gridRemoveBtn = $("#removeWorkerInput");
	let $selectworker = $("#selectWorker");
	let $modalCreateBtn = $("#addWorkerInputModalCreate");	// 작업일보 모달 insert 버튼
	let $modalCloseBtn = $("#addWorkerInputModalClose");		// 작업일보 모달 close 버튼
	let $modalModifyBtn = $("#addWorkerInputModalModify");
	let data = initWorkerInput();
	$grid.on('check.bs.table', function(row, $element) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
		s_workerInput = $element;

	});

	$grid.on('uncheck.bs.table', function(row, $element) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('check-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('uncheck-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('pre-body.bs.table', function(data) {
	});

	$gridAddBtn.click(function() {
		if (!s_workDailyReport) {
			alert("작업일보를 선택해주세요.");
			return;
		}
		$("select[name=overtimeyn]").val("");
		$("input[name=workinputdesc]").val("");
		$("#addWorkerInputModalCreate").css('display', "block");
		$("#addWorkerInputModalModify").css('display', "none");

		$('#addWorkerIntputModal').modal('show');
	});

	$gridRemoveBtn.click(function() {

		let selections = [];

		$grid.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);
		});

		let url = '/workerInput/remove';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				$gridRemoveBtn.prop('disabled', true);
				alert("삭제 되었습니다.");
				workerInput(s_workDailyReport);
			}
		});
	});

	$selectworker.on('check.bs.table', function(row, $element, field) {
		data.worker = null;
		data.worker = $element.personid;
		data.personid = $element.personid;

	});

	$modalCloseBtn.click(function() {
		$('#addWorkerIntputModal').modal('hide');
	});
	
	$modalCreateBtn.click(function() {
		data.date = s_workDailyReport.workDate;
		data.line = s_workDailyReport.lineid;
		data.material = s_workDailyReport.materialid;
		data.model = s_workDailyReport.modelid;
		data.plant = s_workDailyReport.factoryid;
		data.shift = s_workDailyReport.shiftid;
		
		data.workdailySeq = dataseq;
		data.notes = $("input[name=workinputdesc]").val();
		data.overtime = $("select[name=overtimeyn]").val();
		data.tid = tid();

		if (data.worker == "") {
			alert("작업자를 선택 하세요.");
			return;
		}

		if (data.overtime == null) {
			alert("잔업여부를 선택 하세요.");
			return;
		}

		let flag = true;

//		c_person.forEach(function(element) {
//			if (element.personid == data.worker) {
//				alert("동일한 작업자가 이미 등록 되었습니다.");
//				flag = false;
//			}
//		});

		if (flag) {
			let url = CORE_URL + '/worker-input/';

			$.ajax({
				url: url,
				type: 'POST',
				data: JSON.stringify([data]),
				dataType: "json",
				contentType: 'application/json; charset=utf-8',
				success: function(result){
					let code = result.status;
					let message = result.message
					
					if(code == 200){
						$('#addWorkerIntputModal').modal('hide');
						alert("저장완료");
						workerInput(s_workDailyReport);
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
	});

	$modalModifyBtn.click(function() {
		// s_workDailyReport

		data.notes = $("input[name=workinputdesc]").val();
		data.overtime = $("select[name=overtimeyn]").val();
		data.dataseq = s_workerInput.dataseq;

		let url = '/workerInput/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				$('#addWorkerIntputModal').modal('hide');
				alert("수정완료");
				workerInput(s_workDailyReport);
			}
		});
	});
}

function setWorkerManhourEventListener() {

	let $grid = $("#workerManhour");
	let $gridAddBtn = $("#addWorkerManhour");
	let $gridRemoveBtn = $("#removeWorkerManhour");

	let $modalCloseBtn = $("#addWorkerManhourModalClose");		// 작업일보 모달 close 버튼
	let $modalCreateBtn = $("#addWorkerManhourModalCreate");	// 작업일보 모달 insert 버튼
	let $modalModifyBtn = $("#addWorkerManhourModalModify");	// 작업일보 모달 update 버튼

	$grid.on('check.bs.table', function(row, $element) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)



	});

	$grid.on('uncheck.bs.table', function(row, $element) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('check-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('uncheck-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$gridAddBtn.click(function() {

		if (!s_workDailyReport) {
			alert("작업일보를 선택해주세요.");
			return;
		}

		resetWorkerManhour();

		$("#addWorkerManhourModalCreate").css('display', "block");
		$("#addWorkerManhourModalModify").css('display', "none");

		$('#addWorkerManhourModal').modal('show');
	});

	$modalCloseBtn.click(function() {
		$('#addWorkerManhourModal').modal('hide');
	});


	$modalCreateBtn.click(function() {
		// s_workDailyReport
		let data = initWorkerManhour();
		
		data.date = s_workDailyReport.workDate;
		data.line = s_workDailyReport.lineid;
		data.material = s_workDailyReport.materialid;
		data.model = s_workDailyReport.modelid;
		data.plant = s_workDailyReport.factoryid;
		data.shift = s_workDailyReport.shiftid;

		data.workdailySeq = s_workDailyReport.dataseq;
		data.man = $("input[name=hands]").val();
		data.manhour = $("input[name=manhour]").val();
		data.separation = $("select[name=inputItemid]").val();
		data.tid = tid();

		if (!data.man) {
			alert("인원을  선택해주세요.");
			return;
		}
		if (!data.manhour) {
			alert("공수를 선택해주세요.");
			return;
		}
		if (!data.separation) {
			alert("구분을 선택해주세요.");
			return;
		}
		let url = CORE_URL + '/worker-manhour/';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify([data]),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				
				let code = result.status;
				let message = result.message;
				
				if(code == 200){
					$('#addWorkerManhourModal').modal('hide');
					alert("저장 완료");
					workerManhour(s_workDailyReport);
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

	});

	$gridRemoveBtn.click(function() {

		let selections = [];

		$grid.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);
		});

		let url = '/workerManhour/remove';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				$gridRemoveBtn.prop('disabled', true);
				alert("삭제되었습니다.");
				workerManhour(s_workDailyReport);
			}
		});
	});

	$modalModifyBtn.click(function() {
		// s_workDailyReport

		let data = initWorkerManhour();

		data.dataseq = s_workerInput.dataseq;
		data.hands = $("input[name=hands]").val();
		data.manhour = $("input[name=manhour]").val();
		data.inputItemid = $("select[name=inputItemid]").val();

		let url = '/workerManhour/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				$('#addWorkerManhourModal').modal('hide');
				alert("수정 완료");
				workerManhour(s_workDailyReport);
			}
		});
	});
}

function setWorkerSupportEventListener() {
	let $grid = $("#workerSupport");
	let $gridAddBtn = $("#addworkerSupport");
	let $gridRemoveBtn = $("#removeworkerSupport");
	let $selectworker = $("#selectWorkerSupport");
	let $modalCreateBtn = $("#addWorkerSupportModalCreate");	// 작업일보 모달 insert 버튼
	let $modalCloseBtn = $("#addWorkerSupportModalClose");		// 작업일보 모달 close 버튼
	let $modalModifyBtn = $("#addWorkerSupportModalModify");	// 작업일보 모달 update 버튼
	let data = initWorkerSupportInput();
	$grid.on('check.bs.table', function(row, $element) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)


	});

	$grid.on('uncheck.bs.table', function(row, $element) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('check-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('uncheck-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('pre-body.bs.table', function(data) {
	});

	$gridAddBtn.click(function() {
		if (!s_workDailyReport) {
			alert("작업일보를 선택해주세요.");
			return;
		}

		$("input[name=supportmanhour]").val("");
		$("input[name=supporttimeFrom]").val("");
		$("input[name=supporttimeTo]").val("");

		$("#addWorkerSupportModalCreate").css('display', "block");
		$("#addWorkerSupportModalModify").css('display', "none");

		$('#addWorkerSupportModal').modal('show');
	});

	$gridRemoveBtn.click(function() {

		let selections = [];

		$grid.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);
		});

		let url = '/workerSupport/remove';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				$gridRemoveBtn.prop('disabled', true);
				alert("삭제 되었습니다.");
				workerSupport(s_workDailyReport);
			}
		});
	});

	$selectworker.on('check.bs.table', function(row, $element, field) {

		data.man = $element.personid;
		data.personid = $element.personid;
		data.workdailySeq = dataseq;

	});

	$modalCloseBtn.click(function() {
		$('#addWorkerSupportModal').modal('hide');
	});
	$modalCreateBtn.click(function() {
		// s_workDailyReport
		data.date = s_workDailyReport.workDate;
		data.line = s_workDailyReport.lineid;
		data.material = s_workDailyReport.materialid;
		data.model = s_workDailyReport.modelid;
		data.plant = s_workDailyReport.factoryid;
		data.shift = s_workDailyReport.shiftid;

		data.manhour = $("input[name=supportmanhour]").val();
		data.fromtime = $("input[name=supporttimeFrom]").val();
		data.totime = $("input[name=supporttimeTo]").val();
		data.tid = tid();

		if (data.man == "") {
			alert("작업자를 선택 하세요.");
			return;
		}

		let url = CORE_URL + '/worker-support/';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify([data]),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				let code = result.status;
				let message = result.message;
				
				if(code == 200){
					$('#addWorkerSupportModal').modal('hide');
					alert("저장완료");
					workerSupport(s_workDailyReport);
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
	});

	$modalModifyBtn.click(function() {
		// s_workDailyReport
		data.dataseq = s_workerInput.dataseq;
		data.manhour = $("input[name=supportmanhour]").val();
		data.lineid = $("select[name=inputLineid]").val();
		data.supporttimeFrom = $("input[name=supporttimeFrom]").val();
		data.supporttimeTo = $("input[name=supporttimeTo]").val();
		if (data.personid == "") {
			alert("작업자를 선택 하세요.");
			return;
		}

		let url = '/workerSupport/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				$('#addWorkerSupportModal').modal('hide');
				alert("수정완료");
				workerSupport(s_workDailyReport);
			}
		});
	});
}

function setWorkContentsEventListener() {
	let $grid = $("#workContents");
	let $gridAddBtn = $("#addworkContents");
	let $gridRemoveBtn = $("#removeworkContents");
	let $modalCreateBtn = $("#addWorkContentsModalCreate");	// 작업일보 모달 insert 버튼
	let $modalCloseBtn = $("#addWorkContentsModalClose");		// 작업일보 모달 close 버튼
	let $modalModifyBtn = $("#addWorkContentsModalModify");	// 작업일보 모달 update 버튼
	let data = initWorkContentsInput();
	$grid.on('check.bs.table', function(row, $element) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)


	});

	$grid.on('uncheck.bs.table', function(row, $element) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('check-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('uncheck-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('pre-body.bs.table', function(data) {
	});

	$gridAddBtn.click(function() {
		if (!s_workDailyReport) {
			alert("작업일보를 선택해주세요.");
			return;
		}
		$("input[name=worktimeFrom]").val("");
		$("input[name=workcontenttimeTo]").val("");
		$("input[name=workcontentmanhour]").val("");
		$("select[name=modelid]").val("");
		$("input[name=prodQty]").val("");
		$("input[name=planQty]").val("");
		$("input[name=goodsumQty]").val("");
		$("input[name=reworkGoodQty]").val("");
		$("input[name=reworkFailQty]").val("");
		$("input[name=firsttimeFailQty]").val("");
		$("input[name=workcontentnotes]").val("");

		$("#addWorkContentsModalCreate").css('display', "block");
		$("#addWorkContentsModalModify").css('display', "none");

		$('#addWorkContentsModal').modal('show');


	});

	$gridRemoveBtn.click(function() {

		let selections = [];

		$grid.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);
		});

		let url = '/workContents/remove';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				$gridRemoveBtn.prop('disabled', true);
				alert("삭제 되었습니다.");
				workContents(s_workDailyReport);
			}
		});
	});

	$modalCloseBtn.click(function() {
		$('#addWorkContentsModal').modal('hide');
	});
	$modalCreateBtn.click(function() {
		// s_workDailyReport
		data.date = s_workDailyReport.workDate;
		data.line = s_workDailyReport.lineid;
		data.material = s_workDailyReport.materialid;
		data.plant = s_workDailyReport.factoryid;
		data.shift = s_workDailyReport.shiftid;
		data.model = s_workDailyReport.modelid;
		
		data.workdailySeq = dataseq;
		data.fromtime = $("input[name=worktimeFrom]").val().replace(":","")+"00";
		data.totime = $("input[name=workcontenttimeTo]").val().replace(":","")+"00";
		data.manhour = $("input[name=workcontentmanhour]").val();
		data.prodqty = $("input[name=prodQty]").val();
		data.goodsumQty = $("input[name=goodsumQty]").val();
		data.reworkgoodqty = $("input[name=reworkGoodQty]").val();
		data.reworkfailqty = $("input[name=reworkFailQty]").val();
		data.firstgoodqty = $("input[name=firsttimeGoodQty]").val();
		data.firstfailqty = $("input[name=firsttimeFailQty]").val();
		data.notes = $("input[name=workcontentnotes]").val();
		data.tid = tid();

		//		data.plant=s_workDailyReport.factoryid;
		//		data.line=s_workDailyReport.lineid;
		//		data.shift=s_workDailyReport.shiftid;
		//		data.date=s_workDailyReport.workDate;

		if (data.fromtime == "") {
			alert("작업시간을 선택 하세요.");
			return;
		}
		if (data.totime == "") {
			alert("작업종료시간을 선택 하세요.");
			return;
		}
		if (data.manhour == "") {
			alert("공수를 선택 하세요.");
			return;
		}
		if (data.prodqty == "") {
			alert("생산수량을 선택 하세요.");
			return;
		}
		if (data.firstgoodqty == "") {
			alert("양품을선택 하세요.");
			return;
		}
		if (data.reworkgoodqty == "") {
			alert("재작업양품을 선택 하세요.");
			return;
		}
		if (data.reworkfailqty == "") {
			alert("재작업불량을 선택 하세요.");
			return;
		}
		if (data.firstfailqty == "") {
			alert("불량을 선택 하세요.");
			return;
		}


		let url = CORE_URL + '/work-contents/';
		//		let url = 'http://idrenvision.iptime.org:8271/work-contents';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify([data]),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result) {
				let code = result.status;
				let message = result.message;
			
				if(code == 200){
					$('#addWorkContentsModal').modal('hide');
					workContents(s_workDailyReport);
					//sendWorkContentsMsg(data);
					alert("저장완료");
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
	});

	$modalModifyBtn.click(function() {
		// s_workDailyReport
		data.dataseq = s_workContent.dataseq;
		data.worktimeFrom = $("input[name=worktimeFrom]").val();
		data.worktimeTo = $("input[name=workcontenttimeTo]").val();
		data.manhour = $("input[name=workcontentmanhour]").val();
		//data.modelid = $("select[name=modelid]").val();
		data.prodQty = $("input[name=prodQty]").val();
		//data.planQty = $("input[name=planQty]").val();
		data.goodsumQty = $("input[name=goodsumQty]").val();
		data.reworkGoodQty = $("input[name=reworkGoodQty]").val();
		data.reworkFailQty = $("input[name=reworkFailQty]").val();
		data.notes = $("input[name=workcontentnotes]").val();
		if (data.personid == "") {
			alert("작업자를 선택 하세요.");
			return;
		}

		let url = '/workContents/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				$('#addWorkContentsModal').modal('hide');
				alert("수정완료");
				workContents(s_workDailyReport);
			}
		});
	});
}

function setNonconFormityEventListener() {
	let $grid = $("#rejectContents");
	let $gridAddBtn = $("#addNonconFormity");
	let $gridRemoveBtn = $("#removeNonconFormity");
	let $modalCreateBtn = $("#addNonconFormityModalCreate");	// 작업일보 모달 insert 버튼
	let $modalCloseBtn = $("#addNonconFormityModalClose");		// 작업일보 모달 close 버튼
	let $modalModifyBtn = $("#addNonconFormityModalModify");	// 작업일보 모달 update 버튼
	let data = initNonconFormity();
	$grid.on('check.bs.table', function(row, $element) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length);
	});

	$grid.on('uncheck.bs.table', function(row, $element) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('check-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('uncheck-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('pre-body.bs.table', function(data) {
	});

	$gridAddBtn.click(function() {
		if (!s_workDailyReport) {
			alert("작업일보를 선택해주세요.");
			return;
		}
		$("select[name=rejectType]").val("");
		$("select[name=rejectItemId]").val("");
		$("input[name=firsttimeRejectQty]").val("");
		$("input[name=reworkRejectQty]").val("");

		$("#addNonconFormityModalCreate").css('display', "block");
		$("#addNonconFormityModalModify").css('display', "none");

		$('#addNonconFormityModal').modal('show');

		//reject_item();
	});

	$gridRemoveBtn.click(function() {

		let selections = [];

		$grid.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);
		});

		let url = '/rejectContents/remove';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				$gridRemoveBtn.prop('disabled', true);
				alert("삭제 되었습니다.");
				rejectContents(s_workDailyReport);
			}
		});
	});

	$modalCloseBtn.click(function() {
		$('#addNonconFormityModal').modal('hide');
	});
	$modalCreateBtn.click(function() {
		// s_workDailyReport
		data.date = s_workDailyReport.workDate;
		data.line = s_workDailyReport.lineid;
		data.material = s_workDailyReport.materialid;
		data.plant = s_workDailyReport.factoryid;
		data.shift = s_workDailyReport.shiftid;
		data.model = s_workDailyReport.modelid;
		
		data.workdailySeq = dataseq;
		data.rejecttype = $("select[name=rejectType]").val();
		data.rejectcode = $("select[name=rejectItemId]").val();
		data.firstrejectqty = $("input[name=firsttimeRejectQty]").val();
		data.reworkrejectqty = $("input[name=reworkRejectQty]").val();
		data.tid = tid();

		if (data.firstrejectqty == "") {
			alert("본을 선택 하세요.");
			return;
		}
		if (data.reworkrejectqty == "") {
			alert("재투입을 선택 하세요.");
			return;
		}
		if (data.rejectcode == "") {
			alert("불량내용을 선택 하세요.");
			return;
		}
		if (data.rejecttype == "") {
			alert("불량유형을 선택 하세요.");
			return;
		}


		let url = CORE_URL + '/reject-contents/';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify([data]),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				let code = result.status;
				let message = result.message;
				
				if(code == 200){
					$('#addNonconFormityModal').modal('hide');
					alert("저장완료");
					rejectContents(s_workDailyReport);
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
	});

	$modalModifyBtn.click(function() {
		// s_workDailyReport
		data.dataseq = s_NonconFormity.dataseq;
		data.rejectItemid = $("select[name=rejectItemId]").val();
		data.firsttimeRejectQty = $("input[name=firsttimeRejectQty]").val();
		data.reworkRejectQty = $("input[name=reworkRejectQty]").val();
		data.rejectType = $("select[name=rejectType]").val();

		if (data.firsttimeRejectQty == "") {
			alert("본을 선택 하세요.");
			return;
		}
		if (data.reworkRejectQty == "") {
			alert("재투입을 선택 하세요.");
			return;
		}
		if (data.rejectItemid == "") {
			alert("불량내용을 선택 하세요.");
			return;
		}
		if (data.rejectType == "") {
			alert("불량유형을 선택 하세요.");
			return;
		}

		let url = '/rejectContents/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				$('#addNonconFormityModal').modal('hide');
				alert("수정완료");
				rejectContents(s_workDailyReport);
			}
		});

	});

	$rejectItemCode = $("#rejectItemCode");

	$rejectItemCode.change(function() {

		let $dropdown1 = $("#rejectTypes");
		$dropdown1.empty();

		if (c_reject_type) {
			$dropdown1.append($("<option/>").val("").text("유형 내용"));
			$.each(c_reject_type, function() {
				if ($rejectItemCode.val() == this.mcode) {
					$dropdown1.append($("<option/>").val(this.code).text(this.value));
				}
			});
		} else {
			$dropdown1.append($("<option/>").val("").text("유형 내용"));
		}
	});

}

function setNonOperationEventListener() {
	let $grid = $("#notoperateContents");
	let $gridAddBtn = $("#addNonOperation");
	let $gridRemoveBtn = $("#removeNonOperation");
	let $modalCreateBtn = $("#addNonOperationModalCreate");	// 작업일보 모달 insert 버튼
	let $modalCloseBtn = $("#addNonOperationModalClose");		// 작업일보 모달 close 버튼
	let $modalModifyBtn = $("#addNonOperationModalModify");	// 작업일보 모달 update 버튼
	let data = initNonOperation();
	$grid.on('check.bs.table', function(row, $element) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
		
	});

	$grid.on('uncheck.bs.table', function(row, $element) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('check-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('uncheck-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('pre-body.bs.table', function(data) {
	});

	$gridAddBtn.click(function() {
		if (!s_workDailyReport) {
			alert("작업일보를 선택해주세요.");
			return;
		}
		$("input[name=notoperatetimeFrom]").val("");
		$("input[name=notoperatetimeTo]").val("");
		$("input[name=nonhands]").val("");
		$("input[name=nonmanhour]").val("");
		$("select[name=cause]").val("");
		$("input[name=correctiveAction]").val("");

		$("#addNonOperationModalCreate").css('display', "block");
		$("#addNonOperationModalModify").css('display', "none");

		$('#addNonOperationModal').modal('show');
	});

	$gridRemoveBtn.click(function() {

		let selections = [];

		$grid.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);
		});

		let url = '/notoperateContents/remove';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				$gridRemoveBtn.prop('disabled', true);
				alert("삭제 되었습니다.");
				notoperateContents(s_workDailyReport);
			}
		});
	});

	$modalCloseBtn.click(function() {
		$('#addNonOperationModal').modal('hide');
	});
	$modalCreateBtn.click(function() {
		// s_workDailyReport
		data.date = s_workDailyReport.workDate;
		data.line = s_workDailyReport.lineid;
		data.material = s_workDailyReport.materialid;
		data.plant = s_workDailyReport.factoryid;
		data.shift = s_workDailyReport.shiftid;
		data.model = s_workDailyReport.modelid;
		
		data.workdailySeq = dataseq;
		data.fromtime = $("input[name=notoperatetimeFrom]").val().replace(":","")+"00";
		data.totime = $("input[name=notoperatetimeTo]").val().replace(":","")+"00";
		data.man = $("input[name=nonhands]").val();
		data.manhour = $("input[name=nonmanhour]").val();
		data.contentcause = $("select[name=cause]").val();
		data.correctiveaction = $("input[name=correctiveAction]").val();
		data.tid = tid();

		//		data.plant=s_workDailyReport.factoryid;
		//		data.line=s_workDailyReport.lineid;
		//		data.shift=s_workDailyReport.shiftid;
		//		data.date=s_workDailyReport.workDate;


		if (data.fromtime == "") {
			alert("비가동시작을 선택 하세요.");
			return;
		}
		if (data.totime == "") {
			alert("비가동종료를 선택 하세요.");
			return;
		}
		if (data.man == "") {
			alert("인원을 선택 하세요.");
			return;
		}
		if (data.manhour == "") {
			alert("공수를 선택 하세요.");
			return;
		}
		if (data.contentcause == "") {
			alert("내용/원인을 선택 하세요.");
			return;
		}

		let url = CORE_URL + '/notoperate-contents/';
		//		let url = 'http://localhost:8171/notoperate-contents/';
		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify([data]),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				let code = result.status;
				let message = result.message;
				
				if(code == 200){
					$('#addNonOperationModal').modal('hide');
					notoperateContents(s_workDailyReport);
					//sendNotOperateMsg(data);
					alert("저장완료");
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
	});

	$modalModifyBtn.click(function() {
		// s_workDailyReport
		data.dataseq = s_NonOperation.dataseq;
		data.notoperatetimeFrom = $("input[name=notoperatetimeFrom]").val();
		data.notoperatetimeTo = $("input[name=notoperatetimeTo]").val();
		data.hands = $("input[name=nonhands]").val();
		data.manhour = $("input[name=nonmanhour]").val();
		data.cause = $("select[name=cause]").val();
		data.correctiveaction = $("input[name=correctiveaction]").val();
		if (data.personid == "") {
			alert("작업자를 선택 하세요.");
			return;
		}

		let url = '/notoperateContents/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(result){
				$('#addNonOperationModal').modal('hide');
				alert("수정완료");
				notoperateContents(s_workDailyReport);
			}
		});
	});
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

function block() {

	let $dropdown = $("#blockCodes");
	$dropdown.empty();

	c_block = null;

	$.ajax({
		url: '/code/block',
		type: 'GET',
		success: function(data) {
			c_block = data;


		}
	});
}

function line() {

	let $dropdown = $("#lineCodes");
	$dropdown.empty();

	c_line = null;

	$.ajax({
		url: '/code/line',
		type: 'GET',
		success: function(data) {
			c_line = data;

			let $dropdown2 = $("#lineCodes");
			$dropdown2.empty();

			if (c_line) {
				$dropdown2.append($("<option/>").val("").text("공정 선택"));
				$.each(c_line, function() {
					if (localStorage.getItem('plant') == this.mcode) {
						$dropdown2.append($("<option/>").val(this.code).text(this.value));
					}
				});
			} else {
				$dropdown2.append($("<option/>").val("").text("공정 선택"));
			}

		}
	});


}

function shift() {
	let url = '/code/shift';

	c_shift = null;

	$.ajax({
		url: url,
		type: 'GET',
		success: function(data) {
			c_shift = data;

			let $dropdown3 = $("#shiftCodes");
			$dropdown3.empty();

			if (c_shift) {
				$dropdown3.append($("<option/>").val("").text("작업구분 선택"));
				$.each(c_shift, function() {
					if (localStorage.getItem('plant') == this.mcode) {
						$dropdown3.append($("<option/>").val(this.code).text(this.value));
					}
				});
			} else {
				$dropdown3.append($("<option/>").val("").text("작업구분 선택"));

			}

		}
	});
}

function model() {
	let url = '/code/model';

	c_model = null;

	$.ajax({
		url: url,
		type: 'GET',
		success: function(data) {
			c_model = data;

			let $dropdown4 = $("#wdrmodelid");
			$dropdown4.empty();

			if (c_model) {
				$dropdown4.append($("<option/>").val("").text("차종 선택"));
				$.each(c_model, function() {
					$dropdown4.append($("<option/>").val(this.code).text(this.value));
				});
			} else {
				$dropdown4.append($("<option/>").val("").text("차종 선택"));
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
		success: function(data) {
			c_material = data;

			let $dropdown5 = $("#wdrmatarialid");
			$dropdown5.empty();

			if (c_material) {
				$dropdown5.append($("<option/>").val("").text("자재 선택"));
				$.each(c_material, function() {
					if (localStorage.getItem('plant') == this.mcode) {
						$dropdown5.append($("<option/>").val(this.code).text(this.value));
					}
				});
			} else {
				$dropdown5.append($("<option/>").val("").text("자재 선택"));

			}

		}
	});
}

function input_item() {
	let url = '/code/inputItem';

	c_input_item = null;

	$.ajax({
		url: url,
		type: 'GET',
		success: function(data) {
			c_input_item = data;

			let $dropdown = $("#inputItemCodes");
			$dropdown.empty();

			if (c_input_item) {
				$dropdown.append($("<option/>").val("").text("구분 선택"));
				$.each(data, function() {
					$dropdown.append($("<option/>").val(this.code).text(this.value));
				});
			} else {
				$dropdown.append($("<option/>").val("").text("구분 선택"));
			}
		}
	});
}

function reject_item() {
	let url = '/code/rejectItem';

	c_reject_item = null;

	$.ajax({
		url: url,
		type: 'GET',
		success: function(data) {
			c_reject_item = data;

			let $dropdown = $("#rejectItemCode");
			$dropdown.empty();

			if (c_reject_item) {
				$dropdown.append($("<option/>").val("").text("불량"));
				$.each(data, function() {
					$dropdown.append($("<option/>").val(this.code).text(this.value));
				});
			} else {
				$dropdown.append($("<option/>").val("").text("불량"));
			}
		}
	});
}

function reject_type() {
	let url = '/code/rejectType';

	c_reject_type = null;

	$.ajax({
		url: url,
		type: 'GET',
		success: function(data) {
			c_reject_type = data;


		}
	});
}

/*
function modelitem() {
	let url = '/code/modelItem';

	c_model_item = null;
	
	if(s_workDailyReport){
		$.ajax({
			url: url,
			type: 'GET',
			success: function(data) {
				c_model_item = data;
	
				let $dropdown = $("#inputModelCodes");
				$dropdown.empty();
				
				let $dropdown2 = $("#inputModelCodes2");
				$dropdown2.empty();
	
				if (c_model_item) {
					$dropdown.append($("<option/>").val("").text("모델/차종"));
					$dropdown2.append($("<option/>").val("").text("모델/차종"));

					$.each(data, function() {
						if(s_workDailyReport.factoryid == this.mcode){
							$dropdown.append($("<option/>").val(this.code).text(this.value));
						}
					});
					$.each(data, function() {
						if(s_workDailyReport.factoryid == this.mcode){
							$dropdown2.append($("<option/>").val(this.code).text(this.value));
						}
					});
				} else {
					$dropdown.append($("<option/>").val("").text("모델/차종"));
				}
			}
		});
	}

	
}*/

function workDailyReportOperateFormatter(value, row, index) {
	return [
		'<a class="workDailyReportModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

function workerInputOperateFormatter(value, row, index) {
	return [
		'<a class="workerInputModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}
function workerManhourFormatter(value, row, index) {
	return [
		'<a class="workerManHourModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

function workerSupportFormatter(value, row, index) {
	return [
		'<a class="workerSupportModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

function workContentFormatter(value, row, index) {
	return [
		'<a class="workContenttModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

function NonconFormityFormatter(value, row, index) {
	return [
		'<a class="NonconFormityModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

function NonOperationFormatter(value, row, index) {
	return [
		'<a class="NonOperationModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

window.operateEvents = {
	"click .workDailyReportModify": function(e, value, row, index) {

		workDailyReportDetail(row);
		
		$("input[name=workDate]").val(row.workDate);
		$("select[name=wdrmodel]").val(row.wdrmodel);
		$("select[name=lineid]").val(row.lineid);
		$("select[name=shiftid]").val(row.shiftid);
		$("select[name=wdrmatarial]").val(row.wdrmatarial);
		$("input[name=planqty]").val(row.planQty);
		$("input[name=notes]").val(row.notes);

		$("#addWorkDailyReportModalCreate").css('display', "none");
		$("#addWorkDailyReportModalModify").css('display', "block");

		$('#addWorkDailyReportModal').modal('show');


	},
	"click .workerInputModify": function(e, value, row, index) {
		s_workerManHour = row;
		$("select[name=overtimeyn]").val(row.overtime);
		$("input[name=workinputdesc]").val(row.notes);
		$("#addWorkerInputModalCreate").css('display', "none");
		$("#addWorkerInputModalModify").css('display', "block");

		$('#addWorkerIntputModal').modal('show');


	},
	"click .workerManHourModify": function(e, value, row, index) {
		s_workerInput = row;
		$("input[name=hands]").val(row.hands);
		$("input[name=manhour]").val(row.manhour);
		$("select[name=inputItemid]").val(row.inputItemid);

		$("#addWorkerManhourModalCreate").css('display', "none");
		$("#addWorkerManhourModalModify").css('display', "block");

		$('#addWorkerManhourModal').modal('show');


	},
	"click .workerSupportModify": function(e, value, row, index) {
		s_workerInput = row;
		$("input[name=supportmanhour]").val(row.manhour);
		$("input[name=supporttimeFrom]").val(row.supporttimeFrom);
		$("input[name=supporttimeTo]").val(row.supporttimeTo);


		$("#addWorkerSupportModalCreate").css('display', "none");
		$("#addWorkerSupportModalModify").css('display', "block");

		$('#addWorkerSupportModal').modal('show');


	},
	"click .workContenttModify": function(e, value, row, index) {
		s_workContent = row;
		$("input[name=worktimeFrom]").val(row.worktimeFrom);
		$("input[name=workcontenttimeTo]").val(row.worktimeTo);
		$("input[name=workcontentmanhour]").val(row.manhour);
		$("select[name=modelid]").val(row.modelid);
		$("input[name=prodQty]").val(row.prodQty);
		$("input[name=planQty]").val(row.planQty);
		$("input[name=goodsumQty]").val(row.goodsumQty);
		$("input[name=reworkGoodQty]").val(row.reworkGoodQty);
		$("input[name=reworkFailQty]").val(row.reworkFailQty);
		$("input[name=firsttimeFailQty]").val(row.firsttimeFailQty);
		$("input[name=workcontentnotes]").val(row.notes);


		$("#addWorkContentsModalCreate").css('display', "none");
		$("#addWorkContentsModalModify").css('display', "block");

		$('#addWorkContentsModal').modal('show');


	},
	"click .NonconFormityModify": function(e, value, row, index) {
		s_NonconFormity = row;

		$("select[name=rejectItemId]").val(row.rejectItemid);
		$("select[name=rejectType]").val(row.rejectType);
		$("input[name=firsttimeRejectQty]").val(row.firsttimeRejectQty);
		$("input[name=reworkRejectQty]").val(row.reworkRejectQty);

		$("#addNonconFormityModalCreate").css('display', "none");
		$("#addNonconFormityModalModify").css('display', "block");

		$('#addNonconFormityModal').modal('show');
		//reject_item();


	},
	"click .NonOperationModify": function(e, value, row, index) {
		s_NonOperation = row;

		$("input[name=notoperatetimeFrom]").val(row.notoperatetimeFrom);
		$("input[name=notoperatetimeTo]").val(row.notoperatetimeTo);
		$("input[name=nonhands]").val(row.hands);
		$("input[name=nonmanhour]").val(row.manhour);
		$("select[name=cause]").val(row.cause);
		$("input[name=correctiveAction]").val(row.correctiveAction);

		$("#addNonOperationModalCreate").css('display', "none");
		$("#addNonOperationModalModify").css('display', "block");

		$('#addNonOperationModal').modal('show');


	}

}

function workDailyReport() {
	var url = '/workDailyReport/find';

	$.get(url).then(function(res) {
		$table = $("#workDailyReport");
		$table.bootstrapTable('removeAll');
		$table.bootstrapTable('append', res);
	})
}

function workDailyReportDetail(data) {
	//	$("input[name=ruleid]").val(data.rulesysid);
	//$('#workDateDetail').datepicker("setDate",new Date(data.workDate))
	//$("input[name=workDate]").val(data.workDate);
	s_workDailyReport = data;

	$("input[name=workDate]").datepicker("setDate", new Date(data.workDate.substring(0, 4), data.workDate.substring(4, 6) - 1, data.workDate.substring(6, 8)));
	$("select[name=blockid]").val(data.blockid);
	//$("select[name=factoryid]").val(data.factoryid);
	$("select[name=groupid]").val(data.groupid);
	$("select[name=lineid]").val(data.lineid);
	$("select[name=shiftid]").val(data.shiftid);
	$("input[name=approver]").val(data.approver);
	$("input[name=reviewer]").val(data.reviewer);
	$("input[name=notes]").val(data.notes);
}

function workerInput(data) {
	var url = '/workerInput/find';

	var params = {
		//rulesysid : data.rulesysid,
		workDailySeq: data.dataseq,
		//		factoryid : data.factoryid,
		//		lineid : data.lineid,
		//		shiftid : data.shiftid,
		//		workDate : data.workDate,
	}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#workerInput");
		$table.bootstrapTable('removeAll');
		$table.bootstrapTable('append', res);
		c_person = res;
	})
}

function workerManhour(data) {
	var url = '/workerManhour/find';

	var params = {
		//rulesysid : data.rulesysid,
		workDailySeq: data.dataseq,
		//		factoryid : data.factoryid,
		//		lineid : data.lineid,
		//		shiftid : data.shiftid,
		//		workDate : data.workDate,
	}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#workerManhour");
		$table.bootstrapTable('removeAll');
		$table.bootstrapTable('append', res);
	})
}

function workerSupport(data) {
	var url = '/workerSupport/find';

	var params = {
		//rulesysid : data.rulesysid,
		workDailySeq: data.dataseq,
		//		factoryid : data.factoryid,
		//		lineid : data.lineid,
		//		workDate : data.workDate,
	}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#workerSupport");
		$table.bootstrapTable('removeAll');
		$table.bootstrapTable('append', res);
	})
}

function workContents(data) {
	var url = '/workContents/find';

	var params = {
		//rulesysid : data.rulesysid,
		workDailySeq: data.dataseq,
		//		factoryid : data.factoryid,
		//		lineid : data.lineid,
		//		shiftid : data.shiftid,
		//		workDate : data.workDate,
	}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#workContents");
		$table.bootstrapTable('removeAll');
		$table.bootstrapTable('append', res);
	})
}

function notoperateContents(data) {
	var url = '/notoperateContents/find';

	var params = {
		//rulesysid : data.rulesysid,
		workDailySeq: data.dataseq,
		//		factoryid : data.factoryid,
		//		lineid : data.lineid,
		//		shiftid : data.shiftid,
		//		workDate : data.workDate,
	}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#notoperateContents");
		$table.bootstrapTable('removeAll');
		$table.bootstrapTable('append', res);
	})
}

function rejectContents(data) {
	var url = '/rejectContents/find';

	var params = {
		//rulesysid : data.rulesysid,
		workDailySeq: data.dataseq,
		//		factoryid : data.factoryid,
		//		lineid : data.lineid,
		//		shiftid : data.shiftid,
		//		workDate : data.workDate,
	}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#rejectContents");
		$table.bootstrapTable('removeAll');
		$table.bootstrapTable('append', res);
	})
}



function personfind(data) {
	var url = '/person/find';

	var params = {
		//rulesysid : data.rulesysid,
		workDailySeq: data.dataseq,
		factoryid: data.factoryid,
		//		lineid : data.lineid,
		//		shiftid : data.shiftid,
		//		workDate : data.workDate,
	}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#selectWorker");
		$table2 = $("#selectWorkerSupport");

		$table.bootstrapTable('removeAll');
		$table.bootstrapTable('append', res);
		$table2.bootstrapTable('removeAll');
		$table2.bootstrapTable('append', res);
	})
}

function resetWorkDailyReport() {
	$("input[name=ruleid]").val("");
	$("input[name=workDate]").val("");
	$("select[name=blockid]").val("");
	//$("select[name=factoryid]").val("");
	$("select[name=groupid]").val("");
	$("select[name=lineid]").val("");
	$("select[name=shiftid]").val("");
	$("input[name=approver]").val("");
	$("input[name=reviewer]").val("");
	$("input[name=notes]").val("");
	$("select[name=wdrmatarial]").val("");
	$("select[name=wdrmodel]").val("");
	$("input[name=planqty]").val("");
}

function resetWorkerManhour() {
	$("input[name=hands]").val("");
	$("input[name=manhour]").val("");
	$("select[name=inputItemid]").val("");
}

function initWorkDailyReport() {

	let data = {
		"dataseq": "", "rulesysid": "", "factoryid": "", "factoryname": "",
		"materialid": "", "modelid": "",
		"workDate": "", "blockid": "", "blockname": "", "lineid": "",
		"linename": "", "groupid": "", "groupname": "", "shiftid": "",
		"shiftname": "", "register": "", "reviewer": "", "approver": "",
		"notes": "", "creator": "", "createtime": "", "event": "",
		"eventuser": "", "eventtime": "", "isusable": "", "tid": "", "planQty": ""
	};

	return data;
}

function initWorkerManhour() {

	let data = {
		"dataseq": "", "workdailySeq": "", "inputItemid": "",
		"hands": "", "manhour": "", "creator": "", "createtime": "",
		"event": "", "eventuser": "", "eventtime": "", "isusable": "", "tid": ""
		/*"rulesysid": "", "factoryid": "","lineid": "", "shiftid": "", "workDate": "",*/
	};

	return data;
}

function initWorkerInput() {

	let data = {
		"dataseq": "", "workdailySeq": "", "personid": "",
		"overtime": "", "notes": "", "creator": "", "createtime": "",
		"event": "", "eventuser": "", "eventtime": "", "isusable": "", "tid": ""
	};

	return data;
}

function initWorkerSupportInput() {

	let data = {
		"dataseq": "", "workdailySeq": "", "personid": "",
		"personname": "", "supporttimeFrom": "", "supporttimeTo": "", "manhour": "",
		"creator": "", "createtime": "", "event": "", "eventuser": "", "eventtime": "",
		"isusable": "", "tid": ""
		/*"rulesysid": "", "factoryid": "",
		"lineid": "", "linename": "", "workDate": "",*/
	};

	return data;
}

function initWorkContentsInput() {

	let data = {
		"dataseq": "", "workdailySeq": "", /*"rulesysid": "", "plant": "",
		"line": "", "shift": "", "date": "","modelid": "", "operationid": "","images": "","planQty": "",
		"movies": "",*/ "worktimeFrom": "",
		"worktimeTo": "", "manhour": "",
		"prodQty": "", "goodsumQty": "", "firsttimeGoodQty": "", "firsttimeFailQty": "",
		"reworkGoodQty": "", "reworkFailQty": "", "notes": "", "creator": "", "createtime": "", "event": "",
		"eventuser": "", "eventtime": "", "isusable": "", "tid": "",
	};

	return data;
}

function initNonconFormity() {

	let data = {
		"dataseq": "", "workdailySeq": "",/* "rulesysid": "", "factoryid": "",
		"lineid": "", "shiftid": "", "workDate": "", "operationid": "","modelid": "","images": "", "movies": "",*/
		"rejectItemid": "", "firsttimeRejectQty": "", "reworkRejectQty": "",
		"creator": "", "createtime": "", "event": "",
		"eventuser": "", "eventtime": "", "isusable": "", "tid": "", "rejectType": ""
	};

	return data;
}

function initNonOperation() {

	let data = {
		"dataseq": "", "workdailySeq": "",/* "rulesysid": "", "plant": "",
		"line": "", "shift": "", "date": "","images": "", "movies": "",  */"notoperatetimeFrom": "",
		"notoperatetimeTo": "", "hands": "", "manhour": "", "cause": "",
		"correctiveAction": "", "notes": "", "creator": "",
		"createtime": "", "event": "", "eventuser": "", "eventtime": ""
		, "isusable": "", "tid": ""
	};

	return data;
}

function tid() {
	let tid = null;

	// 7WOR5B3B-242B-4696-AD74-F9D6D8TE0731
	tid = Math.random().toString(36).substring(2, 10) + "-" +
		Math.random().toString(36).substring(2, 6) + "-" +
		Math.random().toString(36).substring(2, 6) + "-" +
		Math.random().toString(36).substring(2, 6) + "-" +
		Math.random().toString(36).substring(2, 16);

	return tid.toUpperCase();
}

function sendWorkContentsMsg(data){
	
	let workContents = {};
	
	workContents.date = s_workDailyReport.workDate;
	workContents.plant = s_workDailyReport.factoryid;
	workContents.line = s_workDailyReport.lineid;
	workContents.shift = s_workDailyReport.shiftid;
	workContents.model = s_workDailyReport.modelid;
	workContents.material = s_workDailyReport.materialid;
	workContents.fromtime = data.worktimeFrom;
	workContents.totime = data.worktimeTo;
	workContents.manhour = data.manhour;
	workContents.prodqty = data.prodQty;
	workContents.firstgoodqty = data.firsttimeGoodQty;
	workContents.firstfailqty = data.firsttimeFailQty;
	workContents.reworkgoodqty = data.reworkGoodQty;
	workContents.reworkfailqty = data.reworkFailQty;
	workContents.tid = data.tid;
	
	$.ajax({
		url: CORE_URL+"/alarm/workContents",
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data : JSON.stringify(workContents),
		success: function(data) {
			if(data.status != 200){
				alert("알람 전송에 실패하였습니다.");
			}
		}
	});
}

function sendNotOperateMsg(data){
	
	let workContents = {};
	
	workContents.date = s_workDailyReport.workDate;
	workContents.plant = s_workDailyReport.factoryid;
	workContents.line = s_workDailyReport.lineid;
	workContents.shift = s_workDailyReport.shiftid;
	workContents.model = s_workDailyReport.modelid;
	workContents.material = s_workDailyReport.materialid;
	
	let parsetime=data.notoperatetimeFrom.replace(/:/g, '');
	parsetime=parsetime+'00';
	workContents.fromtime = parsetime;
	workContents.totime = data.notoperatetimeTo;
	workContents.man = data.hands;
	workContents.manhour = data.manhour;
	workContents.contentcause = data.cause;
	workContents.correctiveaction = data.correctiveAction;
	workContents.tid = data.tid;
	
	$.ajax({
		url: CORE_URL+"/alarm/notoperate",
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data : JSON.stringify(workContents),
		success: function(data) {
			if(data.status != 200){
				alert("알람 전송에 실패하였습니다.");
			}
		}
	});
}


