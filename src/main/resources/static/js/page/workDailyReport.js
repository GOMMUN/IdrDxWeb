/**
 * 
 */
let c_factory = null;
let c_block = null;
let c_line = null;
let c_shift = null;
let c_input_item = null;
let c_model_item=null;
let s_workDailyReport = null;
let dataseq = null;
let s_workerInput = null;
let s_workerManHour = null;
let s_workContent=null;
let s_NonconFormity=null;
let s_NonOperation=null;

$(function() {
	initSetting();
	setEventListener();
});

function initSetting() {

	$("input[name=workDate]").datepicker({
		format: "yyyy-mm-dd",
		autoclose: true,
		language: "ko"
	});

	code();
}

function code() {
	factroy();		// 공장코드 조회
	//block();
	line();
	shift();		// 주/야간구분 코드 조회
	input_item();
	modelitem();
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

		data.workDate = $("input[name=workDate]").val();
		data.blockid = $("select[name=blockid]").val();
		data.factoryid = $("select[name=factoryid]").val();
		data.groupid = $("select[name=groupid]").val();
		data.lineid = $("select[name=lineid]").val();
		data.shiftid = $("select[name=shiftid]").val();
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
		} else if (data.blockid == "") {
			alert("블록을 선택해주세요.");
			$("select[name=blockid]").focus();
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
		}else if (data.planQty == "") {
			alert("계획수량을 선택해주세요.");
			$("select[name=planqty]").focus();
			return;
		}

		let url = '/workDailyReport/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				if(data==-1)
				{
					alert("중복된 데이터가 있습니다.");
				}
				else{
					$('#addWorkDailyReportModal').modal('hide');
				alert("저장되었습니다.");
				workDailyReport();
				}
				//$gridRemoveBtn.prop('disabled', true);
				
			}
		});
	});

	$modalModifyBtn.click(function() {

		if (s_workDailyReport) {
			let data = s_workDailyReport;

			data.workDate = $("input[name=workDate]").val();
			data.blockid = $("select[name=blockid]").val();
			data.factoryid = $("select[name=factoryid]").val();
			data.groupid = $("select[name=groupid]").val();
			data.lineid = $("select[name=lineid]").val();
			data.shiftid = $("select[name=shiftid]").val();
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
			} else if (data.blockid == "") {
				alert("블록을 선택해주세요.");
				$("select[name=blockid]").focus();
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
			}else if (data.planQty == "") {
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
				success: function(data) {
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

		let url = '/workDailyReport/remove';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				$gridRemoveBtn.prop('disabled', true);
				alert("삭제 되었습니다.");
				workDailyReport();
			}
		});
	});



	// modal 
	$factoryCodes = $("#factoryCodes");

	$factoryCodes.change(function() {

		let $dropdown1 = $("#blockCodes");
		$dropdown1.empty();

		if (c_block) {
			$dropdown1.append($("<option/>").val("").text("블록 선택"));
			$.each(c_block, function() {
				if ($factoryCodes.val() == this.mcode) {
					$dropdown1.append($("<option/>").val(this.code).text(this.value));
				}
			});
		} else {
			$dropdown1.append($("<option/>").val("").text("블록 선택"));
		}


		let $dropdown2 = $("#lineCodes");
		$dropdown2.empty();

		if (c_line) {
			$dropdown2.append($("<option/>").val("").text("라인 선택"));
			$.each(c_line, function() {
				if ($factoryCodes.val() == this.mcode) {
					$dropdown2.append($("<option/>").val(this.code).text(this.value));
				}
			});
		} else {
			$dropdown2.append($("<option/>").val("").text("라인 선택"));
		}
		
		
		let $dropdown3 = $("#shiftCodes");
		$dropdown3.empty();
		
		if (c_shift) {
			$dropdown3.append($("<option/>").val("").text("작업구분 선택"));
			$.each(c_shift, function() {
				if ($factoryCodes.val() == this.mcode) {
					$dropdown3.append($("<option/>").val(this.code).text(this.value));
				}
			});
		} else {
			$dropdown3.append($("<option/>").val("").text("작업구분 선택"));
		
		}
	});
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
			success: function(data) {
				$gridRemoveBtn.prop('disabled', true);
				alert("삭제 되었습니다.");
				workerInput(s_workDailyReport);
			}
		});
	});

	$selectworker.on('check.bs.table', function(row, $element, field) {
		data.personid = null;
		data.personid = $element.personid;

	});

	$modalCloseBtn.click(function() {
		$('#addWorkerIntputModal').modal('hide');
	});
	$modalCreateBtn.click(function() {
		// s_workDailyReport

		
		data.workdailySeq=dataseq;
		data.notes = $("input[name=workinputdesc]").val();
		data.overtime = $("select[name=overtimeyn]").val();

		if (data.personid == "") {
			alert("작업자를 선택 하세요.");
			return;
		}

		let url = '/workerInput/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				$('#addWorkerIntputModal').modal('hide');
				alert("저장완료");
				workerInput(s_workDailyReport);
			}
		});
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
			success: function(data) {
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

		data.workdailySeq = s_workDailyReport.dataseq;
		data.hands = $("input[name=hands]").val();
		data.manhour = $("input[name=manhour]").val();
		data.inputItemid = $("select[name=inputItemid]").val();

		if (!data.hands) {
			alert("인원을  선택해주세요.");
			return;
		}
		if (!data.manhour) {
			alert("공수를 선택해주세요.");
			return;
		}
		if (!data.inputItemid) {
			alert("구분을 선택해주세요.");
			return;
		}
		let url = '/workerManhour/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				$('#addWorkerManhourModal').modal('hide');
				alert("저장 완료");
				workerManhour(s_workDailyReport);
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
			success: function(data) {
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
			success: function(data) {
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
			success: function(data) {
				$gridRemoveBtn.prop('disabled', true);
				alert("삭제 되었습니다.");
				workerSupport(s_workDailyReport);
			}
		});
	});

	$selectworker.on('check.bs.table', function(row, $element, field) {

		data.personid = $element.personid;
		data.workdailySeq = dataseq;

	});

	$modalCloseBtn.click(function() {
		$('#addWorkerSupportModal').modal('hide');
	});
	$modalCreateBtn.click(function() {
		// s_workDailyReport
	
		data.manhour = $("input[name=manhour]").val();
		data.lineid = $("select[name=inputLineid]").val();
		data.supporttimeFrom = $("input[name=supporttimeFrom]").val();
		data.supporttimeTo = $("input[name=supporttimeTo]").val();
		if (data.personid == "") {
			alert("작업자를 선택 하세요.");
			return;
		}

		let url = '/workerSupport/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				$('#addWorkerSupportModal').modal('hide');
				alert("저장완료");
				workerSupport(s_workDailyReport);
			}
		});
	});

	$modalModifyBtn.click(function() {
		// s_workDailyReport
		data.dataseq = s_workerInput.dataseq;
		data.manhour = $("input[name=manhour]").val();
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
			success: function(data) {
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
			success: function(data) {
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
		data.workdailySeq = dataseq;
		data.worktimeFrom = $("input[name=worktimeFrom]").val();
		data.worktimeTo = $("input[name=workcontenttimeTo]").val();
		data.manhour = $("input[name=workcontentmanhour]").val();
		data.modelid = $("select[name=modelid]").val();
		data.prodQty = $("input[name=prodQty]").val();
		data.planQty = $("input[name=planQty]").val();
		data.goodsumQty = $("input[name=goodsumQty]").val();
		data.reworkGoodQty = $("input[name=reworkGoodQty]").val();
		data.reworkFailQty = $("input[name=reworkFailQty]").val();
		data.notes = $("input[name=workcontentnotes]").val();
		
		if (data.worktimeFrom == "") {
			alert("작업시간을 선택 하세요.");
			return;
		}
		if (data.worktimeTo == "") {
			alert("작업종료시간을 선택 하세요.");
			return;
		}
		if (data.manhour == "") {
			alert("공수를 선택 하세요.");
			return;
		}
		if (data.modelid == "") {
			alert("모델/차종을 선택 하세요.");
			return;
		}
		if (data.prodQty == "") {
			alert("생산수량을 선택 하세요.");
			return;
		}
		if (data.planQty == "") {
			alert("계획수량을 선택 하세요.");
			return;
		}
		if (data.goodsumQty == "") {
			alert("양품합계를 선택 하세요.");
			return;
		}
		if (data.reworkGoodQty == "") {
			alert("재작업양품을 선택 하세요.");
			return;
		}
		if (data.reworkFailQty == "") {
			alert("재작업불량을 선택 하세요.");
			return;
		}

		let url = '/workContents/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				$('#addWorkContentsModal').modal('hide');
				alert("저장완료");
				workContents(s_workDailyReport);
			}
		});
	});

	$modalModifyBtn.click(function() {
		// s_workDailyReport
		data.dataseq = s_workContent.dataseq;
		data.worktimeFrom = $("input[name=worktimeFrom]").val();
		data.worktimeTo = $("input[name=workcontenttimeTo]").val();
		data.manhour = $("input[name=workcontentmanhour]").val();
		data.modelid = $("select[name=modelid]").val();
		data.prodQty = $("input[name=prodQty]").val();
		data.planQty = $("input[name=planQty]").val();
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
			success: function(data) {
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
		$("#addNonconFormityModalCreate").css('display', "block");
		$("#addNonconFormityModalModify").css('display', "none");

		$('#addNonconFormityModal').modal('show');
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
			success: function(data) {
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
		data.workdailySeq = dataseq;
		data.modelid = $("select[name=modelid2]").val();
		data.operationid=$("input[name=operationid]").val();
		data.rejectItemid=$("input[name=rejectItemid]").val();
		data.firsttimeRejectQty=$("input[name=firsttimeRejectQty]").val();
		data.reworkRejectQty=$("input[name=reworkRejectQty]").val();
		
		if (data.personid == "") {
			alert("작업자를 선택 하세요.");
			return;
		}
		if (data.modelid == "") {
			alert("모델/차종을 선택 하세요.");
			return;
		}
		if (data.operationid == "") {
			alert("공정을 선택 하세요.");
			return;
		}
		if (data.rejectItemid == "") {
			alert("불량내용을 선택 하세요.");
			return;
		}
	
		let url = '/rejectContents/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				$('#addNonconFormityModal').modal('hide');
				alert("저장완료");
				rejectContents(s_workDailyReport);
			}
		});
	});

	$modalModifyBtn.click(function() {
		// s_workDailyReport
		data.dataseq = s_NonconFormity.dataseq;
		data.modelid = $("select[name=modelid2]").val();
		data.operationid=$("input[name=operationid]").val();
		data.rejectItemid=$("input[name=rejectItemid]").val();
		data.firsttimeRejectQty=$("input[name=firsttimeRejectQty]").val();
		data.reworkRejectQty=$("input[name=reworkRejectQty]").val();
		if (data.personid == "") {
			alert("작업자를 선택 하세요.");
			return;
		}

		let url = '/rejectContents/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				$('#addNonconFormityModal').modal('hide');
				alert("수정완료");
				rejectContents(s_workDailyReport);
			}
		});
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
			success: function(data) {
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
		data.workdailySeq = dataseq;
		data.notoperatetimeFrom =$("input[name=notoperatetimeFrom]").val();
		data.notoperatetimeTo=$("input[name=notoperatetimeTo]").val();
		data.hands=$("input[name=nonhands]").val();
		data.manhour=$("input[name=nonmanhour]").val();
		data.cause=$("input[name=cause]").val();
		data.correctiveAction=$("input[name=correctiveAction]").val();
		if (data.notoperatetimeFrom == "") {
			alert("비가동시작을 선택 하세요.");
			return;
		}
		if (data.notoperatetimeTo == "") {
			alert("비가동종료를 선택 하세요.");
			return;
		}
		if (data.hands == "") {
			alert("인원을 선택 하세요.");
			return;
		}
		if (data.manhour == "") {
			alert("공수를 선택 하세요.");
			return;
		}
		if (data.cause == "") {
			alert("내용/원인을 선택 하세요.");
			return;
		}

		let url = '/notoperateContents/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				$('#addNonOperationModal').modal('hide');
				alert("저장완료");
				notoperateContents(s_workDailyReport);
			}
		});
	});

	$modalModifyBtn.click(function() {
		// s_workDailyReport
		data.dataseq = s_NonOperation.dataseq;
		data.notoperatetimeFrom =$("input[name=notoperatetimeFrom]").val();
		data.notoperatetimeTo=$("input[name=notoperatetimeTo]").val();
		data.hands=$("input[name=nonhands]").val();
		data.manhour=$("input[name=nonmanhour]").val();
		data.cause=$("input[name=cause]").val();
		data.correctiveaction=$("input[name=correctiveaction]").val();
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
			success: function(data) {
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

function line(factoryid) {

	let $dropdown = $("#lineCodes");
	$dropdown.empty();

	c_line = null;
	
	$.ajax({
		url: '/code/line',
		type: 'GET',
		success: function(data) {
			c_line = data;


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

function modelitem() {
	let url = '/code/modelItem';

	c_model_item = null;

	$.ajax({
		url: url,
		type: 'GET',
		success: function(data) {
			c_model_item = data;

			let $dropdown = $("#inputModelCodes");
			$dropdown.empty();
			
			let $dropdown2 = $("#inputModelCodes2");
			$dropdown.empty();

			if (c_model_item) {
				$dropdown.append($("<option/>").val("").text("모델/차종"));
				$dropdown2.append($("<option/>").val("").text("모델/차종"));
				
				$.each(data, function() {
					$dropdown.append($("<option/>").val(this.code).text(this.value));
				});
				$.each(data, function() {
					$dropdown2.append($("<option/>").val(this.code).text(this.value));
				});
			} else {
				$dropdown.append($("<option/>").val("").text("모델/차종"));
			}
		}
	});
}

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

		$("#addWorkDailyReportModalCreate").css('display', "none");
		$("#addWorkDailyReportModalModify").css('display', "block");

		$('#addWorkDailyReportModal').modal('show');

		$factoryCodes = $("#factoryCodes");
		$factoryCodes.trigger('change');

		workDailyReportDetail(row);
	},
	"click .workerInputModify": function(e, value, row, index) {
		s_workerManHour = row;

		$("#addWorkerInputModalCreate").css('display', "none");
		$("#addWorkerInputModalModify").css('display', "block");

		$('#addWorkerIntputModal').modal('show');


	},
	"click .workerManHourModify": function(e, value, row, index) {
		s_workerInput = row;

		$("#addWorkerManhourModalCreate").css('display', "none");
		$("#addWorkerManhourModalModify").css('display', "block");

		$('#addWorkerManhourModal').modal('show');


	},
	"click .workerSupportModify": function(e, value, row, index) {
		s_workerInput = row;
		


		$("#addWorkerSupportModalCreate").css('display', "none");
		$("#addWorkerSupportModalModify").css('display', "block");

		$('#addWorkerSupportModal').modal('show');


	},
	"click .workContenttModify": function(e, value, row, index) {
		s_workContent = row;
		


		$("#addWorkContentsModalCreate").css('display', "none");
		$("#addWorkContentsModalModify").css('display', "block");

		$('#addWorkContentsModal').modal('show');


	},
	"click .NonconFormityModify": function(e, value, row, index) {
		s_NonconFormity = row;
		


		$("#addNonconFormityModalCreate").css('display', "none");
		$("#addNonconFormityModalModify").css('display', "block");

		$('#addNonconFormityModal').modal('show');


	},
	"click .NonOperationModify": function(e, value, row, index) {
		s_NonOperation = row;
		


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
	$("select[name=factoryid]").val(data.factoryid);
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
		factoryid : data.factoryid,
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
	$("select[name=factoryid]").val("");
	$("select[name=groupid]").val("");
	$("select[name=lineid]").val("");
	$("select[name=shiftid]").val("");
	$("input[name=approver]").val("");
	$("input[name=reviewer]").val("");
	$("input[name=notes]").val("");
}

function resetWorkerManhour() {
	$("input[name=hands]").val("");
	$("input[name=manhour]").val("");
	$("select[name=inputItemid]").val("");
}

function initWorkDailyReport() {

	let data = {
		"dataseq": "", "rulesysid": "", "factoryid": "", "factoryname": "",
		"workDate": "", "blockid": "", "blockname": "", "lineid": "",
		"linename": "", "groupid": "", "groupname": "", "shiftid": "",
		"shiftname": "", "register": "", "reviewer": "", "approver": "",
		"notes": "", "creator": "", "createtime": "", "event": "",
		"eventuser": "", "eventtime": "", "isusable": "", "tid": "","planQty": ""
	};

	return data;
}

function initWorkerManhour() {

	let data = {
		"dataseq": "", "workdailySeq": "", "rulesysid": "", "factoryid": "",
		"lineid": "", "shiftid": "", "workDate": "", "inputItemid": "",
		"hands": "", "manhour": "", "creator": "", "createtime": "",
		"event": "", "eventuser": "", "eventtime": "", "isusable": "", "tid": ""
	};

	return data;
}

function initWorkerInput() {

	let data = {
		"dataseq": "", "workdailySeq": "", "rulesysid": "", "factoryid": "",
		"lineid": "", "shiftid": "", "workDate": "", "personid": "",
		"overtime": "", "notes": "", "creator": "", "createtime": "",
		"event": "", "eventuser": "", "eventtime": "", "isusable": "", "tid": ""
	};

	return data;
}

function initWorkerSupportInput() {

	let data = {
		"dataseq": "", "workdailySeq": "", "rulesysid": "", "factoryid": "",
		"lineid": "", "linename": "", "workDate": "", "personid": "",
		"personname": "", "supporttimeFrom": "", "supporttimeTo": "", "manhour": "",
		"creator": "", "createtime": "", "event": "", "eventuser": "", "eventtime": "",
		"isusable": "", "tid": ""
	};

	return data;
}

function initWorkContentsInput() {

	let data = {
		"dataseq": "", "workdailySeq": "", "rulesysid": "", "factoryid": "",
		"lineid": "", "shiftid": "", "workDate": "", "worktimeFrom": "",
		"worktimeTo": "", "modelid": "", "operationid": "", "manhour": "",
		"planQty": "", "prodQty": "", "goodsumQty": "", "firsttimeGoodQty": "", "firsttimeFailQty": "",
		"reworkGoodQty": "", "reworkFailQty": "","notes": "", "images": "",
		"movies": "", "creator": "","createtime": "", "event": "",
		"eventuser": "", "eventtime": "","isusable": "", "tid": "",
	};

	return data;
}

function initNonconFormity() {

	let data = {
		"dataseq": "", "workdailySeq": "", "rulesysid": "", "factoryid": "",
		"lineid": "", "shiftid": "", "workDate": "", "operationid": "",
		"rejectItemid": "", "modelid": "", "firsttimeRejectQty": "", "reworkRejectQty": "",
		"images": "", "movies": "", "creator": "", "createtime": "", "event": "",
		"eventuser": "", "eventtime": "","isusable": "", "tid": ""
	};

	return data;
}

function initNonOperation() {

	let data = {
		"dataseq": "", "workdailySeq": "", "rulesysid": "", "factoryid": "",
		"lineid": "", "shiftid": "", "workDate": "", "notoperatetimeFrom": "",
		"notoperatetimeTo": "", "hands": "", "manhour": "", "cause": "",
		"correctiveAction": "", "notes": "", "images": "", "movies": "", "creator": "",
		"createtime": "", "event": "","eventuser": "", "eventtime": ""
		,"isusable": "", "tid": ""
	};

	return data;
}
