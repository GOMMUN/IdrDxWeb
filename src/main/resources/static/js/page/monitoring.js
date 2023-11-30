/**
 * 
 */

$(function() {
	init();
	setEventListener();
});

function init() {
	factroy();
	$('#date').val(getToday());


	$search = $("#search");
	$search.trigger('click');
}

function setEventListener() {
	$search = $("#search");
	$factoryCodes = $("#factoryCodes");
	$date = $("#date");

	$factoryCodes.change(function() {

		getmatarial();

	});

	$search.click(function() {

		$matarialCode = $("#matarialCode");
		var selectedMaterial = $matarialCode.val();

		var params = {
			workDate: $date.val(),
			factoryid: $factoryCodes.val(),
			materialid: selectedMaterial
		};

		planam(params);
		planpm(params);
		rejectper(params);
		eqoperate(params);
	});

}

function planam(params) {
	let url = '/monitoring/planAM';

	$.ajax({
		url: url,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(params),
		success: function(data) {
			if (data.per != null) {
				$("#prodqtyam").text(data.prodQty);
				$("#goodqtyam").text(data.goodQty);
				$("#peram").text(data.per.substring(0, 4) + "%");
			} else {
				$("#prodqtyam").text("-");
				$("#goodqtyam").text("-");
				$("#peram").text("-");
			}

		}
	});
}

function planpm(params) {
	let url = '/monitoring/planPM';

	$.ajax({
		url: url,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(params),
		success: function(data) {
			if (data.per != null) {
				$("#prodqtypm").text(data.prodQty);
				$("#goodqtypm").text(data.goodQty);
				$("#perpm").text(data.per.substring(0, 4) + "%");
			} else {
				$("#prodqtypm").text("-");
				$("#goodqtypm").text("-");
				$("#perpm").text("-");
			}
		}
	});
}

function rejectper(params) {
	let url = '/monitoring/rejectper';

	$.ajax({
		url: url,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(params),
		success: function(data) {
			if (data.per != null) {
				$("#rejectper").text(data.per.substring(0, 3) + "%");
			} else {
				$("#rejectper").text("-");
			}


		}
	});
}

function eqoperate(params) {
	let url = '/monitoring/uptime';
	$.ajax({
		url: url,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(params),
		success: function(data) {
			if (data != '') {
				$("#eqoperate").text(data.substring(0, 4) + "%");
			} else {
				$("#eqoperate").text("-");
			}


		}
	});
}
function getmatarial() {
	let url = '/materialmaster/find';
	$.ajax({
		url: url,
		type: 'GET',
		success: function(data) {
			let materials = data;

			$matarialCode = $("#matarialCode");
			$matarialCode.empty();

			// factoryCode와 factoryId가 일치하는 데이터 필터링
			let matchingMaterials = materials.filter(function(material) {
				return material.factoryid === $factoryCodes.val();
			});

			// dropdown에 일치하는 데이터 추가
			matchingMaterials.forEach(function(material) {
				$matarialCode.append($('<option>', {
					value: material.materialid,
					text: material.materialname
				}));
			});
		},
		error: function(error) {
			console.error('Error fetching material data:', error);
		}
	});
}

function factroy() {
	let url = '/code/factory';

	factorys = null;

	$.ajax({
		url: url,
		type: 'GET',
		success: function(data) {
			factorys = data;

			let $dropdown = $("#factoryCodes");
			$dropdown.empty();

			if (factorys) {
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
	getmatarial();
}

function getToday() {
	var date = new Date();
	var year = date.getFullYear();
	var month = ("0" + (1 + date.getMonth())).slice(-2);
	var day = ("0" + date.getDate()).slice(-2);

	return year + "-" + month + "-" + day;
}