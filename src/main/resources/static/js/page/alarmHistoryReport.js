
$(function() {

	init();
	setEventListener();
});

function init() {
	BtnClick($('#monthBtn')[0]);
	factroy();

	$search = $("#search");
	$search.trigger('click');
}

function setEventListener() {
	$search = $("#search");
	$factoryCodes = $("#factoryCodes");
	$start = $("#start");
	$end = $("#end");

	$factoryCodes.change(function() {

		getmatarial();

	});

	$search.click(function() {

		$matarialCode = $("#matarialCode");
		var selectedMaterial = $matarialCode.val();
		var params = {
			start: $start.val(),
			end: $end.val(),
			factoryid: $factoryCodes.val(),
			materialid: selectedMaterial
		};


		planajax(params);
		qualityajax(params);
		facilityajax(params);
	});

}

function planajax(params) {
	let url = '/alarmHistoryReport/planfind';

	$.ajax({
		url: url,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(params),
		success: function(data) {
			$table = $('#plantable');
			$table.bootstrapTable('removeAll');

			// 받아온 데이터를 테이블에 추가
			data.forEach(function(r) {
				$table.bootstrapTable('append', {
					factoryid: r.factoryid,
					matarial: r.materialname,
					noticetime: r.noticetime,
					ea1: r.ea1,
					ea2: r.ea2,
					value: r.value,

				});
			});
		}
	});
}

function qualityajax(params) {
	let url = '/alarmHistoryReport/quality';

	$.ajax({
		url: url,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(params),
		success: function(data) {
			$table = $('#quality');
			$table.bootstrapTable('removeAll');

			// 받아온 데이터를 테이블에 추가
			data.forEach(function(r) {
				$table.bootstrapTable('append', {
					factoryid: r.factoryid,
					matarial: r.materialname,
					noticetime: r.noticetime,
					ea1: r.ea1,
					ea2: r.ea2,
					value: r.value,

				});
			});
		}
	});
}

function facilityajax(params) {
	let url = '/alarmHistoryReport/facility';

	$.ajax({
		url: url,
		type: 'POST',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(params),
		success: function(data) {
			$table = $('#facility');
			$table.bootstrapTable('removeAll');

			// 받아온 데이터를 테이블에 추가
			data.forEach(function(r) {
				$table.bootstrapTable('append', {
					factoryid: r.factoryid,
					matarial: r.materialname,
					noticetime: r.noticetime,
					reason: r.reason

				});
			});
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

function BtnClick(btn) {
	var today = new Date();
	var startDate, endDate;
	dateBtnClick(btn);
	switch (btn.id) {
		case 'todayBtn':
			startDate = formatDate(today);
			endDate = formatDate(today);
			break;
		case 'weekBtn':
			var weekAgo = new Date(today);
			weekAgo.setDate(today.getDate() - 7);
			startDate = formatDate(weekAgo);
			endDate = formatDate(today);
			break;
		case 'monthBtn':
			var monthAgo = new Date(today);
			monthAgo.setMonth(today.getMonth() - 1);
			startDate = formatDate(monthAgo);
			endDate = formatDate(today);
			break;
		case 'threeMonthsBtn':
			var threeMonthsAgo = new Date(today);
			threeMonthsAgo.setMonth(today.getMonth() - 3);
			startDate = formatDate(threeMonthsAgo);
			endDate = formatDate(today);
			break;
		case 'sixMonthsBtn':
			var sixMonthsAgo = new Date(today);
			sixMonthsAgo.setMonth(today.getMonth() - 6);
			startDate = formatDate(sixMonthsAgo);
			endDate = formatDate(today);
			break;
		default:
			startDate = formatDate(today);
			endDate = formatDate(today);
			break;
	}

	$('#start').val(startDate);
	$('#end').val(endDate);
}


function formatDate(date) {
	var year = date.getFullYear();
	var month = ("0" + (1 + date.getMonth())).slice(-2);
	var day = ("0" + date.getDate()).slice(-2);
	return year + "-" + month + "-" + day;
}

// 체크박스 전체선택
function checkAll(source, tabClass) {
	var checkboxes = document.querySelectorAll(`.${tabClass} .rule-content-check input[type="checkbox"]`);
	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i].checked = source.checked;
	}
}

// 체크박스 전체선택 감시
function updateCheckAll(tabClass) {
	const checkboxes = document.querySelectorAll(`.${tabClass} .rule-content-check input[type="checkbox"]`);
	const checkAll = document.getElementById(`${tabClass}-all`);
	const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
	checkAll.checked = allChecked;
}

// date조회 버튼 스타일
function dateBtnClick(source) {
	const btns = document.querySelectorAll('.alarm-history .search-card-wrap .date-btn-group button')
	for (var i = 0; i < btns.length; i++) {
		btns[i].classList.remove('custom-btn-active')
	}
	source.classList.add('custom-btn-active')
}