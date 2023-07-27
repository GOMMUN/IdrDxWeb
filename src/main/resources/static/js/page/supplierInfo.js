/**
 * 
 */
let c_factory = null;
let s_supplierInfo = null;

$(function(){
	initSetting();
	setEventListener();
});

function initSetting() {
	factroy();		// 코드 조회
}


 function setEventListener (){

	let $grid = $("#supplierinfo");					//조회
	let $gridAddBtn = $("#addSupplierInfo");			// add 버튼
	let $gridRemoveBtn = $("#removeSupplierInfo");		// delete 버튼
	let $modalCloseBtn = $("#addSupplierInfoModalClose");	// 모달 close 버튼
	let $modalCreateBtn = $("#addSupplierInfoModalCreate");	// 모달 insert 버튼
	let $modalModifyBtn = $("#addSupplierInfoModalModify");	// 모달 update 버튼 
	
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
		supplierinfo();
	});
	
	$gridAddBtn.click(function() {		// add 버튼
		
		$("#addSupplierInfoModalCreate").css('display', "block");
		$("#addSupplierInfoModalModify").css('display', "none");

		$('#addSupplierInfoModal').modal('show');
		
	});
	
	$modalCloseBtn.click(function() {
		refreshSupplierInfo();
		$('#addSupplierInfoModal').modal('hide');
	});
	
	$modalCreateBtn.click(function() {

		let data = {};
		
		data.factoryid = $("select[name=factoryid]").val();
		data.vendorid = $("input[name=vendorid]").val();
		data.vendorname = $("input[name=vendorname]").val();		
		data.vendornickname = $("input[name=vendornickname]").val();
		data.vendoraddress = $("input[name=vendoraddress]").val();
		data.vendorchargeid = $("input[name=vendorchargeid]").val();
		data.vendorcontactemail = $("input[name=vendorcontactemail]").val();
		data.vendorcontactphoneno = $("input[name=vendorcontactphoneno]").val();
		data.isusable = $("select[name=isusable]").val();

	
		//validation check
		if (data.vendorid == "") {
			alert("공급업체ID를 입력하세요.");
			$("select[name=vendorid]").focus();
			return;
		} else if (data.factoryid == "") {
			alert("공장을 선택해주세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택해주세요.");
			$("select[name=isusable]").focus();
			return;
		} 

		let url = '/supplierinfo/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#supplierinfo");
				$table.bootstrapTable('refresh');
				
				$('#addSupplierInfoModal').modal('hide');
				alert("저장되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("공급업체ID와 공장을 확인해주세요");
	    	}
		});
	});
	
	$modalModifyBtn.click(function() {
		let data = s_supplierInfo;

		data.factoryid = $("select[name=factoryid]").val();
		data.vendorid = $("input[name=vendorid]").val();
		data.vendorname = $("input[name=vendorname]").val();		
		data.vendornickname = $("input[name=vendornickname]").val();
		data.vendoraddress = $("input[name=vendoraddress]").val();
		data.vendorchargeid = $("input[name=vendorchargeid]").val();
		data.vendorcontactemail = $("input[name=vendorcontactemail]").val();
		data.vendorcontactphoneno = $("input[name=vendorcontactphoneno]").val();
		data.isusable = $("select[name=isusable]").val();
		
		//validation check
		if (data.vendorid == "") {
			alert("공급업체ID를 입력하세요.");
			$("select[name=vendorid]").focus();
			return;
		} else if (data.factoryid == "") {
			alert("공장을 선택해주세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택해주세요.");
			$("select[name=isusable]").focus();
			return;
		} 
		
		let url = '/supplierinfo/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#supplierinfo");
				$table.bootstrapTable('refresh');
				refreshSupplierInfo()
				
				$('#addSupplierInfoModal').modal('hide');
				alert("수정 되었습니다.");
			}
		});
	});
	
	$gridRemoveBtn.click(function() {

		let selections = [];

		$grid.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);
		});

		let url = '/supplierinfo/remove';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#supplierinfo");
				$table.bootstrapTable('refresh');
				
				$gridRemoveBtn.prop('disabled', true);
				alert("비사용으로 변경되였습니다.");
			}
		});
	});
};
 
function supplierinfo(data) {
	var url = '/supplierinfo/find';

	var params = {}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#supplierinfo");
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

function supplierInfoOperateFormatter(value, row, index) {
	return [
		'<a class="supplierinfoModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

window.operateEvents = {
	"click .supplierinfoModify": function(e, value, row, index) {
		
		s_supplierInfo = row;
		
		supplierInfoDetail(row);

		$("#addSupplierInfoModalCreate").css('display', "none");
		$("#addSupplierInfoModalModify").css('display', "block");

		$('#addSupplierInfoModal').modal('show');

		supplierInfoDetail(row);
	}
}

function supplierInfoDetail(data) {
	
		$("select[name=factoryid]").val(data.factoryid);
		$("input[name=vendorid]").val(data.vendorid);
		$("input[name=vendorname]").val(data.vendorname);		
		$("input[name=vendornickname]").val(data.vendornickname);
		$("input[name=vendoraddress]").val(data.vendoraddress);
		$("input[name=vendorchargeid]").val(data.vendorchargeid);
		$("input[name=vendorcontactemail]").val(data.vendorcontactemail);
		$("input[name=vendorcontactphoneno]").val(data.vendorcontactphoneno);
		$("select[name=isusable]").val(data.isusable);
}

function refreshSupplierInfo() {
	
		$("select[name=factoryid]").val("");
		$("input[name=vendorid]").val("");
		$("input[name=vendorname]").val("");		
		$("input[name=vendornickname]").val("");
		$("input[name=vendoraddress]").val("");
		$("input[name=vendorchargeid]").val("");
		$("input[name=vendorcontactemail]").val("");
		$("input[name=vendorcontactphoneno]").val("");
		$("select[name=isusable]").val("");
	
}