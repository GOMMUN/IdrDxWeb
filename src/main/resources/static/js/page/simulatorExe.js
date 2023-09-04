/**
 * 
 */

$(function() {
	initSetting();
});

function initSetting() {
	var url = "test://";
   	var exec = document.createElement("a");
    exec.setAttribute("href", url);
    exec.click();
}
