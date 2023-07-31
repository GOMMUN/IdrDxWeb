/**
 * 
 */
$(function() {
	init();
	setEventListener();

});
let data = null;

function setEventListener() {
	set();
}

function set() {
	
	let url='/anomalydetection/modify';
	
	let $value1 = $("#value1");
	let $value2 = $("#value2");
	let $set = $("#set");
	let data=initdata();
	$set.click(function() {
		data.value1=$value1.val();
		data.value2=$value2.val();
		
		$.ajax({
			url: url,
			type: 'PUT',
			data: JSON.stringify(data),
			dataType: "json",
			contentType: 'application/json; charset=utf-8',
			success: function(data) {
				alert("설정 되었습니다.");
			}
		});
	});



}

function init() {

	let $value1 = $("#value1");
	let $value2 = $("#value2");

	let url = '/anomalydetection/find';

	$.ajax({
		url: url,
		type: 'GET',
		data: JSON.stringify(data),
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(data) {
			data.forEach(function(res) {
				if (res.alarmType == 'UNDER-PRODUCTION') {
					$value1.val(res.value);
				} else if (res.alarmType == 'DEFECT-RATE') {
					$value2.val(res.value);
				}

			})
		}
	});
}

function initdata() {

	let data = {
		"alarmType": "", "typeName": "", "value": "","value1":"","value2":""
	};

	return data;
}