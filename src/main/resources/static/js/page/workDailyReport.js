/**
 * 
 */
$(function(){
	$('#workDateDetail').datepicker({
		format: "yyyy-mm-dd",
		autoclose : true,
		language : "ko"
	});
	setEventListener();
});

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
		workContents($element)
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
}

function operateFormatter(value, row, index) {
	return [
		'<a class="like" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

window.operateEvents = {
	"click .like": function (e, value, row, index) {
		//debugger;
	  	alert('You click like action, row: ');
 	}
}

function operateEvents(){
	//debugger;
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
	$("input[name=ruleid]").val(data.rulesysid);
	//$('#workDateDetail').datepicker("setDate",new Date(data.workDate))
	$("input[name=workDate]").val(data.workDate);
	$("input[name=blockid]").val(data.blockid);
	$("input[name=factoryid]").val(data.factoryid);
	$("input[name=groupid]").val(data.groupid);
	$("input[name=lineid]").val(data.lineid);
	$("input[name=shiftid]").val(data.shiftid);
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
 
function resetWorkDailyReport(){
	$("input[name=ruleid]").val("");
	$("input[name=workDate]").val("");
	$("input[name=blockid]").val("");
	$("input[name=factoryid]").val("");
	$("input[name=groupid]").val("");
	$("input[name=lineid]").val("");
	$("input[name=shiftid]").val("");
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


