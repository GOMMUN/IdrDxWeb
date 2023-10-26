/**
 * 
 */
let s_mvinfo = null;

$(function(){
	initSetting();
	setEventListener();
});

function initSetting() {
	localStorage.setItem("plant", $("#parameterPlant").val());
	localStorage.setItem("username", $("#parameterUsername").val());
}

 function setEventListener (){
	 
	let $grid = $("#mvinfo");					//그리드
	let $gridAddBtn = $("#addMvinfo");			//그리드 add버튼
	let $gridRemoveBtn = $("#removeMvinfo");	//그리드 delete버튼
	let $modalCreateBtn = $("#addMvInfoModalCreate");	// 모달 insert 버튼
	let $modalModifyBtn = $("#addMvInfoModalModify");	// 모달 update 버튼	
	let $modalCloseBtn = $("#addMvInfoModalClose");		// 모달 close 버튼 	
	 
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
	
	$gridAddBtn.click(function() {			//행추가
		$("#addMvInfoModalCreate").css('display', "block");
		$("#addMvInfoModalModify").css('display', "none");

		$('#addMvInfoModal').modal('show');
	});
	
	$modalCloseBtn.click(function() {
		refreshMvInfo();
		$('#addMvInfoModal').modal('hide');
	});		
	
	$modalCreateBtn.click(function() {

		let data = initMvInfo();
		
		data.modelid = $("input[name=modelid]").val();
		data.modelnm = $("input[name=modelnm]").val();
		data.modeldesc = $("input[name=modeldesc]").val();
		data.useyn = $("select[name=useyn]").val();
		data.fstreguserid = localStorage.getItem("username");

		//validation check
		 if (data.modelid == "") {
			alert("MODEL ID를 입력하세요.");
			$("input[name=modelid]").focus();
			return;
		} else if (data.modelnm == "") {
			alert("MODEL 명을 입력하세요.");
			$("input[name=modelnm]").focus();
			return;
		} else if (data.modeldesc == "") {
			alert("MODEL 설명을 입력하세요.");
			$("input[name=modeldesc]").focus();
			return;
		} else if (data.useyn == "") {
			alert("사용여부를 선택하세요.");
			$("select[name=useyn]").focus();
			return;
		}

		let url = '/mvinfo/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#mvinfo");
				$table.bootstrapTable('refresh');
				refreshMvInfo()
				
				$('#addMvInfoModal').modal('hide');
				alert("저장되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("MODEL ID를 확인해주세요");
	    	}
		});
	});	
	
	$modalModifyBtn.click(function() {
		let data = s_mvinfo;

		data.modelid = $("input[name=modelid]").val();
		data.modelnm = $("input[name=modelnm]").val();
		data.modeldesc = $("input[name=modeldesc]").val();
		data.useyn = $("select[name=useyn]").val();
		data.fnledituserid = localStorage.getItem("username");

		//validation check
		 if (data.modelid == "") {
			alert("MODEL ID를 입력하세요.");
			$("input[name=modelid]").focus();
			return;
		} else if (data.modelnm == "") {
			alert("MODEL 명을 입력하세요.");
			$("input[name=modelnm]").focus();
			return;
		} else if (data.modeldesc == "") {
			alert("MODEL 설명을 입력하세요.");
			$("input[name=modeldesc]").focus();
			return;
		} else if (data.useyn == "") {
			alert("사용여부를 선택하세요.");
			$("select[name=useyn]").focus();
			return;
		}
		
		let url = '/mvinfo/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#mvinfo");
				$table.bootstrapTable('refresh');
				refreshMvInfo()
				
				$('#addMvInfoModal').modal('hide');
				alert("수정 되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("MODEL ID를 확인해주세요");
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

		let url = '/mvinfo/remove';
		
		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				alert("삭제 되었습니다.");
				
				$table = $("#mvinfo");
				$table.bootstrapTable('refresh');
			}
		});
	});		
};

function mvInfoOperateFormatter(value, row, index) {
	return [
		'<a class="mvInfoModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

window.operateEvents = {
	"click .mvInfoModify": function(e, value, row, index) {
		
		s_mvinfo = row;
		
		mvInfoDetail(row);

		$("#addMvInfoModalCreate").css('display', "none");
		$("#addMvInfoModalModify").css('display', "block");

		$('#addMvInfoModal').modal('show');

		mvInfoDetail(row);
	}
}

function mvInfoDetail(data){
	$("input[name=modelid]").val(data.modelid);
	$("input[name=modelnm]").val(data.modelnm);
	$("input[name=modeldesc]").val(data.modeldesc);
	$("select[name=useyn]").val(data.useyn);
}

function initMvInfo() {
	let data = {
		"modelid": "", "modelnm": "", "modeldesc": "", "useyn": "",
		"fstreguserid": "", "fstregdt": "", "fnledituserid": "", "fnleditdt": ""
	};
	
	return data;
}
 
function refreshMvInfo(){
	$("input[name=modelid]").val("");
	$("input[name=modelnm]").val("");
	$("input[name=modeldesc]").val("");
	$("select[name=useyn]").val("Y");
}

