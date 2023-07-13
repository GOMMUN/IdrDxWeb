/** 
 * 
 */
$(function(){
	
	setEventListener();
});

 function setEventListener (){
	 
	let $grid = $("#workerinfo");
	let $gridAddBtn = $("#addWorkerinfo");			//행추가
	let $gridUpdateBtn = $("#updateWorkerinfo");	//수정
	let $gridRemoveBtn = $("#removeWorkerinfo");	//삭제
	 
	$grid.on('click-row.bs.table', function (row, $element, field) {
		gridData($element);
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length);
	});

    $grid.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
    });
    
   $gridAddBtn.click(function() {			//행추가
		$grid.bootstrapTable('append', initWorkerInfo());
		$gridAddBtn.prop('disabled',true);
	});
	
	$gridUpdateBtn.click(function() {		//수정
		let data = initWorkerInfo();

//		data.companycd = $("input[name=companyid]").val();
//		data.bizcd = $("select[name=factoryid]").val();
		data.workerid = $("input[name=workerid]").val();
		data.workernm = $("input[name=workernm]").val();
		data.daynight = $("select[name=daynight]").val();
		data.useyn = $("select[name=useyn]").val();

		//validation check
		 if (data.workerid == "") {
			alert("작업자 ID를 입력하세요+.");
			$("select[name=workerid]").focus();
			return;
		} else if (data.workernm == "") {
			alert("작업자명을 입력하세요.");
			$("select[name=workernm]").focus();
			return;
		} else if (data.daynight == "") {
			alert("주야간을 선택하세요.");
			$("select[name=daynight]").focus();
			return;
		} else if (data.useyn == "") {
			alert("사용유무를 선택하세요.");
			$("select[name=useyn]").focus();
			return;
		}
		
		let url = '/workerinfo/merge';
		
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

			selections.push({"workerid":data.workerid});
			
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
//	$("input[name=ruleid]").val(data.rulesysid);
	//$('#workDateDetail').datepicker("setDate",new Date(data.workDate))
	
	$("#workerid").val(data.workerid);
	$("#workernm").val(data.workernm);
	$("#daynight").val(data.daynight);
	$("#useyn").val(data.useyn);
	
}

function initWorkerInfo() {
	let data = {
		"companycd": "dx", "bizcd": "SP1", "workerid": "", "workernm": "", "daynight": "","useyn": ""
	};
	
	return data;
}