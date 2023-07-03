/**
 * 
 */
$(function(){
	
	setEventListener();
});

 function setEventListener (){
	 
	  $workerinfo = $("#workerinfo");

	 
	  $workerinfo.on('click-row.bs.table', function (row, $element, field) {
		aa($element);
	});
};
 
 function aa(data){
//	$("input[name=ruleid]").val(data.rulesysid);
	//$('#workDateDetail').datepicker("setDate",new Date(data.workDate))
	
	$("#workerid").val(data.workerid);
	$("#workernm").val(data.workernm);
	$("#daynight").val(data.daynight);
	$("#useyn").val(data.useyn);


}
