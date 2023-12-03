/**
 * 
 */
$(function() {
	init();
	setEventListener();

});
let data = null;

function init(){
	findAlarmSetting();
	findNelsonruleSetting();
}

function setEventListener() {
	
	$("#save").click(function() {
		save();
	});
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

function save() {
	
	let url='/anomalydetection/modify';
	
	let data=initdata();
	
	data.value1= $("#value1").val();
	data.value2= $("#value2").val();
	
	if($("#flexSwitchCheckChecked").is(':checked')) data.value3="1";
		
	// nelsonrul checkbox
	if($("#production-check01").is(':checked')) data.prodNelsonRule1="Y";
	if($("#production-check02").is(':checked')) data.prodNelsonRule2="Y";
	if($("#production-check03").is(':checked')) data.prodNelsonRule3="Y";
	if($("#production-check04").is(':checked')) data.prodNelsonRule4="Y";
	if($("#production-check05").is(':checked')) data.prodNelsonRule5="Y";
	if($("#production-check06").is(':checked')) data.prodNelsonRule6="Y";
	if($("#production-check07").is(':checked')) data.prodNelsonRule7="Y";
	if($("#production-check08").is(':checked')) data.prodNelsonRule8="Y";
	
	if($("#quality-check01").is(':checked')) data.failNelsonRule1="Y";
	if($("#quality-check02").is(':checked')) data.failNelsonRule2="Y";
	if($("#quality-check03").is(':checked')) data.failNelsonRule3="Y";
	if($("#quality-check04").is(':checked')) data.failNelsonRule4="Y";
	if($("#quality-check05").is(':checked')) data.failNelsonRule5="Y";
	if($("#quality-check06").is(':checked')) data.failNelsonRule6="Y";
	if($("#quality-check07").is(':checked')) data.failNelsonRule7="Y";
	if($("#quality-check08").is(':checked')) data.failNelsonRule8="Y";
	
	//	id="quality-length02"
	data.prodRule2Length = $("#production-length02").val(); 
	data.prodRule3Length = $("#production-length03").val(); 
	data.prodRule4Length = $("#production-length04").val(); 
	data.prodRule5Length = $("#production-length05").val();
	data.prodRule5Limit = $("#production-limit05").val(); 
	data.prodRule6Length = $("#production-length06").val(); 
	data.prodRule6Limit = $("#production-limit06").val(); 
	data.prodRule7Length = $("#production-length07").val(); 
	data.prodRule8Length = $("#production-length08").val();
	
	data.failRule2Length = $("#quality-length02").val();  
	data.failRule3Length = $("#quality-length03").val(); 
	data.failRule4Length = $("#quality-length04").val();  
	data.failRule5Length = $("#quality-length05").val(); 
	data.failRule5Limit = $("#quality-limit05").val(); 
	data.failRule6Length = $("#quality-length06").val();  
	data.failRule6Limit = $("#quality-limit06").val(); 
	data.failRule7Length = $("#quality-length07").val();  
	data.failRule8Length = $("#quality-length08").val(); 

	if(validation(data)){
		alert("Rule Default 값 확인");
		return;
	}

	$.ajax({
		url: url,
		type: 'PUT',
		data: JSON.stringify(data),
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(data) {
			alert("설정 되었습니다.");
			findAlarmSetting();
		}
	});
	
}

function findAlarmSetting() {

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
				} else if(res.alarmType == 'NOTOPERATE-PRESS'){
					if(res.value == 1){
						$('#flexSwitchCheckChecked').prop('checked',true);
					}else{
						$('#flexSwitchCheckChecked').prop('checked',false);
					}
					
				}

			})
		}
	});
}

