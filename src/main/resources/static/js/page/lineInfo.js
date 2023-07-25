/**
 * 
 */
let c_factory = null;
let s_workerInput = null;

$(function(){
	initSetting();
	setEventListener();
	formatAdvancedSearch();
});

function initSetting() {
	factroy();		// 라인코드 조회
}


 function setEventListener (){

	let $grid = $("#lineinfo");					//조회
	let $gridAddBtn = $("#addLineinfo");			// 라인정보 add 버튼
	let $gridRemoveBtn = $("#removeLineinfo");		// 라인정보 delete 버튼
	let $modalCloseBtn = $("#addLineinfoModalClose");	// 라인정보 모달 close 버튼
	let $modalCreateBtn = $("#addLineinfoModalCreate");	// 라인정보 모달 insert 버튼
	let $modalModifyBtn = $("#addLineinfoModalModify");	// 라인정보 모달 update 버튼 
	
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
		lineinfo();
	});
	
	$gridAddBtn.click(function() {		// 라인정보 add 버튼
		
		$("#addLineinfoModalCreate").css('display', "block");
		$("#addLineinfoModalModify").css('display', "none");

		$('#addLineinfoModal').modal('show');
		
	});
	
	$modalCloseBtn.click(function() {
		$('#addLineinfoModal').modal('hide');
	});
	
	$modalCreateBtn.click(function() {

		let data = {};
		
		data.factoryid = $("select[name=factoryid]").val();
		data.locationid = $("input[name=locationid]").val();
		data.locationname = $("input[name=locationname]").val();
		data.isusable = $("select[name=isusable]").val();
	
		//validation check
		if (data.factoryid == "") {
			alert("공장을 선택해주세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택해주세요.");
			$("select[name=isusable]").focus();
			return;
		} 

		let url = '/location/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#location");
				$table.bootstrapTable('refresh');
				
				$('#addLineinfoModal').modal('hide');
				alert("저장되었습니다.");
				location.reload();
			},
				error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        		alert("라인코드와 공장을 확인해주세요");
	    		}
		});
	});
	
	$modalModifyBtn.click(function() {
		let data = s_workerInput;

		data.factoryid = $("select[name=factoryid]").val();
		data.locationid = $("input[name=locationid]").val();
		data.locationname = $("input[name=locationname]").val();
		data.isusable = $("select[name=isusable]").val();

		//validation check
		if (data.factoryid == "") {
			alert("공장을 선택해주세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택해주세요.");
			$("select[name=isusable]").focus();
			return;
		} 
		
		let url = '/location/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#location");
				$table.bootstrapTable('refresh');
				
				$('#addLineinfoModal').modal('hide');
				alert("수정 되었습니다.");
				location.reload();
			}
		});
	});
	
	$gridRemoveBtn.click(function() {

		let selections = [];

		$grid.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);
		});

		let url = '/location/remove';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#location");
				$table.bootstrapTable('refresh');
				
				$gridRemoveBtn.prop('disabled', true);
				alert("삭제 되었습니다.");
				location.reload();
			}
		});
	});
	
	$factoryCodes = $("#factoryCodes");
};
 
function lineinfo(data) {
	var url = '/location/find';

	var params = {
		start : $("input[name=sLocationdateStart]").val(),
		end : $("input[name=sLocationdateEnd]").val()
	}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#location");
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

function lineinfoOperateFormatter(value, row, index) {
	return [
		'<a class="locationModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

window.operateEvents = {
	"click .locationModify": function(e, value, row, index) {
		
		s_workerInput = row;
		
		lineinfoDetail(row);

		$("#addLineinfoModalCreate").css('display', "none");
		$("#addLineinfoModalModify").css('display', "block");

		$('#addLineinfoModal').modal('show');

		$factoryCodes = $("#factoryCodes");
		$factoryCodes.trigger('change');

		lineinfoDetail(row);
	}
}

function lineinfoDetail(data) {
	$("select[name=factoryid]").val(data.factoryid);
	$("input[name=locationid]").val(data.locationid);
	$("input[name=locationname]").val(data.locationname);
	$("select[name=isusable]").val(data.isusable);
}

function formatAdvancedSearch(){
	return "검색조건";
}