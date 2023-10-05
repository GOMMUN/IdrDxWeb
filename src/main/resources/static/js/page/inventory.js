/**
 * 
 */
let c_factory = null;
let c_storage = null;
let c_material = null;

let s_inventory = null;

$(function() {
	initSetting();
	setEventListener();
	formatAdvancedSearch();
});

function initSetting() {
	
	localStorage.setItem("plant", $("#parameterPlant").val());
	localStorage.setItem("username", $("#parameterUsername").val());
	
	$("input[name=inventorydate]").datepicker({
		format: "yyyy-mm-dd",
		autoclose: true,
		language: "ko"
	});
	
//	$("input[name=sInventorydateStart]").datepicker({
//		format: "yyyy-mm-dd",
//		autoclose: true,
//		language: "ko"
//	});
//	
//	$("input[name=sInventorydateEnd]").datepicker({
//		format: "yyyy-mm-dd",
//		autoclose: true,
//		language: "ko"
//	});


	code();
}

function code() {
	factroy();		// 공장코드 조회
	storage();
	material();
}

// Jquery에서 해당 함수명이 있으면 자동으로 호출
function setEventListener() {

	setInventoryEventListener();		// 작업일보 이벤트 리스너
}

// 작업일보 이벤트
function setInventoryEventListener() {
	let $grid = $("#inventory");							// 작업일보 그리드
	let $gridAddBtn = $("#addInventory");					// 작업일보 그리드 add 버튼
	let $gridRemoveBtn = $("#removeInventory");			// 작업일보 그리드 delete 버튼		
	let $modalCloseBtn = $("#addInventoryModalClose");	// 작업일보 모달 close 버튼
	let $modalCreateBtn = $("#addInventoryModalCreate");	// 작업일보 모달 insert 버튼
	let $modalModifyBtn = $("#addInventoryModalModify");	// 작업일보 모달 update 버튼

	$grid.on('check.bs.table', function(row, $element) {
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
		inventory();
	});
//	
//	$grid.on('load-success.bs.table', function(data) {
//		debugger;
//	});
//	
	

	$gridAddBtn.click(function() {
		
		$("select[name=factoryid]").val("");
		$("select[name=storageid]").val("");
		$("select[name=materialid]").val("");
		$("input[name=qty]").val("");
		$("input[name=inventorydate]").val("");

//		resetInventory();

		$("#addInventoryModalCreate").css('display', "block");
		$("#addInventoryModalModify").css('display', "none");

		$('#addInventoryModal').modal('show');
	});

	$modalCloseBtn.click(function() {
		$('#addInventoryModal').modal('hide');
	});

	$modalCreateBtn.click(function() {
		
		let data = {};
		
		data.factoryid = $("select[name=factoryid]").val();
		data.storageid = $("select[name=storageid]").val();
		data.materialid = $("select[name=materialid]").val();
		data.qty = $("input[name=qty]").val();
		data.inventorydate = $("input[name=inventorydate]").val();
		data.creator = localStorage.getItem("username");
	
		//validation check
		if (data.factoryid == "") {
			alert("공장을 선택해주세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.storageid == "") {
			alert("창고를 선택해주세요.");
			$("select[name=storageid]").focus();
			return;
		} else if (data.materialid == "") {
			alert("자재를 선택해주세요.");
			$("select[name=materialid]").focus();
			return;
		} else if (data.qty == "") {
			alert("수량을 입력해주세요.");
			$("input[name=groupid]").focus();
			return;
		}  else if (data.qty.indexOf('-') != -1) {
			alert("수량은 음수값은 입력할 수 없습니다.");
			$("insert[name=qty]").focus();
			return;
		}  else if (isNaN(data.qty) || data.qty.indexOf('-') != -1) {
			alert("수량은 문자를 입력할 수 없습니다.");
			$("insert[name=qty]").focus();
			return;
		}  else if (data.inventorydate == "") {
			alert("재고일자를 선택해주세요.");
			$("select[name=inventorydate]").focus();
			return;
		}
		
		let url = '/inventory/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#inventory");
				$table.bootstrapTable('refresh');
				
				$('#addInventoryModal').modal('hide');
				alert("저장되었습니다.");
			}
		});
	});

	$modalModifyBtn.click(function() {
		let data = s_inventory;

		data.factoryid = $("select[name=factoryid]").val();
		data.storageid = $("select[name=storageid]").val();
		data.materialid = $("select[name=materialid]").val();
		data.qty = $("input[name=qty]").val();
		data.inventorydate = $("input[name=inventorydate]").val();
		data.eventuser = localStorage.getItem("username");

		//validation check
		if (data.factoryid == "") {
			alert("공장을 선택해주세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.storageid == "") {
			alert("창고를 선택해주세요.");
			$("select[name=storageid]").focus();
			return;
		} else if (data.materialid == "") {
			alert("자재를 선택해주세요.");
			$("select[name=materialid]").focus();
			return;
		} else if (data.qty == "") {
			alert("수량을 선택해주세요.");
			$("insert[name=qty]").focus();
			return;
		}  else if (data.qty.indexOf('-') != -1) {
			alert("수량은 음수값은 입력할 수 없습니다.");
			$("insert[name=qty]").focus();
			return;
		}  else if (isNaN(data.qty) || data.qty.indexOf('-') != -1) {
			alert("수량은 문자를 입력할 수 없습니다.");
			$("insert[name=qty]").focus();
			return;
		}  else if (data.inventorydate == "") {
			alert("재고일자를 선택해주세요.");
			$("select[name=inventorydate]").focus();
			return;
		}
		
		let url = '/inventory/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#inventory");
				$table.bootstrapTable('refresh');
				
				$('#addInventoryModal').modal('hide');
				alert("수정 되었습니다.");
			}
		});
	});

	$gridRemoveBtn.click(function() {

		let selections = [];

		$grid.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);
		});

		let url = '/inventory/remove';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#inventory");
				$table.bootstrapTable('refresh');
				
				$gridRemoveBtn.prop('disabled', true);
				alert("삭제 되었습니다.");
			}
		});
	});

	// modal 
	$factoryCodes = $("#factoryCodes");

	$factoryCodes.change(function() {

		let $dropdown1 = $("#storageCodes");
		$dropdown1.empty();

		if (c_storage) {
			$dropdown1.append($("<option/>").val("").text("창고 선택"));
			$.each(c_storage, function() {
				if ($factoryCodes.val() == this.mcode) {
					$dropdown1.append($("<option/>").val(this.code).text(this.value));
				}
			});
		} else {
			$dropdown1.append($("<option/>").val("").text("창고 선택"));
		}


		let $dropdown2 = $("#materialCodes");
		$dropdown2.empty();

		if (c_material) {
			$dropdown2.append($("<option/>").val("").text("자재 선택"));
			$.each(c_material, function() {
				if ($factoryCodes.val() == this.mcode) {
					$dropdown2.append($("<option/>").val(this.code).text(this.value));
				}
			});
		} else {
			$dropdown2.append($("<option/>").val("").text("자재 선택"));
		}
	});
}

