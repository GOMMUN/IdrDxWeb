/**
 * 
 */
let c_factory = null;
let s_logisticsInfo = null;

$(function(){
	initSetting();
	setEventListener();
});

function initSetting() {
	localStorage.setItem("plant", $("#parameterPlant").val());
	localStorage.setItem("username", $("#parameterUsername").val());
	
	factroy();		// 코드 조회
}


 function setEventListener (){

	let $grid = $("#logisticsinfo");					//조회
	let $gridAddBtn = $("#addLogisticsInfo");			// add 버튼
	let $gridRemoveBtn = $("#removeLogisticsInfo");		// delete 버튼
	let $modalCloseBtn = $("#addLogisticsInfoModalClose");	// 모달 close 버튼
	let $modalCreateBtn = $("#addLogisticsInfoModalCreate");	// 모달 insert 버튼
	let $modalModifyBtn = $("#addLogisticsInfoModalModify");	// 모달 update 버튼 
	
	$grid.on('check.bs.table', function(row, $element) { //조회
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
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
	
	$grid.on('page-change.bs.table', function(number, size) {
		$gridRemoveBtn.prop('disabled', !$grid.bootstrapTable('getSelections').length)
	});
	
	$grid.on('refresh.bs.table', function(params) {
		logisticsinfo();
	});
	
	$gridAddBtn.click(function() {		// 정보 add 버튼
		
		$("#addLogisticsInfoModalCreate").css('display', "block");
		$("#addLogisticsInfoModalModify").css('display', "none");

		$('#addLogisticsInfoModal').modal('show');
		
	});
	
	$modalCloseBtn.click(function() {
		refreshLogisticsInfo();
		$('#addLogisticsInfoModal').modal('hide');
	});
	
	$modalCreateBtn.click(function() {

		let data = {};
		
		data.factoryid = $("select[name=factoryid]").val();
		data.logisticsid = $("input[name=logisticsid]").val();
		data.logisticsname = $("input[name=logisticsname]").val();
		data.failurerate = $("input[name=failurerate]").val();
		data.recoverytime = $("input[name=recoverytime]").val();
		data.speed = $("input[name=speed]").val();
		data.loadingtime = $("input[name=loadingtime]").val();
		data.unloadingtime = $("input[name=unloadingtime]").val();
		data.lotsize = $("input[name=lotsize]").val();
		data.isusable = $("select[name=isusable]").val();
		data.creator = localStorage.getItem("username");
	
		//validation check
		if (data.factoryid == "") {
			alert("공장을 선택해주세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택해주세요.");
			$("select[name=isusable]").focus();
			return;
		} else if (isNaN(data.failurerate) || data.failurerate == "") {
			alert("고장률을 확인해주세요.");
			$("input[name=failurerate]").focus();
			return;
		} else if (isNaN(data.recoverytime) || data.recoverytime == "") {
			alert("복구시간을 확인해주세요.");
			$("input[name=recoverytime]").focus();
			return;
		} else if (isNaN(data.speed) || data.speed == "") {
			alert("속도를 확인해주세요.");
			$("input[name=speed]").focus();
			return;
		} else if (isNaN(data.loadingtime) || data.loadingtime == "") {
			alert("로딩시간을 확인해주세요.");
			$("input[name=loadingtime]").focus();
			return;
		} else if (isNaN(data.unloadingtime) || data.unloadingtime == "") {
			alert("언로딩시간을 확인해주세요.");
			$("input[name=unloadingtime]").focus();
			return;
		}  

		let url = '/logisticsinfo/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#logisticsinfo");
				$table.bootstrapTable('refresh');
				refreshLogisticsInfo()
				
				$('#addLogisticsInfoModal').modal('hide');
				alert("저장되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("물류코드와 공장을 확인해주세요");
	    	}
		});
	});
	
	$modalModifyBtn.click(function() {
		let data = s_logisticsInfo;

		data.factoryid = $("select[name=factoryid]").val();
		data.equipmentid = $("input[name=equipmentid]").val();
		data.equipmentname = $("input[name=equipmentname]").val();
		data.failurerate = $("input[name=failurerate]").val();
		data.recoverytime = $("input[name=recoverytime]").val();
		data.errorrate = $("input[name=errorrate]").val();
		data.buffer = $("input[name=buffer]").val();
		data.isusable = $("select[name=isusable]").val();
		data.eventuser = localStorage.getItem("username");

		//validation check
		if (data.factoryid == "") {
			alert("공장을 선택해주세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택해주세요.");
			$("select[name=isusable]").focus();
			return;
		} else if (isNaN(data.failurerate) || data.failurerate == "") {
			alert("고장률을 확인해주세요.");
			$("input[name=failurerate]").focus();
			return;
		} else if (isNaN(data.recoverytime) || data.recoverytime == "") {
			alert("복구시간을 확인해주세요.");
			$("input[name=recoverytime]").focus();
			return;
		} else if (isNaN(data.speed) || data.speed == "") {
			alert("속도를 확인해주세요.");
			$("input[name=speed]").focus();
			return;
		} else if (isNaN(data.loadingtime) || data.loadingtime == "") {
			alert("로딩시간을 확인해주세요.");
			$("input[name=loadingtime]").focus();
			return;
		} else if (isNaN(data.unloadingtime) || data.unloadingtime == "") {
			alert("언로딩시간을 확인해주세요.");
			$("input[name=unloadingtime]").focus();
			return;
		} 
		
		let url = '/logisticsinfo/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#logisticsinfo");
				$table.bootstrapTable('refresh');
				refreshLogisticsInfo()
				
				$('#addLogisticsInfoModal').modal('hide');
				alert("수정 되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("물류코드와 공장을 확인해주세요");
	    	}
		});
	});
	
	$gridRemoveBtn.click(function() {
		
		if(!confirm('선택한 데이터를 삭제하시겠습니까?')){
            return false;
        }

		let selections = [];

		$grid.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);
		});

		let url = '/logisticsinfo/remove';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#logisticsinfo");
				$table.bootstrapTable('refresh');
				
				$gridRemoveBtn.prop('disabled', true);
				alert("삭제 되었습니다.");
			}
		});
	});
};
 
