/**
 * 
 */
$(function(){
	setEventListener();
});

 function setEventListener (){

	let $grid = $("#axis");						//조회
	let $gridAddBtn = $("#addDatasetDetailInfo");			//행추가
	let $gridSaveBtn = $("#saveDatasetDetailInfo");			//수정
	let $gridRemoveBtn = $("#removeDatasetDetailInfo");		//삭제
	 
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
		$grid.bootstrapTable('append', initDatasetDetail());
		$grid.bootstrapTable('scrollTo', 'bottom');
		$grid.bootstrapTable('check', ($grid.bootstrapTable('getData').length-1));			
		$gridAddBtn.prop('disabled',true);
	});
	
	$gridSaveBtn.click(function() {		//수정
		let data = initDatasetDetail();

		data.activityid = $("input[name=activityid]").val();
		data.activitynm = $("input[name=activitynm]").val();
		data.pqcdid = $("select[name=pqcdid]").val();
		data.isusable = $("select[name=isusable]").val();

		//validation check
		 if (data.activityid == "") {
			alert("분류 DataSet ID를 입력하세요.");
			$("input[name=activityid]").focus();
			return;
		} else if (data.activitynm == "") {
			alert("분류 DataSet Name을 입력하세요.");
			$("input[name=activitynm]").focus();
			return;
		} else if (data.pqcdid == "") {
			alert("분류ID를 선택하세요.");
			$("select[name=pqcdid]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택하세요.");
			$("select[name=isusable]").focus();
			return;
		}
		
		//데이터 이미 존재하는지 체크(중복=0, 아니면=1)
		let valiCheck;
		let url_val = '/datasetdetail/check';
		
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
		
		let url = '/datasetdetail/save';
		
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

			selections.push({"activityid":data.activityid, "activitynm":data.activitynm, "pqcdid":data.pqcdid});
			
		});

		let url = '/datasetdetail/remove';
		
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
	
	$("#activityid").val(data.activityid);
	$("#activitynm").val(data.activitynm);
	$("#pqcdid").val(data.pqcdid);
	$("#isusable").val(data.isusable);

}
  
function initDatasetDetail() {
	let data = {
		"companyid": "dx", "bizcd": "SP1", "activityid": "", "activitynm": "", "pqcdid": "", "isusable": ""
	};
	
	return data;
}


  