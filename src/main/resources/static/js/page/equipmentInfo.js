/**
 * 
 */
let c_factory = null;
let s_equipmentInfo = null;

$(function(){
	initSetting();
	setEventListener();
});

function initSetting() {
	factroy();		// 코드 조회
}


 function setEventListener (){

	let $grid = $("#equipmentinfo");					//조회
	let $gridAddBtn = $("#addEquipmentInfo");			// add 버튼
	let $gridRemoveBtn = $("#removeEquipmentInfo");		// delete 버튼
	let $modalCloseBtn = $("#addEquipmentInfoModalClose");	// 모달 close 버튼
	let $modalCreateBtn = $("#addEquipmentInfoModalCreate");	// 모달 insert 버튼
	let $modalModifyBtn = $("#addEquipmentInfoModalModify");	// 모달 update 버튼 
	
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
		equipmentinfo();
	});
	
	$gridAddBtn.click(function() {		// add 버튼
	
		$("#addEquipmentInfoModalCreate").css('display', "block");
		$("#addEquipmentInfoModalModify").css('display', "none");

		$('#addEquipmentInfoModal').modal('show');
		
	});
	
	$modalCloseBtn.click(function() {
		refreshEquipmentInfo();
		$('#addEquipmentInfoModal').modal('hide');
	});
	
	$modalCreateBtn.click(function() {

		let data = {};
		
		data.factoryid = $("select[name=factoryid]").val();
		data.equipmentid = $("input[name=equipmentid]").val();
		data.equipmentname = $("input[name=equipmentname]").val();
		data.failurerate = $("input[name=failurerate]").val();
		data.recoverytime = $("input[name=recoverytime]").val();
		data.errorrate = $("input[name=errorrate]").val();
		data.buffer = $("input[name=buffer]").val();
		data.isusable = $("select[name=isusable]").val();
	
		//validation check
		if (data.factoryid == "") {
			alert("공장을 선택해주세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (isNaN(data.failurerate) || data.failurerate == "") {
			alert("고장률을 확인해주세요.");
			$("input[name=failurerate]").focus();
			return;
		} else if (isNaN(data.recoverytime) || data.recoverytime == "") {
			alert("복구시간을 확인해주세요.");
			$("input[name=recoverytime]").focus();
			return;
		} else if (isNaN(data.errorrate) || data.errorrate == "") {
			alert("불량률을 확인해주세요.");
			$("input[name=errorrate]").focus();
			return;
		} else if (isNaN(data.buffer) || data.buffer == "") {
			alert("Buffer를 확인해주세요.");
			$("input[name=buffer]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택해주세요.");
			$("select[name=isusable]").focus();
			return;
		} 

		let url = '/equipmentinfo/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#equipmentinfo");
				$table.bootstrapTable('refresh');
				refreshEquipmentInfo()
				
				$('#addEquipmentInfoModal').modal('hide');
				alert("저장되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("장비코드와 공장을 확인해주세요");
	    	}
		});
	});
	
	$modalModifyBtn.click(function() {
		
		let data = s_equipmentInfo;

		data.factoryid = $("select[name=factoryid]").val();
		data.equipmentid = $("input[name=equipmentid]").val();
		data.equipmentname = $("input[name=equipmentname]").val();
		data.failurerate = $("input[name=failurerate]").val();
		data.recoverytime = $("input[name=recoverytime]").val();
		data.errorrate = $("input[name=errorrate]").val();
		data.buffer = $("input[name=buffer]").val();
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
		} else if (isNaN(data.failurerate) || data.failurerate == "") {
			alert("고장률을 확인해주세요.");
			$("input[name=failurerate]").focus();
			return;
		} else if (isNaN(data.recoverytime) || data.recoverytime == "") {
			alert("복구시간을 확인해주세요.");
			$("input[name=recoverytime]").focus();
			return;
		} else if (isNaN(data.errorrate) || data.errorrate == "") {
			alert("불량률을 확인해주세요.");
			$("input[name=errorrate]").focus();
			return;
		}  else if (isNaN(data.buffer) || data.buffer == "") {
			alert("Buffer를 확인해주세요.");
			$("input[name=buffer]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택해주세요.");
			$("select[name=isusable]").focus();
			return;
		}  
		
		let url = '/equipmentinfo/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#equipmentinfo");
				$table.bootstrapTable('refresh');
				refreshEquipmentInfo()
				
				$('#addEquipmentInfoModal').modal('hide');
				alert("수정 되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("장비코드와 공장을 확인해주세요");
	    	}
		});
		
	});
	
	$gridRemoveBtn.click(function() {

		let selections = [];

		$grid.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);
		});

		let url = '/equipmentinfo/remove';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#equipmentinfo");
				$table.bootstrapTable('refresh');
				
				$gridRemoveBtn.prop('disabled', true);
				alert("비사용으로 변경되였습니다.");
			}
		});
	});
};
 
function equipmentinfo(data) {
	var url = '/equipmentinfo/find';

	var params = {}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#equipmentinfo");
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

function equipmentInfoOperateFormatter(value, row, index) {
	return [
		'<a class="equipmentModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

window.operateEvents = {
	"click .equipmentModify": function(e, value, row, index) {
		
		s_equipmentInfo = row;
		
		equipmentInfoDetail(row);

		$("#addEquipmentInfoModalCreate").css('display', "none");
		$("#addEquipmentInfoModalModify").css('display', "block");

		$('#addEquipmentInfoModal').modal('show');

		equipmentInfoDetail(row);
	}
}

function equipmentInfoDetail(data) {
	
		$("select[name=factoryid]").val(data.factoryid);
		$("input[name=equipmentid]").val(data.equipmentid);
		$("input[name=equipmentname]").val(data.equipmentname);
		$("input[name=failurerate]").val(data.failurerate);
		$("input[name=recoverytime]").val(data.recoverytime);
		$("input[name=errorrate]").val(data.errorrate);
		$("input[name=buffer]").val(data.buffer);
		$("select[name=isusable]").val(data.isusable);
}

function refreshEquipmentInfo() {
	
		$("select[name=factoryid]").val("");
		$("input[name=equipmentid]").val("");
		$("input[name=equipmentname]").val("");
		$("input[name=failurerate]").val("");
		$("input[name=recoverytime]").val("");
		$("input[name=errorrate]").val("");
		$("input[name=buffer]").val("");
		$("select[name=isusable]").val("Y");
	
}