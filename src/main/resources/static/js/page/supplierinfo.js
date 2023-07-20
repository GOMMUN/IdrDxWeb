/**
 * 
 */
$(function(){
	initSetting();
	setEventListener();
});

function initSetting() {
	factroy();		// 공장코드 조회
}

function setEventListener(){

	let $grid = $("#supplierinfo");					//조회
	let $gridAddBtn = $("#addSupplierinfo");		//행추가
	let $gridSaveBtn = $("#saveSupplierinfo");		//수정
	let $gridRemoveBtn = $("#removeSupplierinfo");	//삭제
	 
	$grid.on('check.bs.table', function (row, $element, field) {	//조회
		gridData($element);
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length);
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
	
	$gridAddBtn.click(function() {			//행추가
		$grid.bootstrapTable('append', initSupplierinfo());
		$grid.bootstrapTable('scrollTo', 'bottom');
		$grid.bootstrapTable('check', ($grid.bootstrapTable('getData').length-1));
		$gridAddBtn.prop('disabled',true);
	});

	$gridSaveBtn.click(function() {		//수정
		let data = initSupplierinfo();

		data.vendorid = $("input[name=vendorid]").val();
		data.factoryid = $("select[name=factoryid]").val();
		data.vendorname = $("input[name=vendorname]").val();		
		data.vendornickname = $("input[name=vendornickname]").val();
		data.vendoraddress = $("input[name=vendoraddress]").val();
		data.vendorchargeid = $("input[name=vendorchargeid]").val();
		data.vendorcontactemail = $("input[name=vendorcontactemail]").val();
		data.vendorcontactphoneno = $("input[name=vendorcontactphoneno]").val();
		data.creator = $("input[name=creator]").val();
		data.eventuser = $("input[name=eventuser]").val();
		data.isusable = $("select[name=isusable]").val();

		//validation check
		 if (data.vendorid == "") {
			alert("공급업체ID를 입력하세요.");
			$("select[name=vendorid]").focus();
			return;
		} else if (data.factoryid == "") {
			alert("공장을 선택하세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.vendorname == "") {
			alert("공급업체명을 입력하세요.");
			$("select[name=vendorname]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택하세요.");
			$("select[name=isusable]").focus();
			return;
		}
		
		//데이터 이미 존재하는지 체크(중복=0, 아니면=1)
		let valiCheck;
		let url_val = '/supplier/check';
		
		$.ajax({
			url: url_val,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			async:false,
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				if(data > 0){
					valiCheck = 0;
				}else {
					valiCheck = 1;
				}
			}
		});		

		if(valiCheck == 0){
			if(!confirm('기존 데이터를 수정하시겠습니까?')){
            	return false;
        	}
		}else if(valiCheck == 1){
			if(!confirm('해당 데이터를 새로 추가하시겠습니까?')){
            	return false;
        	}
		}
		
		//저장 처리
		let url = '/supplier/save';
		
		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				if(valiCheck = 0){
					alert("수정 되였습니다.");
				}else if(valiCheck = 1){
					alert("저장 되였습니다.");
				}
				
				location.reload();
			}
		});		
	});
	
	$gridRemoveBtn.click(function() {	
		
		if(!confirm('해당 데이터를 사용하지 않겠습니까?')){
            return false;
        }

		let selections = [];

		$grid.bootstrapTable('getSelections').forEach(function(data) {

			selections.push({"vendorid":data.vendorid, "factoryid":data.factoryid});
			
		});

		let url = '/supplier/remove';
		
		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				alert("비사용으로 변경되였습니다.");
				location.reload();
			}
		});
	});	
};

function gridData(data){

	$("#vendorid").val(data.vendorid);
	$("#factoryCodes option:selected").val(data.factoryid).text(data.factoryname);
	$("#vendorname").val(data.vendorname);
	$("#vendornickname").val(data.vendornickname);
	$("#vendoraddress").val(data.vendoraddress);
	$("#vendorchargeid").val(data.vendorchargeid);
	$("#vendorcontactemail").val(data.vendorcontactemail);
	$("#vendorcontactphoneno").val(data.vendorcontactphoneno);
	$("#creator").val(data.creator);
	$("#createtime").val(data.createtime);
	$("#eventuser").val(data.eventuser);
	$("#eventtime").val(data.eventtime);
	$("#isusable").val(data.isusable);

}
  
function initSupplierinfo() {
	let data = {
		"vendorid": "", "factoryid": "", "factoryname": "", "vendorname": "", "vendornickname": "",
		"vendoraddress": "", "vendorchargeid": "", "vendorcontactemail": "", "vendorcontactphoneno": "",
		"creator": "", "createtime": "", "eventuser": "", "eventtime": "", "isusable": ""
	};
	
	return data;
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