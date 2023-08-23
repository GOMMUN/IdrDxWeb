/**
 * 
 */
let s_dvcModel = null;

$(function(){
	
	setEventListener();
});

function setEventListener (){
	let $grid = $("#axis");						//axis조회
	let $gridGroup = $("#datasetgroup");		//group조회
	let $gridAddBtn = $("#addDvcModel");		
	let $gridRemoveBtn = $("#removeDvcModel");	//삭제
	let $modalCloseBtn = $("#addDvcModelModalClose");
	let $modalCreateBtn = $("#addDvcModelModalCreate");
	let $modalModifyBtn = $("#addDvcModelModalModify");
	
	$grid.on('check.bs.table', function (row, $element, field) {	//axis조회
	
		if ($grid.bootstrapTable('getSelections').length == 1) {
			s_dvcModel = $element;
		} else {
			s_dvcModel = null;
		}

		if (s_dvcModel) {
			dvcModel1($element);
		}
		
		dvcModelDetail($element);
	});
	
	$gridGroup.on('check.bs.table', function(row, $element) { //axis조회
		$gridRemoveBtn.prop('disabled', !$gridGroup.bootstrapTable('getSelections').length)
	});
	
	$gridGroup.on('uncheck.bs.table', function(row, $element) {
		$gridRemoveBtn.prop('disabled', !$gridGroup.bootstrapTable('getSelections').length)
	});

	$gridGroup.on('check-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$gridGroup.bootstrapTable('getSelections').length)
	});

	$gridGroup.on('uncheck-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$gridGroup.bootstrapTable('getSelections').length)
	});
	
	$gridGroup.on('page-change.bs.table', function(number, size) {
		$gridRemoveBtn.prop('disabled', !$gridGroup.bootstrapTable('getSelections').length)
	});
	
	$gridGroup.on('refresh.bs.table', function(params) {
		dvcModel2();
	});
	
	$gridAddBtn.click(function() {			
	
		$("#addDvcModelModalCreate").css('display', "block");
		$("#addDvcModelModalModify").css('display', "none");

		$('#addDvcModelModal').modal('show');
		
	});
	
	$modalCloseBtn.click(function() {
		refreshDvcModel();
		$('#addDvcModelModal').modal('hide');
	});
	
	$modalCreateBtn.click(function() {

		let data = {};
		
		data.axisid = $("input[name=axisid]").val();
		data.axisnm = $("input[name=axisnm]").val();
		data.groupingid = $("input[name=groupingid]").val();
		data.groupingnm = $("input[name=groupingnm]").val();
		data.isusable = $("select[name=isusable]").val();
	
		//validation check
		if (data.groupingid == "") {
			alert("그룹핑ID 를 입력하세요.");
			$("input[name=groupingid]").focus();
			return;
		}  else if (data.groupingnm == "") {
			alert("그룹핑Name 를 입력하세요.");
			$("input[name=groupingnm]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택하세요.");
			$("select[name=isusable]").focus();
			return;
		}

		let url = '/dvcmodel/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#datasetgroup");
				$table.bootstrapTable('refresh');
				refreshDvcModel()
				
				$('#addDvcModelModal').modal('hide');
				alert("저장되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("그룹핑ID와 그룹핑Name을 확인해주세요");
	    	}
		});
	});
	
	$modalModifyBtn.click(function() {

		let data = s_dvcModel;
		
		data.axisid = $("input[name=axisid]").val();
		data.axisnm = $("input[name=axisnm]").val();
		data.groupingid = $("input[name=groupingid]").val();
		data.groupingnm = $("input[name=groupingnm]").val();
		data.isusable = $("select[name=isusable]").val();
	
		//validation check
		if (data.groupingid == "") {
			alert("그룹핑ID 를 입력하세요.");
			$("input[name=groupingid]").focus();
			return;
		}  else if (data.groupingnm == "") {
			alert("그룹핑Name 를 입력하세요.");
			$("input[name=groupingnm]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택하세요.");
			$("select[name=isusable]").focus();
			return;
		}

		let url = '/dvcmodel/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#datasetgroup");
				$table.bootstrapTable('refresh');
				refreshDvcModel()
				
				$('#addDvcModelModal').modal('hide');
				alert("수정되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("그룹핑ID와 그룹핑Name을 확인해주세요");
	    	}
		});
	});
	
	$gridRemoveBtn.click(function() {

		let selections = [];

		$gridGroup.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);
		});

		let url = '/dvcmodel/remove';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#datasetgroup");
				$table.bootstrapTable('refresh');
				
				$gridRemoveBtn.prop('disabled', true);
				//alert("비사용으로 변경되였습니다.");
			}
		});
	});	
};

function dvcModel1(data) {
	var url = '/dvcmodel/findGroup';

	var params = {
		axisid: data.axisid,
	}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#datasetgroup");
		$table.bootstrapTable('removeAll');
		$table.bootstrapTable('append', res);
	})
}

function dvcModel2(data) {
	var url = '/dvcmodel/findGroup';

	var params = {}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#datasetgroup");
		$table.bootstrapTable('removeAll');
		$table.bootstrapTable('append', res);
	})
}


function dvcModelOperateFormatter(value, row, index) {
	return [
		'<a class="dvcModelModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

window.operateEvents = {
	"click .dvcModelModify": function(e, value, row, index) {
		
		s_dvcModel = row;
		
		dvcModelDetail(row);

		$("#addDvcModelModalCreate").css('display', "none");
		$("#addDvcModelModalModify").css('display', "block");

		$('#addDvcModelModal').modal('show');

		dvcModelDetail(row);
	}
}

function dvcModelDetail(data){ //Axis 값 수정 불가

		$("input[name=axisid]").val(data.axisid);
		$("input[name=axisnm]").val(data.axisnm);
		$("input[name=groupingid]").val(data.groupingid);
		$("input[name=groupingnm]").val(data.groupingnm);
		$("select[name=isusable]").val(data.isusable);

}

function refreshDvcModel() {
	
		$("input[name=groupingid]").val("");
		$("input[name=groupingnm]").val("");
		$("select[name=isusable]").val("Y");
}

 