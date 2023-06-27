/**
 * 
 */
let c_factory = null;
let c_block = null;
let c_line = null;
let c_shift= null;

$(function(){
	$("input[name=workDate]").datepicker({
		format: "yyyy-mm-dd",
		autoclose : true,
		language : "ko"
	});
	initSetting();
	setEventListener();
});

function initSetting(){
	code();
}

function code(){
	factroy();
	shift();
}

// Jquery에서 해당 함수명이 있으면 자동으로 호출
function setEventListener (){
	// 작업일보 그리드 이벤트
	$workDailyReport = $("#workDailyReport");
	$addWorkDailyReport = $("#addWorkDailyReport");
	$addWorkDailyReportModalClose = $("#addWorkDailyReportModalClose");
	$addWorkDailyReportModalCreate = $("#addWorkDailyReportModalCreate");
	$addWorkDailyReportModalModify = $("#addWorkDailyReportModalModify");
	$saveWorkDailyReport = $("#saveWorkDailyReport");
	$removeWorkDailyReport = $("#removeWorkDailyReport");
	
	$workDailyReport.on('check.bs.table', function (row, $element) {
		$removeWorkDailyReport.prop('disabled', !$workDailyReport.bootstrapTable('getSelections').length)
	});
	
	$workDailyReport.on('uncheck.bs.table', function (row, $element) {
		$removeWorkDailyReport.prop('disabled', !$workDailyReport.bootstrapTable('getSelections').length)
	});
	
	$workDailyReport.on('check-all.bs.table', function (rowsAfter, rowsBefore) {
		$removeWorkDailyReport.prop('disabled', !$workDailyReport.bootstrapTable('getSelections').length)
	});
	
	$workDailyReport.on('uncheck-all.bs.table', function (rowsAfter, rowsBefore) {
		$removeWorkDailyReport.prop('disabled', !$workDailyReport.bootstrapTable('getSelections').length)
	});
	
	$addWorkDailyReport.click(function () {
		
		resetWorkDailyReport();
		
		$("#addWorkDailyReportModalCreate").css('display', "block");
	  	$("#addWorkDailyReportModalModify").css('display', "none");
	  	
		$('#addWorkDailyReportModal').modal('show');
	});
	
	$addWorkDailyReportModalClose.click(function () {
		$('#addWorkDailyReportModal').modal('hide');
	});
	
	$saveWorkDailyReport.click(function () {
		
		let data = initWorkDailyReport();
		
		data[0].ruleid = $("input[name=ruleid]").val();
		data[0].workDate = $("input[name=workDate]").val();
		data[0].blockid = $("input[name=blockid]").val();
		data[0].factoryid = $("input[name=factoryid]").val();
		data[0].groupid = $("input[name=groupid]").val();
		data[0].lineid = $("input[name=lineid]").val();
		data[0].shiftid = $("input[name=shiftid]").val();
		data[0].approver = $("input[name=approver]").val();
		data[0].reviewer = $("input[name=reviewer]").val();
		
		let url = '/workDailyReport/create';
		
		$.ajax({
		  url: url,
		  type: 'POST',
		  data: JSON.stringify(data),
		  dataType : "json",
		  contentType: 'application/json; charset=utf-8',
		  success: function(data) {
			//$removeWorkDailyReport.prop('disabled', true);
      		workDailyReport();
		  }
	   	});
	});
	
	$removeWorkDailyReport.click(function () {
      
      let selections = [];
      
      $workDailyReport.bootstrapTable('getSelections').forEach(function(data) {
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
			$removeWorkDailyReport.prop('disabled', true);
      		workDailyReport();
		  }
	   });
    });
	
	$workDailyReport.on('click-row.bs.table', function (row, $element, field) {
		workDailyReportDetail($element);
		workerInput($element);
		workerManhour($element);
		workerSupport($element);
		workContents($element);
		rejectContents($element);
		notoperateContents($element);
	});
	
	// 작업자투입현황 그리드 이벤트
	$workerInput = $("#workerInput");
	$removeWorkerInput = $("#removeWorkerInput");
	
	$workerInput.on('check.bs.table', function (row, $element) {
		$removeWorkerInput.prop('disabled', !$workerInput.bootstrapTable('getSelections').length)
	});
	
	$workerInput.on('uncheck.bs.table', function (row, $element) {
		$removeWorkerInput.prop('disabled', !$workerInput.bootstrapTable('getSelections').length)
	});
	
	$workerInput.on('check-all.bs.table', function (rowsAfter, rowsBefore) {
		$removeWorkerInput.prop('disabled', !$workerInput.bootstrapTable('getSelections').length)
	});
	
	$workerInput.on('uncheck-all.bs.table', function (rowsAfter, rowsBefore) {
		$removeWorkerInput.prop('disabled', !$workerInput.bootstrapTable('getSelections').length)
	});
	
	$removeWorkerInput.click(function () {
		
      var ids = $.map($workerInput.bootstrapTable('getSelections'), function (row) {
        return row.dataseq
      });
      
      $workerInput.bootstrapTable('remove', {
        field: 'dataseq',
        values: ids
      });
      
      $removeWorkerInput.prop('disabled', true);
      
    });
    
    // modal 
    $factoryCodes = $("#factoryCodes");
    
    $factoryCodes.change(function () {
		block($factoryCodes.val());
		line($factoryCodes.val());
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
			$dropdown.append($("<option/>").val("").text("조구분 선택"));
			$.each(data, function() {
	            $dropdown.append($("<option/>").val(this.code).text(this.value));
	        });
		}else{
			$dropdown.append($("<option/>").val("").text("조구분 선택"));
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
	$("input[name=workDate]").datepicker( "setDate",new Date(data.workDate.substring(0,4),data.workDate.substring(4,6),data.workDate.substring(6,8)));
	$("select[name=blockid]").val(data.blockid);
	$("select[name=factoryid]").val(data.factoryid);
	$("select[name=groupid]").val(data.groupid);
	$("select[name=lineid]").val(data.lineid);
	$("select[name=shiftid]").val(data.shiftid);
	$("input[name=approver]").val(data.approver);
	$("input[name=reviewer]").val(data.reviewer);
}

function workerInput(data) {
    var url = '/workerInput/find';
    
    var params = {
		//rulesysid : data.rulesysid,
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
} 
 
 function initWorkDailyReport(){
	
	let data = [{
		    "dataseq": "",		    "rulesysid": "",		    "factoryid": "",		    "factoryname": "",
		    "workDate": "",		    "blockid": "",		    "blockname": "",		    "lineid": "",
		    "linename": "",		    "groupid": "",		    "groupname": "",		    "shiftid": "",
		    "shiftname": "",		    "register": "",		    "reviewer": "",		    "approver": "",
		    "notes": "",		    "creator": "",		    "createtime": "",		    "event": "",
		    "eventuser": "",		    "eventtime": "",		    "isusable": "",		    "tid": ""
		}];
		
	return data;
}