function logisticsinfo(data) {
	var url = '/logisticsinfo/find';

	var params = {}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#logisticsinfo");
		$table.bootstrapTable('removeAll');
		$table.bootstrapTable('append', res);
	})
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

function logisticsInfoOperateFormatter(value, row, index) {
	return [
		'<a class="logisticsModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

window.operateEvents = {
	"click .logisticsModify": function(e, value, row, index) {
		
		s_logisticsInfo = row;
		
		logisticsInfoDetail(row);

		$("#addLogisticsInfoModalCreate").css('display', "none");
		$("#addLogisticsInfoModalModify").css('display', "block");

		$('#addLogisticsInfoModal').modal('show');

		logisticsInfoDetail(row);
	}
}

function logisticsInfoDetail(data) {
	
		$("select[name=factoryid]").val(data.factoryid);
		$("input[name=logisticsid]").val(data.logisticsid);
		$("input[name=logisticsname]").val(data.logisticsname);
		$("input[name=failurerate]").val(data.failurerate);
		$("input[name=recoverytime]").val(data.recoverytime);
		$("input[name=speed]").val(data.speed);
		$("input[name=loadingtime]").val(data.loadingtime);
		$("input[name=unloadingtime]").val(data.unloadingtime);
		$("input[name=lotsize]").val(data.lotsize);
		$("select[name=isusable]").val(data.isusable);
}

function refreshLogisticsInfo() {
	
		$("select[name=factoryid]").val("");
		$("input[name=logisticsid]").val("");
		$("input[name=logisticsname]").val("");
		$("input[name=failurerate]").val("");
		$("input[name=recoverytime]").val("");
		$("input[name=speed]").val("");
		$("input[name=loadingtime]").val("");
		$("input[name=unloadingtime]").val("");
		$("input[name=lotsize]").val("");
		$("select[name=isusable]").val("Y");
	
}