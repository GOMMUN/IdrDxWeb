/**
 * 
 */
let s_groupshiftinfo = null;

$(function(){
	initSetting();
	setEventListener();
});

function initSetting() {
	localStorage.setItem("plant", $("#parameterPlant").val());
	localStorage.setItem("username", $("#parameterUsername").val());
	
	factroy();		// 공장코드 조회
}


 function setEventListener (){

	let $grid = $("#shiftinfo");					//그리드
	let $gridAddBtn = $("#addShiftinfo");			//그리드 add버튼
	let $gridRemoveBtn = $("#removeShiftinfo");		//그리드 delete버튼
	let $modalCreateBtn = $("#addGroupShiftInfoModalCreate");	// 모달 insert 버튼
	let $modalModifyBtn = $("#addGroupShiftInfoModalModify");	// 모달 update 버튼	
	let $modalCloseBtn = $("#addGroupShiftInfoModalClose");		// 모달 close 버튼 
	 
	$grid.on('check.bs.table', function (row, $element, field) {	//조회
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
	
	$gridAddBtn.click(function() {
		
		$("#groupshiftForm input[name=shiftid]").prop("disabled", false);
        $("#groupshiftForm select[name=factoryid]").prop("disabled", false);
        
		$("#addGroupShiftInfoModalCreate").css('display', "block");
		$("#addGroupShiftInfoModalModify").css('display', "none");

		$('#addGroupShiftInfoModal').modal('show');
	});
	
	$modalCloseBtn.click(function() {
		refreshGroupShiftInfo();
		$('#addGroupShiftInfoModal').modal('hide');
	});	
	
	$modalCreateBtn.click(function() {

		let data = initGroupShiftInfo();
		
		data.factoryid = $("select[name=factoryid]").val();
		data.shiftid = $("input[name=shiftid]").val();
		data.shiftname = $("select[name=shiftname]").val();
		data.shifttype = $("input[name=shifttype]").val();
		data.starttime = $("input[name=starttime]").val();
		data.endtime = $("input[name=endtime]").val();
		data.isusable = $("select[name=isusable]").val();
		data.creator = localStorage.getItem("username");
		
		//validation check
		 if (data.factoryid == "") {
			alert("공장을 선택해주세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.shiftid == "") {
			alert("그룹/SHIFT 코드를 입력하세요.");
			$("input[name=shiftid]").focus();
			return;
		} else if (data.shiftname == "") {
			alert("그룹/Shift명을 선택해주세요.");
			$("select[name=shiftname]").focus();
			return;
		} else if (data.shifttype == "") {
			alert("그룹/Shift타입을 입력하세요.");
			$("input[name=shifttype]").focus();
			return;
		}
		if (data.starttime == "") {
			alert("시작시간을 선택해주세요.");
			$("input[name=starttime]").focus();
			return;
		}else if (data.endtime == "") {
			alert("종료시간을 선택해주세요.");
			$("input[name=endtime]").focus();
			return;
		}else if(data.starttime > data.endtime){
			alert("조회 시작일이 조회 종료일보다 큽니다.");
			$("input[name=starttime]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택해주세요.");
			$("select[name=isusable]").focus();
			return;
		}

		let url = '/groupshift/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#shiftinfo");
				$table.bootstrapTable('refresh');
				refreshGroupShiftInfo()
				
				$('#addGroupShiftInfoModal').modal('hide');
				alert("저장되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("그룹/SHIFT 코드와 공장을 확인해주세요");
	    	}
		});
	});
	
	$modalModifyBtn.click(function() {
		let data = s_groupshiftinfo;

		data.factoryid = $("select[name=factoryid]").val();
		data.shiftid = $("input[name=shiftid]").val();
		data.shiftname = $("select[name=shiftname]").val();
		data.shifttype = $("input[name=shifttype]").val();
		data.starttime = $("input[name=starttime]").val();
		data.endtime = $("input[name=endtime]").val();
		data.isusable = $("select[name=isusable]").val();
		data.eventuser = localStorage.getItem("username");

		//validation check
		if (data.factoryid == "") {
			alert("공장을 선택해주세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.shiftid == "") {
			alert("그룹/SHIFT 코드를 입력하세요.");
			$("input[name=shiftid]").focus();
			return;
		} else if (data.shiftname == "") {
			alert("그룹/Shift명을 선택해주세요.");
			$("select[name=shiftname]").focus();
			return;
		} else if (data.shifttype == "") {
			alert("그룹/Shift타입을 입력하세요.");
			$("input[name=shifttype]").focus();
			return;
		}
		if (data.starttime == "") {
			alert("시작시간을 선택해주세요.");
			$("input[name=starttime]").focus();
			return;
		}else if (data.endtime == "") {
			alert("종료시간을 선택해주세요.");
			$("input[name=endtime]").focus();
			return;
		}else if(data.starttime > data.endtime){
			alert("조회 시작일이 조회 종료일보다 큽니다.");
			$("input[name=starttime]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택해주세요.");
			$("select[name=isusable]").focus();
			return;
		}
		
		let url = '/groupshift/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#shiftinfo");
				$table.bootstrapTable('refresh');
				refreshGroupShiftInfo()
				
				$('#addGroupShiftInfoModal').modal('hide');
				alert("수정 되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("그룹/SHIFT 코드와 공장을 확인해주세요");
	    	}
		});
	});		
	
	$gridRemoveBtn.click(function() {	
		
		if(!confirm('선택한 데이터를 삭제하시겠습니까?')){
            return false;
        }

		let selections = [];

		$grid.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);	
		});

		let url = '/groupshift/remove';
		
		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#shiftinfo");
				$table.bootstrapTable('refresh');
				
				alert("삭제 되었습니다.");
			}
		});
	});
};

function groupShiftInfoOperateFormatter(value, row, index) {
	return [
		'<a class="groupShiftInfoModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

window.operateEvents = {
	"click .groupShiftInfoModify": function(e, value, row, index) {
		
		s_groupshiftinfo = row;
		
		groupShiftInfoDetail(row);
		
		$("#groupshiftForm input[name=shiftid]").prop("disabled", true);
        $("#groupshiftForm select[name=factoryid]").prop("disabled", true);

		$("#addGroupShiftInfoModalCreate").css('display', "none");
		$("#addGroupShiftInfoModalModify").css('display', "block");

		$('#addGroupShiftInfoModal').modal('show');

		groupShiftInfoDetail(row);
	}
}

function groupShiftInfoDetail(data){
	$("select[name=factoryid]").val(data.factoryid);
	$("input[name=shiftid]").val(data.shiftid);
	$("select[name=shiftname]").val(data.shiftname);
	$("input[name=shifttype]").val(data.shifttype);
	$("input[name=starttime]").val(data.starttime);
	$("input[name=endtime]").val(data.endtime);
	$("select[name=isusable]").val(data.isusable);
}
  
function initGroupShiftInfo() {
	let data = {
		"companyid": "dx", "factoryid": "", "factoryname": "", "shiftid": "", "shiftname": "",
		"shifttype": "", "starttime": "", "endtime": "", "isusable": ""
	};
	
	return data;
}

function refreshGroupShiftInfo() {
	$("select[name=factoryid]").val("");
	$("input[name=shiftid]").val("");
	$("select[name=shiftname]").val("");
	$("input[name=shifttype]").val("");
	$("input[name=starttime]").val("");
	$("input[name=endtime]").val("");
	$("select[name=isusable]").val("Y");
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

  