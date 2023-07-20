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

 function setEventListener (){
	 
	let $grid = $("#workerinfo");
	let $gridAddBtn = $("#addWorkerinfo");			//행추가
	let $gridSaveBtn = $("#saveWorkerinfo");		//수정
	let $gridRemoveBtn = $("#removeWorkerinfo");	//삭제
	 
	$grid.on('check.bs.table', function (row, $element, field) {
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
		$grid.bootstrapTable('append', initWorkerInfo());
		$grid.bootstrapTable('scrollTo', 'bottom');
		$grid.bootstrapTable('check', ($grid.bootstrapTable('getData').length-1));
		$gridAddBtn.prop('disabled',true);
	});
	
	$gridSaveBtn.click(function() {		//수정
		let data = initWorkerInfo();

		data.personid = $("input[name=personid]").val();
		data.factoryid = $("select[name=factoryid]").val();
		data.personname = $("input[name=personname]").val();
		data.isusable = $("select[name=isusable]").val();

		//validation check
		 if (data.personid == "") {
			alert("작업자 ID를 입력하세요.");
			$("input[name=personid]").focus();
			return;
		} else if (data.factoryid == "") {
			alert("공장명을 선택하세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.personname == "") {
			alert("작업자명을 입력하세요.");
			$("input[name=daynight]").focus();
			return;
		} else if (data.useyn == "") {
			alert("사용유무를 선택하세요.");
			$("select[name=useyn]").focus();
			return;
		}
		
		//데이터 이미 존재하는지 체크(중복=0, 아니면=1)
		let valiCheck;
		let url_val = '/workerinfo/check';
		
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
		
		let url = '/workerinfo/save';
		
		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				alert("저장 되였습니다.");
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

			selections.push({"personid":data.personid, "factoryid":data.factoryid});
			
		});

		let url = '/workerinfo/remove';
		
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
	
	$("#personid").val(data.personid);
	$("#factoryCodes option:selected").val(data.factoryid).text(data.factoryname);
	$("#personname").val(data.personname);
	$("#isusable").val(data.isusable);
	
}

function initWorkerInfo() {
	let data = {
		"companyid": "dx", "personid": "", "factoryid": "", "personname": "", "createtime": "", 
		"eventtime": "", "isusable": "", "factoryname": ""
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