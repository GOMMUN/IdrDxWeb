/**
 * 
 */
$(function(){
	
	setEventListener();
});

 function setEventListener (){
	 
	let $grid = $("#factoryinfo");
	let $gridAddBtn = $("#addFactoryinfo");			//행추가
	let $gridSaveBtn = $("#saveFactoryinfo");		//수정
	let $gridRemoveBtn = $("#removeFactoryinfo");	//삭제
	 
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
		$grid.bootstrapTable('append', initFactoryInfo());
		$grid.bootstrapTable('scrollTo', 'bottom');
		$grid.bootstrapTable('check', ($grid.bootstrapTable('getData').length-1));	
		$gridAddBtn.prop('disabled',true);
	});
	
	$gridSaveBtn.click(function() {		//수정
		let data = initFactoryInfo();

		data.factoryid = $("input[name=factoryid]").val();
		data.creator = $("input[name=creator]").val();
		data.factoryname = $("input[name=factoryname]").val();
		data.description = $("input[name=description]").val();
		data.erpplant = $("input[name=erpplant]").val();
		data.factorytype = $("input[name=factorytype]").val();
		data.isusable = $("select[name=isusable]").val();
		data.tid = $("input[name=tid]").val();

		//validation check
		 if (data.factoryid == "") {
			alert("공장코드를 입력하세요.");
			$("input[name=factoryid]").focus();
			return;
		} else if (data.factoryname == "") {
			alert("공장명을 입력하세요.");
			$("input[name=factoryname]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택하세요.");
			$("select[name=isusable]").focus();
			return;
		}
		
		//데이터 이미 존재하는지 체크(중복=0, 아니면=1)
		let valiCheck;
		let url_val = '/factoryinfo/check';
		
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
		
		let url = '/factoryinfo/save';
		
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

			selections.push({"factoryid":data.factoryid});
			
		});

		let url = '/factoryinfo/remove';
		
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

	$("#factoryid").val(data.factoryid);
	$("#factoryname").val(data.factoryname);
	$("#description").val(data.description);
	$("#erpplant").val(data.erpplant);
	$("#factorytype").val(data.factorytype);
	$("#creator").val(data.creator);
	$("#isusable").val(data.isusable);

}

function initFactoryInfo() {
	let data = {
		"factoryid": "", "factoryname": "", "description": "", "erpplant": "",
		"factorytype": "", "creator": "", "isusable": ""
	};
	
	return data;
}
