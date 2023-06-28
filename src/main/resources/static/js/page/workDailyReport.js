/**
 * 
 */
let c_factory = null;	
let c_block = null;
let c_line = null;
let c_shift= null;
let s_workDailyReport=null;

$(function(){
	initSetting();
	setEventListener();
});

function initSetting(){
	
	$("input[name=workDate]").datepicker({
		format: "yyyy-mm-dd",
		autoclose : true,
		language : "ko"
	});
	
	code();
}

function code(){
	factroy();		// 공장코드 조회
	shift();		// 주/야간구분 코드 조회
}

// Jquery에서 해당 함수명이 있으면 자동으로 호출
function setEventListener (){
	
	setWorkDailyReportEventListener();		// 작업일보 이벤트 리스너
	setWorkerInputEventListener();			// 작업자투입현황 이벤트 리스너
	setWorkerManhourEventListener();		// 공수투입현황 이벤트 리스너
}

// 작업일보 이벤트
function setWorkDailyReportEventListener(){
	$grid = $("#workDailyReport");							// 작업일보 그리드
	$gridAddBtn = $("#addWorkDailyReport");					// 작업일보 그리드 add 버튼
	$gridRemoveBtn = $("#removeWorkDailyReport");			// 작업일보 그리드 delete 버튼		
	$modalCloseBtn = $("#addWorkDailyReportModalClose");	// 작업일보 모달 close 버튼
	$modalCreateBtn = $("#addWorkDailyReportModalCreate");	// 작업일보 모달 insert 버튼
	$modalModifyBtn = $("#addWorkDailyReportModalModify");	// 작업일보 모달 update 버튼
	
	$grid.on('check.bs.table', function (row, $element) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$grid.on('uncheck.bs.table', function (row, $element) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$grid.on('check-all.bs.table', function (rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$grid.on('uncheck-all.bs.table', function (rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$gridAddBtn.click(function () {
		
		resetWorkDailyReport();
		
		$("#addWorkDailyReportModalCreate").css('display', "block");
	  	$("#addWorkDailyReportModalModify").css('display', "none");
	  	
		$('#addWorkDailyReportModal').modal('show');
	});
	
	$modalCloseBtn.click(function () {
		$('#addWorkDailyReportModal').modal('hide');
	});
	
	$modalCreateBtn.click(function () {
		
		let data = initWorkDailyReport();
		
		data.workDate = $("input[name=workDate]").val();
		data.blockid = $("select[name=blockid]").val();
		data.factoryid = $("select[name=factoryid]").val();
		data.groupid = $("select[name=groupid]").val();
		data.lineid = $("select[name=lineid]").val();
		data.shiftid = $("select[name=shiftid]").val();
		data.approver = $("input[name=approver]").val();
		data.reviewer = $("input[name=reviewer]").val();
		data.notes = $("input[name=notes]").val();
		
		//validation check
		if(data.workDate == ""){
			alert("날짜를 선택해주세요.");
			$("input[name=workDate]").focus();
			return;
		}else if(data.factoryid == ""){
			alert("공장을 선택해주세요.");
			$("select[name=factoryid]").focus();
			return;
		}else if(data.blockid == ""){
			alert("블록을 선택해주세요.");
			$("select[name=blockid]").focus();
			return;
		}else if(data.lineid == ""){
			alert("라인을 선택해주세요.");
			$("select[name=lineid]").focus();
			return;
		}else if(data.groupid == ""){
			alert("조구분을 선택해주세요.");
			$("select[name=groupid]").focus();
			return;
		}else if(data.shiftid == ""){
			alert("주/야구분을 선택해주세요.");
			$("select[name=shiftid]").focus();
			return;
		}
		
		let url = '/workDailyReport/create';
		
		$.ajax({
		  url: url,
		  type: 'POST',
		  data: JSON.stringify(data),
		  dataType : "json",
		  contentType: 'application/json; charset=utf-8',
		  success: function(data) {
			//$gridRemoveBtn.prop('disabled', true);
			$('#addWorkDailyReportModal').modal('hide');
      		workDailyReport();
		  }
	   	});
	});
	
	$modalModifyBtn.click(function () {
		
		if(s_workDailyReport){
			let data = s_workDailyReport;
		
			data.workDate = $("input[name=workDate]").val();
			data.blockid = $("select[name=blockid]").val();
			data.factoryid = $("select[name=factoryid]").val();
			data.groupid = $("select[name=groupid]").val();
			data.lineid = $("select[name=lineid]").val();
			data.shiftid = $("select[name=shiftid]").val();
			data.approver = $("input[name=approver]").val();
			data.reviewer = $("input[name=reviewer]").val();
			data.notes = $("input[name=notes]").val();
			
			//validation check
			if(data.workDate == ""){
				alert("날짜를 선택해주세요.");
				$("input[name=workDate]").focus();
				return;
			}else if(data.factoryid == ""){
				alert("공장을 선택해주세요.");
				$("select[name=factoryid]").focus();
				return;
			}else if(data.blockid == ""){
				alert("블록을 선택해주세요.");
				$("select[name=blockid]").focus();
				return;
			}else if(data.lineid == ""){
				alert("라인을 선택해주세요.");
				$("select[name=lineid]").focus();
				return;
			}else if(data.groupid == ""){
				alert("조구분을 선택해주세요.");
				$("select[name=groupid]").focus();
				return;
			}else if(data.shiftid == ""){
				alert("주/야구분을 선택해주세요.");
				$("select[name=shiftid]").focus();
				return;
			}
			let url = '/workDailyReport/modify';
			
			$.ajax({
			  url: url,
			  type: 'PUT',
			  data: JSON.stringify(data),
			  dataType : "json",
			  contentType: 'application/json; charset=utf-8',
			  success: function(data) {
				$('#addWorkDailyReportModal').modal('hide');
	      		workDailyReport();
			  }
		   	});
		}
	});
	
	$gridRemoveBtn.click(function () {
      
      let selections = [];
      
      $grid.bootstrapTable('getSelections').forEach(function(data) {
		selections.push(data.dataseq);
	  });
	  
	  let url = '/workDailyReport/remove';
	  
	  $.ajax({
		  url: url,
		  type: 'PUT',
		  data: JSON.stringify(selections),
		  dataType : "json",
		  contentType: 'application/json; charset=utf-8',
		  success: function(data) {
			$gridRemoveBtn.prop('disabled', true);
      		workDailyReport();
		  }
	   });
    });
	
	$grid.on('click-row.bs.table', function (row, $element, field) {
		
		s_workDailyReport = $element;
		
		workerInput(s_workDailyReport);
		workerManhour(s_workDailyReport);
		workerSupport(s_workDailyReport);
		workContents(s_workDailyReport);
		rejectContents(s_workDailyReport);
		notoperateContents(s_workDailyReport);
	});
	
	// modal 
    $factoryCodes = $("#factoryCodes");
    
    $factoryCodes.change(function () {
		block($factoryCodes.val());
		line($factoryCodes.val());
	});
}

function setWorkerInputEventListener(){
	$grid = $("#workerInput");
	$gridAddBtn = $("#addWorkerInput");
	$gridRemoveBtn = $("#removeWorkerInput");
	
	$grid.on('check.bs.table', function (row, $element) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$grid.on('uncheck.bs.table', function (row, $element) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$grid.on('check-all.bs.table', function (rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$grid.on('uncheck-all.bs.table', function (rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$gridAddBtn.click(function () {
		
//		resetWorkDailyReport();
//		
//		$("#addWorkDailyReportModalCreate").css('display', "block");
//	  	$("#addWorkDailyReportModalModify").css('display', "none");
	  	
		$('#addWorkerIntputModal').modal('show');
	});
	
	$gridRemoveBtn.click(function () {
		
      var ids = $.map($grid.bootstrapTable('getSelections'), function (row) {
        return row.dataseq
      });
      
      $grid.bootstrapTable('remove', {
        field: 'dataseq',
        values: ids
      });
      
      $gridRemoveBtn.prop('disabled', true);
      
    });
}

function setWorkerManhourEventListener(){
	
	$grid = $("#workerManhour");
	$gridAddBtn = $("#addWorkerManhour");
	$gridRemoveBtn = $("#removeWorkerManhour");
	
	$modalCloseBtn = $("#addWorkerManhourModalClose");		// 작업일보 모달 close 버튼
	$modalCreateBtn = $("#addWorkerManhourModalCreate");	// 작업일보 모달 insert 버튼
	$modalModifyBtn = $("#addWorkerManhourModalModify");	// 작업일보 모달 update 버튼
	
	$grid.on('check.bs.table', function (row, $element) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$grid.on('uncheck.bs.table', function (row, $element) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$grid.on('check-all.bs.table', function (rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$grid.on('uncheck-all.bs.table', function (rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$gridAddBtn.click(function () {
		
		if(!s_workDailyReport){
			alert("작업일보를 선택해주세요.");
			return;
		}
		
//		resetWorkDailyReport();

		$("#addWorkerManhourModalCreate").css('display', "block");
	  	$("#addWorkerManhourModalModify").css('display', "none");
	  	
		$('#addWorkerManhourModal').modal('show');
	});
	
	$modalCloseBtn.click(function () {
		$('#addWorkerManhourModal').modal('hide');
	});
	
	$modalCreateBtn.click(function () {
		// s_workDailyReport
		let data = initWorkerManhour();
		
		data.workDate = s_workDailyReport.workDate;
		data.workdailySeq = s_workDailyReport.workdailySeq;
		data.blockid = s_workDailyReport.blockid;
		data.factoryid = s_workDailyReport.factoryid;
		data.groupid = s_workDailyReport.groupid;
		data.lineid = s_workDailyReport.lineid;
		data.shiftid = s_workDailyReport.shiftid;
		data.notes = $("input[name=notes]").val();
		
		debugger;
	});
}

function factroy(){
	let url = '/code/factory';
	
	c_factory = null;
	
	$.ajax({
	  url: url,
	  type: 'GET',
	  success: function(data) {
		c_factory = data;
		
		let $dropdown = $("#factoryCodes");
		$dropdown.empty();
			
		if(c_factory){
			$dropdown.append($("<option/>").val("").text("공장 선택"));
			$.each(data, function() {
	            $dropdown.append($("<option/>").val(this.code).text(this.value));
	        });
		}else{
			$dropdown.append($("<option/>").val("").text("공장 선택"));
		}
	  }
   	});
}

function block(factoryid){
	
	let $dropdown = $("#blockCodes");
	$dropdown.empty();
	
	if(!factoryid){
		$dropdown.append($("<option/>").val("").text("블록 선택"));
		return;
	}
	
	let data = {
		"factoryid" : factoryid
	};
	
	c_block = null;
	
	$.ajax({
	  url: '/code/block',
	  type: 'GET',
	  data: data,
	  success: function(data) {
		c_block = data;
		
		if(c_block){
			$dropdown.append($("<option/>").val("").text("블록 선택"));
			$.each(data, function() {
	            $dropdown.append($("<option/>").val(this.code).text(this.value));
	        });
		}else{
			$dropdown.append($("<option/>").val("").text("블록 선택"));
		}
	  }
   	});
}

function line(factoryid){
	
	let $dropdown = $("#lineCodes");
	$dropdown.empty();
	
	if(!factoryid){
		$dropdown.append($("<option/>").val("").text("라인 선택"));
		return;
	}
	
	let data = {
		"factoryid" : factoryid
	};
	
	c_line = null;
	
   	$.ajax({
	  url: '/code/line',
	  type: 'GET',
	  data: data,
	  success: function(data) {
		c_line = data;
		
		if(c_line){
			$dropdown.append($("<option/>").val("").text("라인 선택"));
			$.each(data, function() {
	            $dropdown.append($("<option/>").val(this.code).text(this.value));
	        });
		}else{
			$dropdown.append($("<option/>").val("").text("라인 선택"));
		}
	  }
   	});
}

function shift(){
	let url = '/code/shift';
	
	c_shift = null;
	
	$.ajax({
	  url: url,
	  type: 'GET',
	  success: function(data) {
		c_shift = data;
		
		let $dropdown = $("#shiftCodes");
		$dropdown.empty();
			
		if(c_shift){
			$dropdown.append($("<option/>").val("").text("주/야간구분 선택"));
			$.each(data, function() {
	            $dropdown.append($("<option/>").val(this.code).text(this.value));
	        });
		}else{
			$dropdown.append($("<option/>").val("").text("주/야간구분 선택"));
		}
	  }
   	});
}

function operateFormatter(value, row, index) {
	return [
		'<a class="modify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

window.operateEvents = {
	"click .modify": function (e, value, row, index) {
		
		workDailyReportDetail(row);
		
		block(row.factoryid);
		line(row.factoryid);
		
//		$("input[name=workDate]").prop('disabled',true);
//		$("select[name=blockid]").prop('disabled',true);
//		$("select[name=factoryid]").prop('disabled',true);
//		$("select[name=groupid]").prop('disabled',true);
//		$("select[name=lineid]").prop('disabled',true);
//		$("select[name=shiftid]").prop('disabled',true);
		
		$("#addWorkDailyReportModalCreate").css('display', "none");
	  	$("#addWorkDailyReportModalModify").css('display', "block");
	  	
		$('#addWorkDailyReportModal').modal('show');
 	}
}

function workDailyReport(){
	var url = '/workDailyReport/find';
	
	$.get(url).then(function (res) {
	  $table = $("#workDailyReport");
      $table.bootstrapTable('removeAll');
      $table.bootstrapTable('append',res);
    })
}

function workDailyReportDetail(data){
//	$("input[name=ruleid]").val(data.rulesysid);
	//$('#workDateDetail').datepicker("setDate",new Date(data.workDate))
	//$("input[name=workDate]").val(data.workDate);
	s_workDailyReport = data;
	
	$("input[name=workDate]").datepicker( "setDate",new Date(data.workDate.substring(0,4),data.workDate.substring(4,6)-1,data.workDate.substring(6,8)));
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
		workDailySeq : data.dataseq,
		factoryid : data.factoryid,
		lineid : data.lineid,
		shiftid : data.shiftid,
		workDate : data.workDate,
	}
	
    $.get(url + '?' + $.param(params)).then(function (res) {
	  $table = $("#workerInput");
      $table.bootstrapTable('removeAll');
      $table.bootstrapTable('append',res);
    })
 }
 
 function workerManhour(data) {
    var url = '/workerManhour/find';
    
    var params = {
		//rulesysid : data.rulesysid,
		factoryid : data.factoryid,
		lineid : data.lineid,
		shiftid : data.shiftid,
		workDate : data.workDate,
	}
	
    $.get(url + '?' + $.param(params)).then(function (res) {
	  $table = $("#workerManhour");
      $table.bootstrapTable('removeAll');
      $table.bootstrapTable('append',res);
    })
 }
 
 function workerSupport(data) {
    var url = '/workerSupport/find';
    
    var params = {
		//rulesysid : data.rulesysid,
		factoryid : data.factoryid,
		lineid : data.lineid,
		workDate : data.workDate,
	}
	
    $.get(url + '?' + $.param(params)).then(function (res) {
	  $table = $("#workerSupport");
      $table.bootstrapTable('removeAll');
      $table.bootstrapTable('append',res);
    })
 }
 
 function workContents(data) {
    var url = '/workContents/find';
    
    var params = {
		//rulesysid : data.rulesysid,
		factoryid : data.factoryid,
		lineid : data.lineid,
		shiftid : data.shiftid,
		workDate : data.workDate,
	}

    $.get(url + '?' + $.param(params)).then(function (res) {
	  $table = $("#workContents");
      $table.bootstrapTable('removeAll');
      $table.bootstrapTable('append',res);
    })
 }
 
 function notoperateContents(data) {
    var url = '/notoperateContents/find';
    
    var params = {
		//rulesysid : data.rulesysid,
		factoryid : data.factoryid,
		lineid : data.lineid,
		shiftid : data.shiftid,
		workDate : data.workDate,
	}

    $.get(url + '?' + $.param(params)).then(function (res) {
	  $table = $("#notoperateContents");
      $table.bootstrapTable('removeAll');
      $table.bootstrapTable('append',res);
    })
 }
 
 function rejectContents(data) {
    var url = '/rejectContents/find';
    
    var params = {
		//rulesysid : data.rulesysid,
		factoryid : data.factoryid,
		lineid : data.lineid,
		shiftid : data.shiftid,
		workDate : data.workDate,
	}

    $.get(url + '?' + $.param(params)).then(function (res) {
	  $table = $("#rejectContents");
      $table.bootstrapTable('removeAll');
      $table.bootstrapTable('append',res);
    })
 }
 
function resetWorkDailyReport(){
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
 
 function initWorkDailyReport(){
	
	let data = {
		    "dataseq": "",		    "rulesysid": "",		    "factoryid": "",		    "factoryname": "",
		    "workDate": "",		    "blockid": "",		    "blockname": "",		    "lineid": "",
		    "linename": "",		    "groupid": "",		    "groupname": "",		    "shiftid": "",
		    "shiftname": "",		    "register": "",		    "reviewer": "",		    "approver": "",
		    "notes": "",		    "creator": "",		    "createtime": "",		    "event": "",
		    "eventuser": "",		    "eventtime": "",		    "isusable": "",		    "tid": ""
		};
		
	return data;
}

function initWorkerManhour(){
	
	let data = {
		"dataseq" : "",	"workdailySeq" : "", "rulesysid" : "",	"factoryid" : "",	
		"lineid" : "",	"shiftid" : "",	"workDate" : "",	"inputItemid" : "",	
		"hands" : "",	"manhour" : "",	"creator" : "",	"createtime" : "",	
		"event" : "",	"eventuser" : "",	"eventtime" : "",	"isusable" : "", "tid" : ""	
	};
		
	return data;
}


