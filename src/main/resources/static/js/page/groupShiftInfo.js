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

	let $grid = $("#shiftinfo");					//조회
	let $gridAddBtn = $("#addShiftinfo");			//행추가
	let $gridSaveBtn = $("#saveShiftinfo");			//수정
	let $gridRemoveBtn = $("#removeShiftinfo");		//삭제
	 
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
		$grid.bootstrapTable('append', initGroupShiftInfo());
		$gridAddBtn.prop('disabled',true);
	});
	
	$gridSaveBtn.click(function() {		//수정
		let data = initGroupShiftInfo();

//		data.companyid = $("input[name=companyid]").val();
		data.factoryid = $("select[name=factoryid]").val();
		data.shiftid = $("input[name=shiftid]").val();
		data.shiftname = $("select[name=shiftname]").val();
		data.shifttype = $("input[name=shifttype]").val();
		data.starttime = $("input[name=starttime]").val();
		data.endtime = $("input[name=endtime]").val();
		data.isusable = $("select[name=isusable]").val();

		//validation check
		 if (data.factoryid == "") {
			alert("공장을 선택하세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.shiftid == "") {
			alert("그룹/SHIFT 명을 산텍하세요.");
			$("select[name=shiftid]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택하세요.");
			$("select[name=isusable]").focus();
			return;
		}
		
		let url = '/groupshift/save';
		
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

			selections.push({"companyid":data.companyid, "factoryid":data.factoryid, "shiftid":data.shiftid});
			
		});

		let url = '/groupshift/remove';
		
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
	
	$("#companyid").val(data.companyid);
	$("#factoryid").val(data.factoryid);
	$("#factoryname").val(data.factoryname);
	$("#shiftid").val(data.shiftid);
	$("#shiftname").val(data.shiftname);
	$("#shifttype").val(data.shifttype);
	$("#starttime").val(data.starttime);
	$("#endtime").val(data.endtime);
	$("#isusable").val(data.isusable);

}
  
function initGroupShiftInfo() {
	let data = {
		"companyid": "dx", "factoryid": "", "factoryname": "", "shiftid": "", "shiftname": "",
		"shifttype": "", "starttime": "", "endtime": "", "isusable": ""
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

  