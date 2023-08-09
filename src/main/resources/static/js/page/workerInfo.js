/** 
 * 
 */
let s_workerinfo = null;

$(function(){
	initSetting();
	setEventListener();
});

function initSetting() {
	factroy();		// 공장코드 조회
}

 function setEventListener (){
	 
	let $grid = $("#workerinfo");	//그리드
	let $gridAddBtn = $("#addWorkerInfo");			//그리드 add버튼
	let $gridRemoveBtn = $("#removeWorkerinfo");	//그리드 delete버튼
	let $modalCreateBtn = $("#addWorkerInfoModalCreate");	// 모달 insert 버튼
	let $modalModifyBtn = $("#addWorkerInfoModalModify");	// 모달 update 버튼	
	let $modalCloseBtn = $("#addWorkerInfoModalClose");		// 모달 close 버튼 
	 
	$grid.on('check.bs.table', function (row, $element, field) {
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
		$("#addWorkerInfoModalCreate").css('display', "block");
		$("#addWorkerInfoModalModify").css('display', "none");

		$('#addWorkerInfoModal').modal('show');
	});
	
	$modalCloseBtn.click(function() {
		refreshWorkerInfo();
		$('#addWorkerInfoModal').modal('hide');
	});		
	
	$modalCreateBtn.click(function() {

		let data = initWorkerInfo();
		
		data.personid = $("input[name=personid]").val();
		data.factoryid = $("select[name=factoryid]").val();
		data.personname = $("input[name=personname]").val();
		data.isusable = $("select[name=isusable]").val();

		//validation check
		 if (data.personid == "") {
			alert("작업자 ID를 입력하세요.");
			$("input[name=personid]").focus();
			return;
		} else if (data.factoryid == "") {
			alert("공장명을 선택하세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.personname == "") {
			alert("작업자명을 입력하세요.");
			$("input[name=personname]").focus();
			return;
		} else if (data.useyn == "") {
			alert("사용유무를 선택하세요.");
			$("select[name=isusable]").focus();
			return;
		}

		let url = '/workerinfo/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#workerinfo");
				$table.bootstrapTable('refresh');
				refreshWorkerInfo()
				
				$('#addWorkerInfoModal').modal('hide');
				alert("저장되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("작업자ID와 공장을 확인해주세요");
	    	}
		});
	});
		
	$modalModifyBtn.click(function() {
		let data = s_workerinfo;

		data.personid = $("input[name=personid]").val();
		data.factoryid = $("select[name=factoryid]").val();
		data.personname = $("input[name=personname]").val();
		data.isusable = $("select[name=isusable]").val();

		//validation check
		 if (data.personid == "") {
			alert("작업자 ID를 입력하세요.");
			$("input[name=personid]").focus();
			return;
		} else if (data.factoryid == "") {
			alert("공장명을 선택하세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.personname == "") {
			alert("작업자명을 입력하세요.");
			$("input[name=personname]").focus();
			return;
		} else if (data.useyn == "") {
			alert("사용유무를 선택하세요.");
			$("select[name=isusable]").focus();
			return;
		}
		
		let url = '/workerinfo/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#workerinfo");
				$table.bootstrapTable('refresh');
				refreshWorkerInfo()
				
				$('#addWorkerInfoModal').modal('hide');
				alert("수정 되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("작업자ID와 공장을 확인해주세요");
	    	}
		});
	});			
	
	$gridRemoveBtn.click(function() {	
		
		if(!confirm('해당 데이터를 사용하지 않겠습니까?')){
            return false;
        }

		let selections = [];

		$grid.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);	
		});

		let url = '/workerinfo/remove';
		
		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				alert("비사용으로 변경되였습니다.");
				location.reload();
			}
		});
	});	
    	
};

function workerInfoOperateFormatter(value, row, index) {
	return [
		'<a class="workerInfoModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

window.operateEvents = {
	"click .workerInfoModify": function(e, value, row, index) {
		
		s_workerinfo = row;

		workerInfoDetail(row);

		$("#addWorkerInfoModalCreate").css('display', "none");
		$("#addWorkerInfoModalModify").css('display', "block");

		$('#addWorkerInfoModal').modal('show');

		workerInfoDetail(row);
	}
}

function workerInfoDetail(data){
	$("input[name=personid]").val(data.personid);
	$("select[name=factoryid]").val(data.factoryid);
	$("input[name=personname]").val(data.personname);
	$("select[name=isusable]").val(data.isusable);
}

function initWorkerInfo() {
	let data = {
		"personid": "", "factoryid": "", "personname": "", "isusable": "", "factoryname": ""
	};
	
	return data;
}

function refreshWorkerInfo() {
	$("input[name=personid]").val("");
	$("select[name=factoryid]").val("");
	$("input[name=personname]").val("");
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