function findNelsonruleSetting(){

	let url = '/anomalydetection/findN';

	$.ajax({
		url: url,
		type: 'GET',
		data: JSON.stringify(data),
		dataType: "json",
		contentType: 'application/json; charset=utf-8',
		success: function(data) {
			data.forEach(function(res) {
				 
				if(res.alarmType == "UNDER-PRODUCTION" && res.nelsonRule == 1){
					if(res.ischecked == "Y"){
						$('#production-check01').prop('checked',true);
					}else{
						$('#production-check01').prop('checked',false);
					}
				}else if(res.alarmType == "UNDER-PRODUCTION" && res.nelsonRule == 2){
					if(res.ischecked == "Y"){
						$('#production-check02').prop('checked',true);
					}else{
						$('#production-check02').prop('checked',false);
					}
					
					$("#production-length02").val(res.length); 
				}else if(res.alarmType == "UNDER-PRODUCTION" && res.nelsonRule == 3){
					if(res.ischecked == "Y"){
						$('#production-check03').prop('checked',true);
					}else{
						$('#production-check03').prop('checked',false);
					}
					$("#production-length03").val(res.length); 
				}else if(res.alarmType == "UNDER-PRODUCTION" && res.nelsonRule == 4){
					if(res.ischecked == "Y"){
						$('#production-check04').prop('checked',true);
					}else{
						$('#production-check04').prop('checked',false);
					}
					$("#production-length04").val(res.length); 
				}else if(res.alarmType == "UNDER-PRODUCTION" && res.nelsonRule == 5){
					if(res.ischecked == "Y"){
						$('#production-check05').prop('checked',true);
					}else{
						$('#production-check05').prop('checked',false);
					}
					$("#production-length05").val(res.length); 
					$("#production-limit05").val(res.limit); 
				}else if(res.alarmType == "UNDER-PRODUCTION" && res.nelsonRule == 6){
					if(res.ischecked == "Y"){
						$('#production-check06').prop('checked',true);
					}else{
						$('#production-check06').prop('checked',false);
					}
					$("#production-length06").val(res.length); 
					$("#production-limit06").val(res.limit); 
				}else if(res.alarmType == "UNDER-PRODUCTION" && res.nelsonRule == 7){
					if(res.ischecked == "Y"){
						$('#production-check07').prop('checked',true);
					}else{
						$('#production-check07').prop('checked',false);
					}
					$("#production-length07").val(res.length);
				}else if(res.alarmType == "UNDER-PRODUCTION" && res.nelsonRule == 8){
					if(res.ischecked == "Y"){
						$('#production-check08').prop('checked',true);
					}else{
						$('#production-check08').prop('checked',false);
					}
					$("#production-length08").val(res.length);
				}
				
				else if(res.alarmType == "DEFECT-RATE" && res.nelsonRule == 1){
					if(res.ischecked == "Y"){
						$('#quality-check01').prop('checked',true);
					}else{
						$('#quality-check01').prop('checked',false);
					}
				}else if(res.alarmType == "DEFECT-RATE" && res.nelsonRule == 2){
					if(res.ischecked == "Y"){
						$('#quality-check02').prop('checked',true);
					}else{
						$('#quality-check02').prop('checked',false);
					}
					$("#quality-length02").val(res.length); 
				}else if(res.alarmType == "DEFECT-RATE" && res.nelsonRule == 3){
					if(res.ischecked == "Y"){
						$('#quality-check03').prop('checked',true);
					}else{
						$('#quality-check03').prop('checked',false);
					}
					$("#quality-length03").val(res.length); 
				}else if(res.alarmType == "DEFECT-RATE" && res.nelsonRule == 4){
					if(res.ischecked == "Y"){
						$('#quality-check04').prop('checked',true);
					}else{
						$('#quality-check04').prop('checked',false);
					}
					$("#quality-length04").val(res.length); 
				}else if(res.alarmType == "DEFECT-RATE" && res.nelsonRule == 5){
					if(res.ischecked == "Y"){
						$('#quality-check05').prop('checked',true);
					}else{
						$('#quality-check05').prop('checked',false);
					}
					$("#quality-length05").val(res.length); 
					$("#quality-limit05").val(res.limit); 
				}else if(res.alarmType == "DEFECT-RATE" && res.nelsonRule == 6){
					if(res.ischecked == "Y"){
						$('#quality-check06').prop('checked',true);
					}else{
						$('#quality-check06').prop('checked',false);
					}
					$("#quality-length06").val(res.length); 
					$("#quality-limit06").val(res.limit); 
				}else if(res.alarmType == "DEFECT-RATE" && res.nelsonRule == 7){
					if(res.ischecked == "Y"){
						$('#quality-check07').prop('checked',true);
					}else{
						$('#quality-check07').prop('checked',false);
					}
					$("#quality-length07").val(res.length);
				}else if(res.alarmType == "DEFECT-RATE" && res.nelsonRule == 8){
					if(res.ischecked == "Y"){
						$('#quality-check08').prop('checked',true);
					}else{
						$('#quality-check08').prop('checked',false);
					}
					$("#quality-length08").val(res.length);
				} 
			})
		}
	});
}

function initdata() {

	let data = {
		"value1":"0","value2":"0","value3": "0",
		"prodNelsonRule1":"N","prodNelsonRule2":"N","prodNelsonRule3":"N","prodNelsonRule4":"N",
		"prodNelsonRule5":"N","prodNelsonRule6":"N","prodNelsonRule7":"N","prodNelsonRule8":"N",
		"prodRule2Length": "7", "prodRule3Length": "5", "prodRule4Length": "10", "prodRule5Length": "3",
		"prodRule5Limit": "2","prodRule6Length": "4","prodRule6Limit": "3","prodRule7Length": "11","prodRule8Length": "6",
		"failNelsonRule1":"N","failNelsonRule2":"N","failNelsonRule3":"N","failNelsonRule4":"N",
		"failNelsonRule5":"N","failNelsonRule6":"N","failNelsonRule7":"N","failNelsonRule8":"N",
		"failRule2Length": "7", "failRule3Length": "5", "failRule4Length": "10", "failRule5Length": "3",
		"failRule5Limit": "2","failRule6Length": "4","failRule6Limit": "3","failRule7Length": "11","failRule8Length": "6"
	};

	return data;
}

function validation(data){
	let flag = false;
	
	if(!flag){
		if(data.prodRule2Length < 9){flag = true;}
	}
	if(!flag){
		if(data.prodRule3Length < 6){flag = true;} 
	}
	if(!flag){
		if(data.prodRule4Length < 14) {flag = true;} 
	}
	if(!flag){
		if(data.prodRule5Length < 3 && data.prodRule5Limit < 2) {flag = true;}  
	}
	if(!flag){
		if(data.prodRule6Length < 5 && data.prodRule6Limit < 4) {flag = true;} 
	}
	if(!flag){
		if(data.prodRule7Length < 14){flag = true;} 
	}
	if(!flag){
		if(data.prodRule8Length < 8){flag = true;} 
	}
	if(!flag){
		if(data.failRule2Length < 9){flag = true;}
	}
	if(!flag){
		if(data.failRule3Length < 6){flag = true;} 
	}
	if(!flag){
		if(data.failRule4Length < 14){flag = true;} 
	}
	if(!flag){
		if(data.failRule5Length < 3 && data.prodRule5Limit < 2) {flag = true;} 
	}
	if(!flag){
		if(data.failRule6Length < 5 && data.prodRule6Limit < 4){flag = true;} 
	}
	if(!flag){
		if(data.failRule7Length < 14){flag = true;} 
	}
	if(!flag){
		if(data.failRule8Length < 8){flag = true;} 
	}
	return flag;
}