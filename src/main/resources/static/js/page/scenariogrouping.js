/**
 * 
 */
let s_scenarioList = null;
let s_scenarioGroup = null;

$(function(){
	
	setEventListener();
});

function setEventListener (){
	let $grid = $("#scenariolist");
	let $gridAddBtnL = $("#addScenarioList");		
	let $gridRemoveBtnL = $("#removeScenarioList");	
	let $modalCloseBtnL = $("#addScenarioListModalClose");
	let $modalCreateBtnL = $("#addScenarioListModalCreate");
	let $modalModifyBtnL = $("#addScenarioListModalModify");
				
	let $gridGroup = $("#scenariogroup");	
	let $gridAddBtnG = $("#addScenarioGroup");		
	let $gridRemoveBtnG = $("#removeScenarioGroup");	
	let $modalCloseBtnG = $("#addScenarioGroupModalClose");
	let $modalCreateBtnG = $("#addScenarioGroupModalCreate");
	let $modalModifyBtnG = $("#addScenarioGroupModalModify");
	
	$grid.on('check.bs.table', function (row, $element, field) {	
	
		if ($grid.bootstrapTable('getSelections').length == 1) {
			s_scenarioGroup = $element;
		} else {
			s_scenarioGroup = null;
		}

		if (s_scenarioGroup) {
			scenarioGroup1($element);
		}
		
		scenarioGroupDetail($element);
	});
	
	$grid.on('check.bs.table', function(row, $element) { //
		$gridRemoveBtnL.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$grid.on('uncheck.bs.table', function(row, $element) {
		$gridRemoveBtnL.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('check-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtnL.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('uncheck-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtnL.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$grid.on('page-change.bs.table', function(number, size) {
		$gridRemoveBtnL.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$grid.on('check.bs.table', function(row, $element) { //
		$gridAddBtnG.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$grid.on('uncheck.bs.table', function(row, $element) {
		$gridAddBtnG.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('check-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridAddBtnG.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});

	$grid.on('uncheck-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridAddBtnG.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$grid.on('page-change.bs.table', function(number, size) {
		$gridAddBtnG.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$grid.on('refresh.bs.table', function(params) {//
		scenarioList();
	});
	
	$gridGroup.on('check.bs.table', function(row, $element) { //axis조회
		$gridRemoveBtnG.prop('disabled', !$gridGroup.bootstrapTable('getSelections').length)
	});
	
	$gridGroup.on('uncheck.bs.table', function(row, $element) {
		$gridRemoveBtnG.prop('disabled', !$gridGroup.bootstrapTable('getSelections').length)
	});

	$gridGroup.on('check-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtnG.prop('disabled', !$gridGroup.bootstrapTable('getSelections').length)
	});

	$gridGroup.on('uncheck-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtnG.prop('disabled', !$gridGroup.bootstrapTable('getSelections').length)
	});
	
	$gridGroup.on('page-change.bs.table', function(number, size) {
		$gridRemoveBtnG.prop('disabled', !$gridGroup.bootstrapTable('getSelections').length)
	});
	
	$gridGroup.on('refresh.bs.table', function(params) {
		scenarioGroup2();
	});
	
	$gridAddBtnL.click(function() {		
		refreshScenarioList();	
	
		$("#addScenarioListModalCreate").css('display', "block");
		$("#addScenarioListModalModify").css('display', "none");

		$('#addScenarioListModal').modal('show');
		
	});
	
	$modalCloseBtnL.click(function() {
		refreshScenarioList();
		$('#addScenarioListModal').modal('hide');
	});
	
	$modalCreateBtnL.click(function() {

		let data = {};
		
		data.scenarioid = $("input[name=scenarioid]").val();
		data.scenarionm = $("input[name=scenarionm]").val();
		data.axisid = $("input[name=axisid]").val();
		data.groupingid = $("input[name=groupingid]").val();
		data.isusable = $("select[name=isusable]").val();
	
		//validation check
		if (data.scenarioid == "") {
			alert("시나리오ID를 입력하세요.");
			$("input[name=scenarioid]").focus();
			return;
		} else if (data.scenarionm == "") {
			alert("시나리오명을 입력하세요.");
			$("input[name=scenarionm]").focus();
			return;
		}  else if (data.axisid == "") {
			alert("분류 축(Axis)을 입력하세요.");
			$("input[name=axisid]").focus();
			return;
		}  else if (data.groupingid == "") {
			alert("1st DataSet을 입력하세요.");
			$("input[name=groupingid]").focus();
			return;
		}  else if (data.isusable == "") {
			alert("사용여부를 선택해주세요.");
			$("select[name=isusable]").focus();
			return;
		} 

		let url = '/scenario/create1';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#scenariolist");
				$table.bootstrapTable('refresh');
				refreshScenarioList()
				
				$('#addScenarioListModal').modal('hide');
				alert("저장되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("그룹핑ID와 그룹핑Name을 확인해주세요");
	    	}
		});
	});
	
	$modalModifyBtnL.click(function() {

		let data = s_scenarioList;
		
		data.scenarioid = $("input[name=scenarioid]").val();
		data.scenarionm = $("input[name=scenarionm]").val();
		data.axisid = $("input[name=axisid]").val();
		data.groupingid = $("input[name=groupingid]").val();
		data.isusable = $("select[name=isusable]").val();
	
		//validation check
		if (data.scenarioid == "") {
			alert("시나리오ID를 입력하세요.");
			$("input[name=scenarioid]").focus();
			return;
		} else if (data.scenarionm == "") {
			alert("시나리오명을 입력하세요.");
			$("input[name=scenarionm]").focus();
			return;
		}  else if (data.axisid == "") {
			alert("분류 축(Axis)을 입력하세요.");
			$("input[name=axisid]").focus();
			return;
		}  else if (data.groupingid == "") {
			alert("1st DataSet을 입력하세요.");
			$("input[name=groupingid]").focus();
			return;
		}  else if (data.isusable == "") {
			alert("사용여부를 선택해주세요.");
			$("select[name=isusable]").focus();
			return;
		}  

		let url = '/scenario/modify1';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#scenariolist");
				$table.bootstrapTable('refresh');
				refreshScenarioList()
				
				$('#addScenarioListModal').modal('hide');
				alert("수정되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("시나리오ID와 시나리오명을 확인해주세요");
	    	}
		});
	});
	
	$gridRemoveBtnL.click(function() {
		
		if(!confirm('선택한 데이터를 삭제하시겠습니까?')){
            return false;
        }

		let selections = [];

		$grid.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);
		});

		let url = '/scenario/remove1';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#scenariolist");
				$table.bootstrapTable('refresh');
				
				$gridRemoveBtnL.prop('disabled', true);
				//alert("비사용으로 변경되였습니다.");
			}
		});
	});
	
	$gridAddBtnG.click(function() {			
	
		$("#addScenarioGroupModalCreate").css('display', "block");
		$("#addScenarioGroupModalModify").css('display', "none");

		$('#addScenarioGroupModal').modal('show');
		
	});
	
	$modalCloseBtnG.click(function() {
		refreshScenarioGroup();
		$('#addScenarioGroupModal').modal('hide');
	});
	
	$modalCreateBtnG.click(function() {

		let data = {};
		
		data.scenarioid = $("input[name=scenarioid]").val();
		data.pqcdid = $("select[name=pqcdid]").val();
		data.activityid = $("input[name=activityid]").val();
		data.isusable = $("select[name=isusable]").val();
	
		//validation check
		if (data.scenarioid == "") {
			alert("시나리오 ID를 입력하세요.");
			$("input[name=scenarioid]").focus();
			return;
		} else if (data.pqcdid == "") {
			alert("주/야 구분을 선택해주세요.");
			$("select[name=pqcdid]").focus();
			return;
		} else if (data.activityid == "") {
			alert("Activity ID를 입력하세요.");
			$("input[name=activityid]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택해주세요.");
			$("select[name=isusable]").focus();
			return;
		}

		let url = '/scenario/create2';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#scenariogroup");
				$table.bootstrapTable('refresh');
				refreshScenarioGroup()
				
				$('#addScenarioGroupModal').modal('hide');
				alert("저장되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("주/야 구분과 Activity ID를 확인해주세요");
	    	}
		});
	});
	
	$modalModifyBtnG.click(function() {

		let data = s_scenarioGroup;
		
		data.scenarioid = $("input[name=scenarioid]").val();
		data.pqcdid = $("select[name=pqcdid]").val();
		data.activityid = $("input[name=activityid]").val();
		data.isusable = $("select[name=isusable]").val();
	
		//validation check
		if (data.pqcdid == "") {
			alert("주/야 구분을 선택해주세요.");
			$("select[name=pqcdid]").focus();
			return;
		} else if (data.activityid == "") {
			alert("Activity ID를 입력해주세요.");
			$("input[name=activityid]").focus();
			return;
		} 

		let url = '/scenario/modify2';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#scenariogroup");
				$table.bootstrapTable('refresh');
				refreshScenarioGroup()
				
				$('#addScenarioGroupModal').modal('hide');
				alert("수정되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("주/야 구분과 Activity ID를 확인해주세요");
	    	}
		});
	});
	
	$gridRemoveBtnG.click(function() {
		
		if(!confirm('선택한 데이터를 삭제하시겠습니까?')){
            return false;
        }

		let selections = [];

		$gridGroup.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);
		});

		let url = '/scenario/remove2';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#scenariogroup");
				$table.bootstrapTable('refresh');
				
				$gridRemoveBtnG.prop('disabled', true);
				//alert("비사용으로 변경되였습니다.");
			}
		});
	});	
};

