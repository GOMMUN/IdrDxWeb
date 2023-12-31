/**
 * 
 */
let c_factory = null;
let s_materialMaster = null;

$(function(){
	initSetting();
	setEventListener();
});

function initSetting() {
	factroy();		// 코드 조회
	
	localStorage.setItem("plant", $("#parameterPlant").val());
	localStorage.setItem("username", $("#parameterUsername").val());
}


 function setEventListener (){

	let $grid = $("#materialmaster");					//조회
	let $gridAddBtn = $("#addMaterialMaster");			// add 버튼
	let $gridRemoveBtn = $("#removeMaterialMaster");		// delete 버튼
	let $modalCloseBtn = $("#addMaterialMasterModalClose");	// 모달 close 버튼
	let $modalCreateBtn = $("#addMaterialMasterModalCreate");	// 모달 insert 버튼
	let $modalModifyBtn = $("#addMaterialMasterModalModify");	// 모달 update 버튼 
	
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
		materialmaster();
	});
	
	$gridAddBtn.click(function() {		// add 버튼
	
		$("#materialForm input[name='materialid']").prop("disabled", false);
        $("#materialForm select[name='factoryid']").prop("disabled", false);
		
		$("#addMaterialMasterModalCreate").css('display', "block");
		$("#addMaterialMasterModalModify").css('display', "none");

		$('#addMaterialMasterModal').modal('show');
		
	});
	
	$modalCloseBtn.click(function() {
		refreshMaterialMaster();
		$('#addMaterialMasterModal').modal('hide');
	});
	
	$modalCreateBtn.click(function() {

		let data = {};
		
		data.factoryid = $("select[name=factoryid]").val();
		data.materialid = $("input[name=materialid]").val();
		data.materialname = $("input[name=materialname]").val();		
		data.materialtype = $("input[name=materialtype]").val();
		data.materialkind = $("input[name=materialkind]").val();
		data.materialunit = $("input[name=materialunit]").val();
		data.receivinginspection = $("select[name=receivinginspection]").val();
		data.isusable = $("select[name=isusable]").val();
		data.creator = localStorage.getItem("username");

	
		//validation check
		if (data.factoryid == "") {
			alert("공장을 선택해주세요.");
			$("select[name=factoryid]").focus();
			return;
		}else if (data.materialid == "") {
			alert("자재마스터ID를 입력하세요.");
			$("input[name=materialid]").focus();
			return;
		} else if (data.materialname == "") {
			alert("자재명을 입력하세요.");
			$("input[name=materialname]").focus();
			return;
		} else if (data.receivinginspection == "") {
			alert("수입검사 여부를 선택해주세요.");
			$("select[name=receivinginspection]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택해주세요.");
			$("select[name=isusable]").focus();
			return;
		} 

		let url = '/materialmaster/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#materialmaster");
				$table.bootstrapTable('refresh');
				refreshMaterialMaster()
				
				$('#addMaterialMasterModal').modal('hide');
				alert("저장되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("자재마스터ID와 공장을 확인해주세요");
	    	}
		});
	});
	
	$modalModifyBtn.click(function() {
		let data = s_materialMaster;

		data.factoryid = $("select[name=factoryid]").val();
		data.materialid = $("input[name=materialid]").val();
		data.materialname = $("input[name=materialname]").val();		
		data.materialtype = $("input[name=materialtype]").val();
		data.materialkind = $("input[name=materialkind]").val();
		data.materialunit = $("input[name=materialunit]").val();
		data.receivinginspection = $("select[name=receivinginspection]").val();
		data.isusable = $("select[name=isusable]").val();
		data.eventuser = localStorage.getItem("username");
		
		//validation check
		if (data.factoryid == "") {
			alert("공장을 선택해주세요.");
			$("select[name=factoryid]").focus();
			return;
		}else if (data.materialid == "") {
			alert("자재마스터ID를 입력하세요.");
			$("input[name=materialid]").focus();
			return;
		} else if (data.materialname == "") {
			alert("자재명을 입력하세요.");
			$("input[name=materialname]").focus();
			return;
		} else if (data.receivinginspection == "") {
			alert("수입검사 여부를 선택해주세요.");
			$("select[name=receivinginspection]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택해주세요.");
			$("select[name=isusable]").focus();
			return;
		} 
		
		let url = '/materialmaster/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#materialmaster");
				$table.bootstrapTable('refresh');
				refreshMaterialMaster()
				
				$('#addMaterialMasterModal').modal('hide');
				alert("수정 되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("자재마스터ID와 공장을 확인해주세요");
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

		let url = '/materialmaster/remove';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#materialmaster");
				$table.bootstrapTable('refresh');
				
				$gridRemoveBtn.prop('disabled', true);
				alert("삭제 되었습니다.");
			}
		});
	});
};
 
function materialmaster(data) {
	var url = '/materialmaster/find';

	var params = {}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#materialmaster");
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

function materialMasterOperateFormatter(value, row, index) {
	return [
		'<a class="materialMasterModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

window.operateEvents = {
	"click .materialMasterModify": function(e, value, row, index) {
		
		s_materialMaster = row;
		
		materialMasterDetail(row);
		$("#materialForm input[name=materialid]").prop("disabled", true);
        $("#materialForm select[name=factoryid]").prop("disabled", true);

		$("#addMaterialMasterModalCreate").css('display', "none");
		$("#addMaterialMasterModalModify").css('display', "block");

		$('#addMaterialMasterModal').modal('show');

		materialMasterDetail(row);
	}
}

function materialMasterDetail(data) {
	
		$("select[name=factoryid]").val(data.factoryid);
		$("input[name=materialid]").val(data.materialid);
		$("input[name=materialname]").val(data.materialname);		
		$("input[name=materialtype]").val(data.materialtype);
		$("input[name=materialkind]").val(data.materialkind);
		$("input[name=materialunit]").val(data.materialunit);
		$("select[name=receivinginspection]").val(data.receivinginspection);
		$("select[name=isusable]").val(data.isusable);
}

function refreshMaterialMaster() {
	
		$("select[name=factoryid]").val("");
		$("input[name=materialid]").val("");
		$("input[name=materialname]").val("");		
		$("input[name=materialtype]").val("");
		$("input[name=materialkind]").val("");
		$("input[name=materialunit]").val("");
		$("select[name=receivinginspection]").val("");
		$("select[name=isusable]").val("Y");
	
}