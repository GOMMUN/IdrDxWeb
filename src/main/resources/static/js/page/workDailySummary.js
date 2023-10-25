/**
 * 
 */

$(function(){
	initSetting();
});

function initSetting() {
	localStorage.setItem("plant", $("#parameterPlant").val());
	localStorage.setItem("username", $("#parameterUsername").val());
}

