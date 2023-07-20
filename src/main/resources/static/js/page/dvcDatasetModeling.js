/**
 * 
 */
$(function(){
	
	setEventListener();
});

function setEventListener (){
	let $grid = $("#axis");						//axis조회
	let $gridGroup = $("#datasetgroup");		//group조회
	let $gridAddBtn = $("#addDvcModel");		//행추가
	let $gridSaveBtn = $("#saveDvcModel");		//수정
	let $gridRemoveBtn = $("#removeDvcModel");	//삭제
	
	$grid.on('check.bs.table', function (row, $element, field) {	//axis조회
	
		if ($grid.bootstrapTable('getSelections').length == 1) {
			s_dvcModel = $element;
		} else {
			s_dvcModel = null;
		}

		if (s_dvcModel) {
			dvcModel($element);
		}
		
		gridData($element);
	});	
	
	$gridGroup.on('check.bs.table', function (row, $element, field) {	//Group조회
		gridData($element);
		$gridRemoveBtn.prop('disabled', !$gridGroup.bootstrapTable('getSelections').length);
	});			
		
	$gridGroup.on('uncheck.bs.table', function(row, $element) {
		$gridRemoveBtn.prop('disabled', !$gridGroup.bootstrapTable('getSelections').length)
	});

	$gridGroup.on('check-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$gridGroup.bootstrapTable('getSelections').length)
	});

	$gridGroup.on('uncheck-all.bs.table', function(rowsAfter, rowsBefore) {
		$gridRemoveBtn.prop('disabled', !$gridGroup.bootstrapTable('getSelections').length)
	});		
	
	$gridAddBtn.click(function() {			//행추가
		$gridGroup.bootstrapTable('append', initDvcModel());
		$gridGroup.bootstrapTable('scrollTo', 'bottom');
		$gridGroup.bootstrapTable('check', ($gridGroup.bootstrapTable('getData').length-1));	
		$gridAddBtn.prop('disabled',true);
	});
	
	$gridSaveBtn.click(function() {		//수정
		let data = initDvcModel();

		data.axisid = $("input[name=axisid]").val();
		data.axisnm = $("input[name=axisnm]").val();
		data.groupingid = $("input[name=groupingid]").val();
		data.groupingnm = $("input[name=groupingnm]").val();
		data.isusable = $("select[name=isusable]").val();


		//validation check
		if (data.groupingid == "") {
			alert("그룹핑ID 를 입력하세요.");
			$("input[name=groupingid]").focus();
			return;
		}  else if (data.groupingnm == "") {
			alert("그룹핑Name 를 입력하세요.");
			$("input[name=groupingnm]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택하세요.");
			$("select[name=isusable]").focus();
			return;
		}
		
		//데이터 이미 존재하는지 체크(중복=0, 아니면=1)
		let valiCheck;
		let url_val = '/dvcmodel/check';
		
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
		
		let url = '/dvcmodel/save';
		
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

			selections.push({"axisid":data.axisid, "groupingid":data.groupingid});
			
		});

		let url = '/dvcmodel/remove';
		
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

function dvcModel(data) {
	var url = '/dvcmodel/findGroup';

	var params = {
		axisid: data.axisid,
	}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#datasetgroup");
		$table.bootstrapTable('removeAll');
		$table.bootstrapTable('append', res);
	})
}

function gridData(data){ //Axis 값 수정 불가
	if(data.axisid){
		$("#axisid").val(data.axisid);
		$("#axisnm").val(data.axisnm);
		$("#groupingid").val(data.groupingid);
		$("#groupingnm").val(data.groupingnm);
	}else{
		$("#groupingid").val(data.groupingid);
		$("#groupingnm").val(data.groupingnm);
	}


}

function initDvcModel() {
	let data = {
		"companyid": "dx", "bizcd": "SP1", 
		"groupingid": "", "groupingnm": "", "isusable": ""
	};
	
	return data;
}

 