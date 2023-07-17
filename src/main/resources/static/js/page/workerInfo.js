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
	let $gridSaveBtn = $("#saveWorkerinfo");	//수정
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
//	$("input[name=ruleid]").val(data.rulesysid);
	//$('#workDateDetail').datepicker("setDate",new Date(data.workDate))
	
	$("#personid").val(data.personid);
	$("#factoryid").val(data.factoryid);
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