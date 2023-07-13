/**
 * 
 */
$(function() {

	setEventListener();
});
let data = null;
function setEventListener() {
	set();
}

function set() {
	let $type = $("#alarmType");
	let $typename = $("#typeName");
	let $valuesetting = $("#value");
	let $set = $("#set");


	$set.click(function() {
		data = init();
		data.alarmType = $("input[name=alarmType]").val();
		data.typeName = $("input[name=typeName]").val();
		data.value = $("input[name=value]").val();

		
		let url = '/anomalydetection/modify';

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

	let data = {
		"alarmType": "", "typeName": "", "value": ""
	};

	return data;
}