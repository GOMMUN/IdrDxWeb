/**
 * 
 */
let c_factory = null;
let c_equipment = null;
let s_lineInfo = null;

$(function(){
	initSetting();
	setEventListener();
});

function initSetting() {
	
	localStorage.setItem("plant", $("#parameterPlant").val());
	localStorage.setItem("username", $("#parameterUsername").val());
	
	factroy();		// 라인코드 조회
	equipment(); 	// 설비코드 조회
}


 function setEventListener (){

	let $grid = $("#lineinfo");					//조회
	let $gridAddBtn = $("#addLineinfo");			// add 버튼
	let $gridRemoveBtn = $("#removeLineinfo");		// delete 버튼
	let $modalCloseBtn = $("#addLineinfoModalClose");	// 모달 close 버튼
	let $modalCreateBtn = $("#addLineinfoModalCreate");	// 모달 insert 버튼
	let $modalModifyBtn = $("#addLineinfoModalModify");	// 모달 update 버튼 
	
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
		refreshLineInfo();
		$('#addLineinfoModal').modal('hide');
	});
	
	$modalCreateBtn.click(function() {

		let data = {};
		
		data.factoryid = $("select[name=factoryid]").val();
		data.locationid = $("input[name=locationid]").val();
		data.equipmentid = $("select[name=equipmentid]").val();
		data.locationname = $("input[name=locationname]").val();
		data.isusable = $("select[name=isusable]").val();
		data.creator = localStorage.getItem("username");
	
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

		let url = '/lineinfo/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#lineinfo");
				$table.bootstrapTable('refresh');
				refreshLineInfo()
				
				$('#addLineinfoModal').modal('hide');
				alert("저장되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("라인코드와 공장을 확인해주세요");
	    	}
		});
	});
	
	$modalModifyBtn.click(function() {
		let data = s_lineInfo;

		data.factoryid = $("select[name=factoryid]").val();
		data.locationid = $("input[name=locationid]").val();
		data.equipmentid = $("select[name=equipmentid]").val();
		data.locationname = $("input[name=locationname]").val();
		data.isusable = $("select[name=isusable]").val();
		data.eventuser = localStorage.getItem("username");

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
		
		let url = '/lineinfo/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#lineinfo");
				$table.bootstrapTable('refresh');
				refreshLineInfo()
				
				$('#addLineinfoModal').modal('hide');
				alert("수정 되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("라인코드와 공장을 확인해주세요");
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

		let url = '/lineinfo/remove';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#lineinfo");
				$table.bootstrapTable('refresh');
				
				$gridRemoveBtn.prop('disabled', true);
				alert("삭제 되었습니다.");
			}
		});
	});
	
	// modal 
	$factoryCodes = $("#factoryCodes");
	
	$factoryCodes.change(function() {

		let $dropdown1 = $("#equipmentCodes");
		$dropdown1.empty();

		if (c_equipment) {
			$dropdown1.append($("<option/>").val("").text("설비 선택"));
			$.each(c_equipment, function() {
				if ($("select[name=factoryid]").val() == this.factoryid) {
					$dropdown1.append($("<option/>").val(this.equipmentid).text(this.equipmentname));
				}
			});
		} else {
			$dropdown1.append($("<option/>").val("").text("설비 선택"));
		}
	});
};
 
function lineinfo(data) {
	var url = '/lineinfo/find';

	var params = {}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#lineinfo");
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

function equipment(){
	let url = '/equipmentinfo/findByFactoryid';

	c_equipment = null;
	
	$.ajax({
		url: url,
		type: 'GET',
		success: function(data) {
			c_equipment = data;

//			let $dropdown = $("#factoryCodes");
//			$dropdown.empty();
//
//			if (c_factory) {
//				$dropdown.append($("<option/>").val("").text("공장 선택"));
//				$.each(data, function() {
//					$dropdown.append($("<option/>").val(this.code).text(this.value));
//				});
//			} else {
//				$dropdown.append($("<option/>").val("").text("공장 선택"));
//			}
		}
	});
}

function lineinfoOperateFormatter(value, row, index) {
	return [
		'<a class="lineinfoModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

window.operateEvents = {
	"click .lineinfoModify": function(e, value, row, index) {
		
		s_lineInfo = row;
		
		lineinfoDetail(row);

		$("#addLineinfoModalCreate").css('display', "none");
		$("#addLineinfoModalModify").css('display', "block");

		$('#addLineinfoModal').modal('show');
		
		$factoryCodes = $("#factoryCodes");
		$factoryCodes.trigger("change");

		lineinfoDetail(row);
	}
}

function lineinfoDetail(data) {
	
	$("select[name=factoryid]").val(data.factoryid);
	$("input[name=locationid]").val(data.locationid);
	$("select[name=equipmentid]").val(data.equipmentid);
	$("input[name=locationname]").val(data.locationname);
	$("select[name=isusable]").val(data.isusable);
}

function refreshLineInfo() {
	
	$("select[name=factoryid]").val("");
	$("input[name=locationid]").val("");
	$("input[name=locationname]").val("");
	$("select[name=isusable]").val("Y");
	
}