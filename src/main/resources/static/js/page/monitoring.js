/**
 * 
 */

let c_factory = null;
let c_line = null;
let data = s_monitor();
let result = null;

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

		let url = '/monitoring/find';

		var params = {
			workDate: data.workDate,
			factoryid: data.factoryid,
			lineid: data.lineid

		}

		$.get(url + '?' + $.param(params)).then(function(res) {
			result = res;

			result.forEach(element => {
				if (element.shiftid.includes('AM', 4)) {
					$("#dayplan").text(element.planQty);
					let dayper=(element.prodQty/ element.planQty)*100;
					$("#dayperformance").text(dayper+'%');
					$("#daypl").text(element.prodQty);
					$("#dayper").text(element.planQty);
				}else{
					$("#nightplan").text(element.planQty);
					let nightper=(element.prodQty/ element.planQty)*100;
					$("#nightperformance").text(nightper+'%');
					$("#nightpl").text(element.prodQty);
					$("#nightper").text(element.planQty);
				}
			});


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