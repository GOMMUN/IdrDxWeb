/**
 * 
 */
let s_datasetDetail = null;

$(function(){
	setEventListener();
});

 function setEventListener (){

	let $grid = $("#datasetdetail");					//조회
	let $gridAddBtn = $("#addDatasetDetail");			// 장비정보 add 버튼
	let $gridRemoveBtn = $("#removeDatasetDetail");		// 장비정보 delete 버튼
	let $modalCloseBtn = $("#addDatasetDetailModalClose");	// 장비정보 모달 close 버튼
	let $modalCreateBtn = $("#addDatasetDetailModalCreate");	// 장비정보 모달 insert 버튼
	let $modalModifyBtn = $("#addDatasetDetailModalModify");	// 장비정보 모달 update 버튼 
	
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
		datasetdetail();
	});
	
	$gridAddBtn.click(function() {		// 창고정보 add 버튼
		
		$("#addDatasetDetailModalCreate").css('display', "block");
		$("#addDatasetDetailModalModify").css('display', "none");

		$('#addDatasetDetailModal').modal('show');
		
	});
	
	$modalCloseBtn.click(function() {
		refreshDatasetDetail();
		$('#addDatasetDetailModal').modal('hide');
	});
	
	$modalCreateBtn.click(function() {

		let data = {};
		
		data.activityid = $("input[name=activityid]").val();
		data.activitynm = $("input[name=activitynm]").val();
		data.pqcdid = $("select[name=pqcdid]").val();
		data.isusable = $("select[name=isusable]").val();
	
		//validation check
		 if (data.activityid == "") {
			alert("분류 DataSet ID를 입력하세요.");
			$("input[name=activityid]").focus();
			return;
		} else if (data.activitynm == "") {
			alert("분류 DataSet Name을 입력하세요.");
			$("input[name=activitynm]").focus();
			return;
		} else if (data.pqcdid == "") {
			alert("분류ID를 선택하세요.");
			$("select[name=pqcdid]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택하세요.");
			$("select[name=isusable]").focus();
			return;
		}

		let url = '/datasetdetail/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#datasetdetail");
				$table.bootstrapTable('refresh');
				
				$('#addDatasetDetailModal').modal('hide');
				alert("저장되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("DataSet ID를 확인해주세요");
	    	}
		});
	});
	
	$modalModifyBtn.click(function() {
		let data = s_datasetDetail;

		data.activityid = $("input[name=activityid]").val();
		data.activitynm = $("input[name=activitynm]").val();
		data.pqcdid = $("select[name=pqcdid]").val();
		data.isusable = $("select[name=isusable]").val();

		//validation check
		 if (data.activityid == "") {
			alert("분류 DataSet ID를 입력하세요.");
			$("input[name=activityid]").focus();
			return;
		} else if (data.activitynm == "") {
			alert("분류 DataSet Name을 입력하세요.");
			$("input[name=activitynm]").focus();
			return;
		} else if (data.pqcdid == "") {
			alert("분류ID를 선택하세요.");
			$("select[name=pqcdid]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택하세요.");
			$("select[name=isusable]").focus();
			return;
		}
 
		
		let url = '/datasetdetail/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#datasetdetail");
				$table.bootstrapTable('refresh');
				refreshDatasetDetail()
				
				$('#addDatasetDetailModal').modal('hide');
				alert("수정 되었습니다.");
			}
		});
	});
	
	$gridRemoveBtn.click(function() {

		let selections = [];

		$grid.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);
		});

		let url = '/datasetdetail/remove';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#datasetdetail");
				$table.bootstrapTable('refresh');
				
				$gridRemoveBtn.prop('disabled', true);
				alert("비사용으로 변경되였습니다.");
			}
		});
	});
};
 
function datasetdetail(data) {
	var url = '/datasetdetail/find';

	var params = {}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#datasetdetail");
		$table.bootstrapTable('removeAll');
		$table.bootstrapTable('append', res);
	})
}



function datasetDetailOperateFormatter(value, row, index) {
	return [
		'<a class="datasetDetailModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

window.operateEvents = {
	"click .datasetDetailModify": function(e, value, row, index) {
		
		s_datasetDetail = row;
		
		datasetDetailDetail(row);

		$("#addDatasetDetailModalCreate").css('display', "none");
		$("#addDatasetDetailModalModify").css('display', "block");

		$('#addDatasetDetailModal').modal('show');

		datasetDetailDetail(row);
	}
}

function datasetDetailDetail(data) {
	
		$("input[name=activityid]").val(data.activityid);
		$("input[name=activitynm]").val(data.activitynm);
		$("select[name=pqcdid]").val(data.pqcdid);
		$("select[name=isusable]").val(data.isusable);
}

function refreshDatasetDetail() {
	
		$("input[name=activityid]").val("");
		$("input[name=activitynm]").val("");
		$("select[name=pqcdid]").val("");
		$("select[name=isusable]").val("");
	
}