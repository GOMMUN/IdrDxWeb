/**
 * 
 */
$(function(){
	
	setEventListener();
});

 function setEventListener (){
	 
	let $grid = $("#mvinfo");					//조회
	let $gridAddBtn = $("#addMvinfo");		//행추가
	let $gridUpdateBtn = $("#updateMvinfo");	//수정
	let $gridRemoveBtn = $("#removeMvinfo");	//삭제
	 
	$grid.on('click-row.bs.table', function (row, $element, field) {
		gridData($element);
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length);
	});
	
    $grid.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
    });
	
	$gridAddBtn.click(function() {			//행추가
		$grid.bootstrapTable('append', initMvInfo());
		$gridAddBtn.prop('disabled',true);
	});
	
	$gridUpdateBtn.click(function() {		//수정
		let data = initMvInfo();

		data.modelid = $("input[name=modelid]").val();
		data.modelnm = $("input[name=modelnm]").val();
		data.modeldesc = $("input[name=modeldesc]").val();
		data.useyn = $("select[name=useyn]").val();

		//validation check
		 if (data.modelid == "") {
			alert("MODEL ID를 입력하세요.");
			$("select[name=modelid]").focus();
			return;
		} else if (data.modelnm == "") {
			alert("MODEL 명을 입력하세요.");
			$("select[name=modelnm]").focus();
			return;
		} else if (data.modeldesc == "") {
			alert("MODEL 설명을 입력하세요.");
			$("select[name=modeldesc]").focus();
			return;
		} else if (data.useyn == "") {
			alert("사용여부를 선택하세요.");
			$("select[name=useyn]").focus();
			return;
		}
		
		let url = '/mvinfo/merge';
		
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

			selections.push({"modelid":data.modelid});
			
		});

		let url = '/mvinfo/remove';
		
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
	
	$("#modelid").val(data.modelid);
	$("#modelnm").val(data.modelnm);
	$("#modeldesc").val(data.modeldesc);
	$("#useyn").val(data.useyn);
}

function initMvInfo() {
	let data = {
		"companycd": "dx", "bizcd": "SP1", "modelid": "", "modelnm": "", "modeldesc": "", "useyn": "",
		"fstreguserid": "", "fstregdt": "", "fnledituserid": "", "fnleditdt": ""
	};
	
	return data;
}
