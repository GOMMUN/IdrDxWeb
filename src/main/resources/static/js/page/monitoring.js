/**
 * 
 */

let c_factory = null;
let c_line = null;
let data = s_monitor();

$(function() {
	factroy();
	line();
	setEventListener();
});


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

		let findproducturl = '/monitoring/findproduct';

		var params = {
			workDate: data.workDate,
			factoryid: data.factoryid,
			lineid: data.lineid

		}

		$.get(findproducturl + '?' + $.param(params)).then(function(res) {
			let result = res;
			if (result.length > 0) {
				$("#dayplan").text(result[0].planQty);
				$("#dayperformance").text(result[0].performancepercent + '%');
				$("#daypl").text(result[0].prodQty);
				$("#dayper").text(result[0].planQty);


				$("#nightplan").text(result[1].planQty);
				$("#nightperformance").text(result[1].performancepercent + '%');
				$("#nightpl").text(result[1].prodQty);
				$("#nightper").text(result[1].planQty);
			} else {
				$("#dayplan").text("데이터가없습니다");
				$("#dayperformance").text(0);
				$("#daypl").text(0);
				$("#dayper").text(0);


				$("#nightplan").text("데이터가없습니다");
				$("#nightperformance").text(0);
				$("#nightpl").text(0);
				$("#nightper").text(0);
			}


		})

		let findstorageurl = '/monitoring/findstorage';

		$.get(findstorageurl + '?' + $.param(params)).then(function(res) {
			let result = res;

			$("#mqty").text(result.mtotalqty);
			$("#pqty").text(result.ptotalqty);

		})

		let findrejecturl = '/monitoring/findreject';

		$.get(findrejecturl + '?' + $.param(params)).then(function(res) {
			let result = res;

			$("#failper").text(result.failpercent + '%');
			$("#failqty").text(result.totalfailQty);
			$("#prodqty").text(result.totalprodQty);
			$("#ri01").text(result.ri01);
			$("#ri02").text(result.ri02);
			$("#ri03").text(result.ri03);
			$("#ri04").text(result.ri04);

		})

		let findnotoperateurl = '/monitoring/findnotoperate';

		$.get(findnotoperateurl + '?' + $.param(params)).then(function(res) {
			let result = res;
			
		})
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

	var url = '/monitoring/findnotoperate'

	$.get(url + '?' + $.param(params.data)).then(function(res) {
		params.success(res)
	})
}
