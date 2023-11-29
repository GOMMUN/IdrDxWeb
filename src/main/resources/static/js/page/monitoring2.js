/**
 * 
 */

let c_factory = null;
let c_line = null;
let c_material = null;
let data = s_monitor();

$(function() {
	/*
	$("input[name=workDate]").datepicker({
		format: "yyyy-mm-dd",
		autoclose: true,
		language: "ko"
	}).datepicker("setDate", new Date());*/
	factroy();
	line();
	init();
	matarial();
	setEventListener();
});

function getToday() {
	var date = new Date();
	var year = date.getFullYear();
	var month = ("0" + (1 + date.getMonth())).slice(-2);
	var day = ("0" + date.getDate()).slice(-2);

	return year + "-" + month + "-" + day;
}

function init() {
	data.factoryid = 'KEM'
	data.lineid = 'KEM-P0002'
	data.workDate = getToday();
	$('#workDateid').val(getToday());
	var params = {
		workDate: data.workDate,
		factoryid: data.factoryid,
		lineid: data.lineid

	}
	ajaxRequest(params);
}



function setEventListener() {
	$search = $("#search");
	$factoryCodes = $("#factoryCodes");

	$factoryCodes.change(function() {

		data.factoryid = $("select[name=factoryid]").val();

		let $dropdown1 = $("#lineCodes");
		$dropdown1.empty();

		if (c_line) {
			$dropdown1.append($("<option/>").val("").text("공정 선택"));
			$.each(c_line, function() {
				if ($factoryCodes.val() == this.mcode) {
					$dropdown1.append($("<option/>").val(this.code).text(this.value));
				}
			});
		} else {
			$dropdown1.append($("<option/>").val("").text("공정 선택"));

		}

		let $dropdown5 = $("#matarial");
		$dropdown5.empty();

		if (c_material) {
			$dropdown5.append($("<option/>").val("").text("자재 선택"));
			$.each(c_material, function() {
				if ($factoryCodes.val() == this.mcode) {
					$dropdown5.append($("<option/>").val(this.code).text(this.value));
				}
			});
		} else {
			$dropdown5.append($("<option/>").val("").text("자재 선택"));

		}

	});

	$search.click(function() {
		data.workDate = $("input[name=workDate]").val();
		data.lineid = $("select[name=lineid]").val();
		if (data.workDate == "") {
			alert("날짜를 선택 하세요");
			$("input[name=workDate]").focus();
			return;
		}
		if (data.factoryid == "") {
			alert("공장을 선택 하세요");
			$("input[name=factoryid]").focus();
			return;
		}
		if (data.lineid == "") {
			alert("공정을 선택 하세요");
			$("input[name=lineid]").focus();
			return;
		}

		var params = {
			workDate: data.workDate,
			factoryid: data.factoryid,
			lineid: data.lineid

		}

		ajaxRequest(params);
	});




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
				$("#factoryCodes option:eq(1)").prop("selected", true);
				data.factoryid = $("select[name=factoryid]").val();

			} else {
				$dropdown.append($("<option/>").val("").text("공장 선택"));
			}
		}
	});


}

function line(factoryid) {

	let $dropdown = $("#lineCodes");
	$dropdown.empty();

	c_line = null;

	$.ajax({
		url: '/code/line',
		type: 'GET',
		success: function(data) {
			c_line = data;
			if (c_line) {
				$.each(c_line, function() {
					if ($factoryCodes.val() == this.mcode) {
						$dropdown.append($("<option/>").val(this.code).text(this.value));
					}
				});

				$("#lineCodes option:eq(0)").prop("selected", true);
				data.lineid = $("select[name=lineid]").val();

			} else {
				$dropdown.append($("<option/>").val("").text("공장 선택"));
			}

		}
	});


}

