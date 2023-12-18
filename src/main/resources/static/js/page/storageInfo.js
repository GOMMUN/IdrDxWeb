/**
 * 
 */
let c_factory = null;
let s_storageInfo = null;

$(function(){
	initSetting();
	setEventListener();
});

function initSetting() {
	localStorage.setItem("plant", $("#parameterPlant").val());
	localStorage.setItem("username", $("#parameterUsername").val());
	
	factroy();		// 코드 조회
}


 function setEventListener (){

	let $grid = $("#storageinfo");					//조회
	let $gridAddBtn = $("#addStorageinfo");			// add 버튼
	let $gridRemoveBtn = $("#removeStorageinfo");		// delete 버튼
	let $modalCloseBtn = $("#addStorageinfoModalClose");	// 모달 close 버튼
	let $modalCreateBtn = $("#addStorageinfoModalCreate");	// 모달 insert 버튼
	let $modalModifyBtn = $("#addStorageinfoModalModify");	// 모달 update 버튼 
	
	$grid.on('check.bs.table', function(row, $element) { //조회
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
	
	$grid.on('page-change.bs.table', function(number, size) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$grid.on('refresh.bs.table', function(params) {
		storageinfo();
	});
	
	$gridAddBtn.click(function() {		// 창고정보 add 버튼
		
		$("#addStorageinfoModalCreate").css('display', "block");
		$("#addStorageinfoModalModify").css('display', "none");

		$('#addStorageinfoModal').modal('show');
		
	});
	
	$modalCloseBtn.click(function() {
		refreshStorageInfo();
		$('#addStorageinfoModal').modal('hide');
	});
	
	$modalCreateBtn.click(function() {

		let data = {};
		
		data.factoryid = $("select[name=factoryid]").val();
		data.storageid = $("input[name=storageid]").val();
		data.storagename = $("input[name=storagename]").val();
		data.isusable = $("select[name=isusable]").val();
		data.creator = localStorage.getItem("username");
	
		//validation check
		if (data.factoryid == "") {
			alert("공장을 선택해주세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.storageid == "") {
			alert("창고코드를 입력하세요.");
			$("input[name=storageid]").focus();
			return;
		} else if (data.storageid == "") {
			alert("창고명을 입력하세요.");
			$("input[name=storagename]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택해주세요.");
			$("select[name=isusable]").focus();
			return;
		}

		let url = '/storageinfo/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#storageinfo");
				$table.bootstrapTable('refresh');
				refreshStorageInfo()
				
				$('#addStorageinfoModal').modal('hide');
				alert("저장되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("창고코드와 공장을 확인해주세요");
	    	}
		});
	});
	
	$modalModifyBtn.click(function() {
		let data = s_storageInfo;

		data.factoryid = $("select[name=factoryid]").val();
		data.storageid = $("input[name=storageid]").val();
		data.storagename = $("input[name=storagename]").val();
		data.isusable = $("select[name=isusable]").val();
		data.eventuser = localStorage.getItem("username");

		//validation check
		if (data.factoryid == "") {
			alert("공장을 선택해주세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.storageid == "") {
			alert("창고코드를 입력하세요.");
			$("input[name=storageid]").focus();
			return;
		} else if (data.storageid == "") {
			alert("창고명을 입력하세요.");
			$("input[name=storagename]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택해주세요.");
			$("select[name=isusable]").focus();
			return;
		}
		
		let url = '/storageinfo/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#storageinfo");
				$table.bootstrapTable('refresh');
				refreshStorageInfo()
				
				$('#addStorageinfoModal').modal('hide');
				alert("수정 되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("창고코드와 공장을 확인해주세요");
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

		let url = '/storageinfo/remove';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#storageinfo");
				$table.bootstrapTable('refresh');
				
				$gridRemoveBtn.prop('disabled', true);
				//alert("비사용으로 변경되였습니다.");
			}
		});
	});
};
 
function storageinfo(data) {
	var url = '/storageinfo/find';

	var params = {}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#storageinfo");
		$table.bootstrapTable('removeAll');
		$table.bootstrapTable('append', res);
	})
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

function storageinfoOperateFormatter(value, row, index) {
	return [
		'<a class="storageModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

window.operateEvents = {
	"click .storageModify": function(e, value, row, index) {
		
		s_storageInfo = row;
		
		storageInfoDetail(row);

		$("#addStorageinfoModalCreate").css('display', "none");
		$("#addStorageinfoModalModify").css('display', "block");

		$('#addStorageinfoModal').modal('show');

		storageInfoDetail(row);
	}
}

function storageInfoDetail(data) {
	
		$("select[name=factoryid]").val(data.factoryid);
		$("input[name=storageid]").val(data.storageid);
		$("input[name=storagename]").val(data.storagename);
		$("input[name=failurerate]").val(data.failurerate);
		$("input[name=recoverytime]").val(data.recoverytime);
		$("input[name=buffer]").val(data.buffer);
		$("select[name=isusable]").val(data.isusable);
}

function refreshStorageInfo() {
	
	$("select[name=factoryid]").val("");
	$("input[name=storageid]").val("");
	$("input[name=storagename]").val("");
	$("input[name=failurerate]").val("");
	$("input[name=recoverytime]").val("");
	$("input[name=buffer]").val("");
	$("select[name=isusable]").val("Y");
	
}