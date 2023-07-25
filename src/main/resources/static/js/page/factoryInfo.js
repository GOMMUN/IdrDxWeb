/**
 * 
 */
let s_factoryInfo = null;

$(function(){
	
	setEventListener();
});

 function setEventListener (){
	 
	let $grid = $("#factoryinfo");					//그리드
	let $gridAddBtn = $("#addFactoryinfo");			//그리드 add버튼
	let $gridRemoveBtn = $("#removeFactoryinfo");	//그리드 delete버튼
	let $modalCreateBtn = $("#addFactoryInfoModalCreate");	// 모달 insert 버튼
	let $modalModifyBtn = $("#addFactoryInfoModalModify");	// 모달 update 버튼	
	let $modalCloseBtn = $("#addFactoryInfoModalClose");	// 모달 close 버튼 
	
	$grid.on('check.bs.table', function (row, $element, field) {
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
	
	$gridAddBtn.click(function() {
		$("#addFactoryInfoModalCreate").css('display', "block");
		$("#addFactoryInfoModalModify").css('display', "none");

		$('#addFactoryInfoModal').modal('show');
	});
	
	$modalCloseBtn.click(function() {
		refreshFactoryInfo();
		$('#addFactoryInfoModal').modal('hide');
	});
	
	$modalCreateBtn.click(function() {

		let data = initFactoryInfo();
		
		data.factoryid = $("input[name=factoryid]").val();
		data.factoryname = $("input[name=factoryname]").val();
		data.description = $("input[name=description]").val();
		data.erpplant = $("input[name=erpplant]").val();
		data.factorytype = $("input[name=factorytype]").val();
		data.isusable = $("select[name=isusable]").val();

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
			$("input[name=isusable]").focus();
			return;
		}

		let url = '/factoryinfo/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#factoryinfo");
				$table.bootstrapTable('refresh');
				
				$('#addFactoryInfoModal').modal('hide');
				alert("저장되었습니다.");
			}
		});
	});
	
	$modalModifyBtn.click(function() {
		let data = s_factoryInfo;

		data.factoryid = $("input[name=factoryid]").val();
		data.factoryname = $("input[name=factoryname]").val();
		data.description = $("input[name=description]").val();
		data.erpplant = $("input[name=erpplant]").val();
		data.factorytype = $("input[name=factorytype]").val();
		data.isusable = $("select[name=isusable]").val();

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
			$("input[name=isusable]").focus();
			return;
		}
		
		let url = '/factoryinfo/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#factoryinfo");
				$table.bootstrapTable('refresh');
				
				$('#addFactoryInfoModal').modal('hide');
				alert("수정 되었습니다.");
			}
		});
	});	
	
	$gridRemoveBtn.click(function() {	
		
		if(!confirm('해당 데이터를 사용하지 않겠습니까?')){
            return false;
        }

		let selections = [];

		$grid.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);
		});

		let url = '/factoryinfo/remove';
		
		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#factoryinfo");
				$table.bootstrapTable('refresh');
				
				$gridRemoveBtn.prop('disabled', true);
				alert("비사용으로 변경되였습니다.");
			}
		});
	});			
};

function factoryInfoOperateFormatter(value, row, index) {
	return [
		'<a class="factoryInfoModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

window.operateEvents = {
	"click .factoryInfoModify": function(e, value, row, index) {
		
		s_factoryInfo = row;
		
		factoryInfoDetail(row);

		$("#addFactoryInfoModalCreate").css('display', "none");
		$("#addFactoryInfoModalModify").css('display', "block");

		$('#addFactoryInfoModal').modal('show');

		factoryInfoDetail(row);
	}
}

function factoryInfoDetail(data) {
	$("input[name=factoryid]").val(data.factoryid);
	$("input[name=factoryname]").val(data.factoryname);
	$("input[name=description]").val(data.description);
	$("input[name=erpplant]").val(data.erpplant);
	$("input[name=factorytype]").val(data.factorytype);
	$("select[name=isusable]").val(data.isusable);
}

function initFactoryInfo() {
	
	let data = {
		"factoryid": "", "factoryname": "", "description": "", "erpplant": "",
		"factorytype": "", "isusable": ""
	};
	
	return data;
}

function refreshFactoryInfo() {
	$("input[name=factoryid]").val("");
	$("input[name=factoryname]").val("");
	$("input[name=description]").val("");
	$("input[name=erpplant]").val("");
	$("input[name=factorytype]").val("");
	$("select[name=isusable]").val("");
}

