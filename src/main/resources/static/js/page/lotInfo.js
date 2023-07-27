/**
 * 
 */
let c_factory = null;
let s_lotInfo = null;

$(function(){
	initSetting();
	setEventListener();
});

function initSetting() {
	factroy();		// 코드 조회
}


 function setEventListener (){

	let $grid = $("#lotinfo");					//조회
	let $gridAddBtn = $("#addLotInfo");			//  add 버튼
	let $gridRemoveBtn = $("#removeLotInfo");		//  delete 버튼
	let $modalCloseBtn = $("#addLotInfoModalClose");	//  모달 close 버튼
	let $modalCreateBtn = $("#addLotInfoModalCreate");	//  모달 insert 버튼
	let $modalModifyBtn = $("#addLotInfoModalModify");	//  모달 update 버튼 
	
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
		lotinfo();
	});
	
	$gridAddBtn.click(function() {		//  add 버튼
		
		$("#addLotInfoModalCreate").css('display', "block");
		$("#addLotInfoModalModify").css('display', "none");

		$('#addLotInfoModal').modal('show');
		
	});
	
	$modalCloseBtn.click(function() {
		refreshLotInfo();
		$('#addLotInfoModal').modal('hide');
	});
	
	$modalCreateBtn.click(function() {

		let data = {};
		
		data.factoryid = $("select[name=factoryid]").val();
		data.materialid = $("input[name=materialid]").val();
		data.materialname = $("input[name=materialname]").val();
		data.lotid = $("input[name=lotid]").val();
		data.lotname = $("input[name=lotname]").val();
		data.lotsize = $("input[name=lotsize]").val();
		data.lotunit = $("input[name=lotunit]").val();
		data.fromlinecode = $("input[name=fromlinecode]").val();
		data.fromlinecnt = $("input[name=fromlinecnt]").val();
		data.tolinecode = $("input[name=tolinecode]").val();
		data.tolinecnt = $("input[name=tolinecnt]").val();
		data.isusable = $("select[name=isusable]").val();
	
		//validation check
		if (data.factoryid == "") {
			alert("공장을 선택해주세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택해주세요.");
			$("select[name=isusable]").focus();
			return;
		} 

		let url = '/lotinfo/create';

		$.ajax({
			url: url,
			type: 'POST',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#lotinfo");
				$table.bootstrapTable('refresh');
				
				$('#addLotInfoModal').modal('hide');
				alert("저장되었습니다.");
			},
			error: function(xhr, textStatus, errorThrown) {
	        	// 실패 시 실행할 코드
	        	alert("LOT ID와 공장을 확인해주세요");
	    	}
		});
	});
	
	$modalModifyBtn.click(function() {
		let data = s_lotInfo;

		data.factoryid = $("select[name=factoryid]").val();
		data.materialid = $("input[name=materialid]").val();
		data.materialname = $("input[name=materialname]").val();
		data.lotid = $("input[name=lotid]").val();
		data.lotname = $("input[name=lotname]").val();
		data.lotsize = $("input[name=lotsize]").val();
		data.lotunit = $("input[name=lotunit]").val();
		data.fromlinecode = $("input[name=fromlinecode]").val();
		data.fromlinecnt = $("input[name=fromlinecnt]").val();
		data.tolinecode = $("input[name=tolinecode]").val();
		data.tolinecnt = $("input[name=tolinecnt]").val();
		data.isusable = $("select[name=isusable]").val();

		//validation check
		if (data.factoryid == "") {
			alert("공장을 선택해주세요.");
			$("select[name=factoryid]").focus();
			return;
		} else if (data.isusable == "") {
			alert("사용여부를 선택해주세요.");
			$("select[name=isusable]").focus();
			return;
		} 
		
		let url = '/lotinfo/modify';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#lotinfo");
				$table.bootstrapTable('refresh');
				refreshLotInfo()
				
				$('#addLotInfoModal').modal('hide');
				alert("수정 되었습니다.");
			}
		});
	});
	
	$gridRemoveBtn.click(function() {

		let selections = [];

		$grid.bootstrapTable('getSelections').forEach(function(data) {
			selections.push(data.dataseq);
		});

		let url = '/lotinfo/remove';

		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(selections),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				
				$table = $("#lotinfo");
				$table.bootstrapTable('refresh');
				
				$gridRemoveBtn.prop('disabled', true);
				alert("비사용으로 변경되였습니다.");
			}
		});
	});
};
 
function lotinfo(data) {
	var url = '/lotinfo/find';

	var params = {}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#lotinfo");
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

function lotInfoOperateFormatter(value, row, index) {
	return [
		'<a class="lotModify" href="javascript:void(0)" title="수정">',
		'<i class="fa-solid fa-pen"></i>',
		'</a>'
	].join('');
}

window.operateEvents = {
	"click .lotModify": function(e, value, row, index) {
		
		s_lotInfo = row;
		
		lotInfoDetail(row);

		$("#addLotInfoModalCreate").css('display', "none");
		$("#addLotInfoModalModify").css('display', "block");

		$('#addLotInfoModal').modal('show');

		lotInfoDetail(row);
	}
}

function lotInfoDetail(data) {
	
		$("select[name=factoryid]").val(data.factoryid);
		$("input[name=materialid]").val(data.materialid);
		$("input[name=materialname]").val(data.materialname);
		$("input[name=lotid]").val(data.lotid);
		$("input[name=lotname]").val(data.lotname);
		$("input[name=lotsize]").val(data.lotsize);
		$("input[name=lotunit]").val(data.lotunit);
		$("input[name=fromlinecode]").val(data.fromlinecode);
		$("input[name=fromlinecnt]").val(data.fromlinecnt);
		$("input[name=tolinecode]").val(data.tolinecode);
		$("input[name=tolinecnt]").val(data.tolinecnt);
		$("select[name=isusable]").val(data.isusable);
}

function refreshLotInfo() {
	
		$("select[name=factoryid]").val("");
		$("input[name=materialid]").val("");
		$("input[name=materialname]").val("");
		$("input[name=lotid]").val("");
		$("input[name=lotname]").val("");
		$("input[name=lotsize]").val("");
		$("input[name=lotunit]").val("");
		$("input[name=fromlinecode]").val("");
		$("input[name=fromlinecnt]").val("");
		$("input[name=tolinecode]").val("");
		$("input[name=tolinecnt]").val("");
		$("select[name=isusable]").val("");
	
}