function scenarioList(data) {
	var url = '/scenario/find1';

	var params = {}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#scenariolist");
		$table.bootstrapTable('removeAll');
		$table.bootstrapTable('append', res);
	})
}

function scenarioGroup1(data) {
	var url = '/scenario/find2';

	var params = {
		scenarioid: data.scenarioid,
	}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#scenariogroup");
		$table.bootstrapTable('removeAll');
		$table.bootstrapTable('append', res);
	})
}

function scenarioGroup2(data) {
	var url = '/scenario/find2';

	var params = {}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#scenariogroup");
		$table.bootstrapTable('removeAll');
		$table.bootstrapTable('append', res);
	})
}

function scenarioListOperateFormatter(value, row, index) {
	return [
		'<a class="scenarioListModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

function scenarioGroupOperateFormatter(value, row, index) {
	return [
		'<a class="scenarioGroupModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

window.operateEvents = {
	"click .scenarioListModify": function(e, value, row, index) {
		
		s_scenarioList = row;
		
		scenarioListDetail(row);

		$("#addScenarioListModalCreate").css('display', "none");
		$("#addScenarioListModalModify").css('display', "block");

		$('#addScenarioListModal').modal('show');

		scenarioListDetail(row);
	}, 
	"click .scenarioGroupModify": function(e, value, row, index) {
		
		s_scenarioGroup = row;
		
		scenarioGroupDetail(row);

		$("#addScenarioGroupModalCreate").css('display', "none");
		$("#addScenarioGroupModalModify").css('display', "block");

		$('#addScenarioGroupModal').modal('show');

		scenarioGroupDetail(row);
	}
}

function scenarioListDetail(data){ //Axis 값 수정 불가

		$("input[name=scenarioid]").val(data.scenarioid);
		$("input[name=scenarionm]").val(data.scenarionm);
		$("input[name=axisid]").val(data.axisid);
		$("input[name=groupingid]").val(data.groupingid);
		$("input[name=isusable]").val(data.isusable);

}

function refreshScenarioList() {
	
		$("input[name=scenarioid]").val("");
		$("input[name=scenarionm]").val("");
		$("input[name=axisid]").val("");
		$("input[name=groupingid]").val("");
		$("select[name=isusable]").val("Y");
}

function scenarioGroupDetail(data){ //Axis 값 수정 불가

		$("input[name=scenarioid]").val(data.scenarioid);
		$("select[name=pqcdid]").val(data.pqcdid);
		$("input[name=activityid]").val(data.activityid);
		$("input[name=isusable]").val(data.isusable);

}

function refreshScenarioGroup() {
	
		$("select[name=pqcdid]").val("");
		$("input[name=activityid]").val("");
		$("select[name=isusable]").val("Y");
}