function matarial() {
	let url = '/code/matarial';

	let $dropdown = $("#matarial");
	$dropdown.empty();
	c_material = null;

	$.ajax({
		url: url,
		type: 'GET',
		success: function(data) {
			c_material = data;

			if (c_material) {
				$dropdown.append($("<option/>").val("").text("자재 선택"));
				$.each(c_material, function() {
					if ($factoryCodes.val() == this.mcode) {
						$dropdown.append($("<option/>").val(this.code).text(this.value));
					}
					$("#matarial option:eq(1)").prop("selected", true);
					data.lineid = $("select[name=matarialid]").val();
				});
			} else {
				$dropdown5.append($("<option/>").val("").text("자재 선택"));

			}

		}
	});
}
function s_monitor() {
	let data = {
		"workDate": "", "factoryid": "", "lineid": ""
		, "planQty": "", "prodQty": "", "shiftid": ""

	}
	return data;
}

function ajaxRequest(params) {

	let findproducturl = '/monitoring/findproduct';

	$.get(findproducturl + '?' + $.param(params)).then(function(res) {
		//let result = res;
		
			if(res.amPlanQty==0||res.amPlanQty==null){
				$("#dayplan").text('-');
				$("#dayperformance").text('-');
				$("#daypl").text('-');
				$("#dayper").text('-');
			}else{
				$("#dayplan").text(res.amPlanQty);
				$("#dayperformance").text((res.amProdQty/res.amPlanQty).toFixed(2)*100+'%');
				$("#daypl").text(res.amProdQty);
				$("#dayper").text(res.amPlanQty);
			}
			
			
			if(res.pmPlanQty==0||res.pmPlanQty==null){
				$("#nightplan").text('-');
				$("#nightperformance").text('-');
				$("#nightpl").text('-');
				$("#nightper").text('-');
			}else{
				$("#nightplan").text(res.pmPlanQty);
				$("#nightperformance").text((res.pmProdQty/res.pmPlanQty).toFixed(2)*100+'%');
				$("#nightpl").text(res.pmProdQty);
				$("#nightper").text(res.pmPlanQty);
			}
		

	})

	let findstorageurl = '/monitoring/findstorage';

	$.get(findstorageurl + '?' + $.param(params)).then(function(res) {
		let result = res;

		if (result.mtotalqty > 0) {
			$("#mqty").text(result.mtotalqty);
		} else {
			$("#mqty").text("-");
		}

		if (result.ptotalqty > 0) {
			$("#pqty").text(result.ptotalqty);
		} else {
			$("#pqty").text("-");
		}


	})

	let findrejecturl = '/monitoring/findreject';

	$.get(findrejecturl + '?' + $.param(params)).then(function(res) {
		let result = res;

		if(result==''||result==null){
			$("#failper").text('-');
			$("#failqty").text('-');
			$("#prodqty").text('-');
			$("#ri01").text('-');
			$("#ri02").text('-');
			$("#ri03").text('-');
			$("#ri04").text('-');
		}else{
			$("#failper").text((result.totalfailQty/result.totalprodQty).toFixed(2)*100+'%');
			$("#failqty").text(result.totalfailQty);
			$("#prodqty").text(result.totalprodQty);
			$("#ri01").text(result.ri01);
			$("#ri02").text(result.ri02);
			$("#ri03").text(result.ri03);
			$("#ri04").text(result.ri04);
		}
			
	})


	let findnotoperateurl = '/monitoring/findnotoperate';

	$.get(findnotoperateurl + '?' + $.param(params)).then(function(res) {
		let result = res;

		// 테이블 초기화
		$table = $('#notoperate');
		$table.bootstrapTable('removeAll');

		// 받아온 데이터를 테이블에 추가
		result.forEach(function(r) {
			$table.bootstrapTable('append', {

				lineid: r.lineid,
				notoperatetime: r.notoperatetimeFrom + "~" + r.notoperatetimeTo

			});
		});
		$table.bootstrapTable('hideLoading')
	})
}