function inventory(data) {
	var url = '/inventory/find';

	var params = {
		start : $("input[name=sInventorydateStart]").val(),
		end : $("input[name=sInventorydateEnd]").val()
	}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#inventory");
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

function storage() {
	let url = '/code/storage';

	c_storage = null;

	$.ajax({
		url: url,
		type: 'GET',
		success: function(data) {
			c_storage = data;
		}
	});
}

function material() {
	let url = '/code/matarial';

	c_material = null;

	$.ajax({
		url: url,
		type: 'GET',
		success: function(data) {
			c_material = data;
		}
	});
}

function inventoryOperateFormatter(value, row, index) {
	return [
		'<a class="inventoryModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

window.operateEvents = {
	"click .inventoryModify": function(e, value, row, index) {
		
		s_inventory = row;
		
		inventoryDetail(row);

		$("#addInventoryModalCreate").css('display', "none");
		$("#addInventoryModalModify").css('display', "block");

		$('#addInventoryModal').modal('show');

		$factoryCodes = $("#factoryCodes");
		$factoryCodes.trigger('change');

		inventoryDetail(row);
	}
}

function inventoryDetail(data) {
	$("select[name=factoryid]").val(data.factoryid);
	$("select[name=storageid]").val(data.storageid);
	$("select[name=materialid]").val(data.materialid);
	$("input[name=qty]").val(data.qty);
	$("input[name=inventorydate]").val(data.inventorydate);
}

function formatAdvancedSearch(){
	return "검색조건";
}

