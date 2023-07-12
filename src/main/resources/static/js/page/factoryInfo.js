/**
 * 
 */
$(function(){
	
	setEventListener();
});

 function setEventListener (){
	 
	let $grid = $("#factoryinfo");
	let $gridAddBtn = $("#addFactoryinfo");			//행추가
	let $gridUpdateBtn = $("#updateFactoryinfo");	//수정
	let $gridRemoveBtn = $("#removeFactoryinfo");	//삭제
	 
	$grid.on('click-row.bs.table', function (row, $element, field) {
		gridData($element);
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length);
	});
	
    $grid.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
		$gridRemoveBtn.prop('disabled', !$table.bootstrapTable('getSelections').length)
    });
	
	$gridAddBtn.click(function() {			//행추가
		$grid.bootstrapTable('append', initFactoryInfo());
		$gridAddBtn.prop('disabled',true);
	});
	
	$gridUpdateBtn.click(function() {		//수정
		let data = initFactoryInfo();

//		data.companyid = $("input[name=companyid]").val();
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
		
		let url = '/factoryinfo/merge';
		
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
//	$("input[name=ruleid]").val(data.rulesysid);
	//$('#workDateDetail').datepicker("setDate",new Date(data.workDate))
	
	$("#companyid").val(data.companyid);
	$("#factoryid").val(data.factoryid);
	$("#factoryname").val(data.factoryname);
	$("#description").val(data.description);
	$("#erpplant").val(data.erpplant);
	$("#factorytype").val(data.factorytype);
	$("#creator").val(data.creator);
	$("#isusable").val(data.isusable);
	$("#tid").val(data.tid);

}

function initFactoryInfo() {
	let data = {
		"companyid": "dx", "factoryid": "", "factoryname": "", "description": "", "erpplant": "",
		"factorytype": "", "creator": "", "isusable": "", "tid": ""
	};
	
	return data;
}
