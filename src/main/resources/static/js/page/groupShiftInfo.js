/**
 * 
 */
$(function(){
	
	setEventListener();
});

 function setEventListener (){
	 
	  $shiftinfo = $("#shiftinfo");

	 
	  $shiftinfo.on('click-row.bs.table', function (row, $element, field) {
		aa($element);
	});
};
 
 function aa(data){
//	$("input[name=ruleid]").val(data.rulesysid);
	//$('#workDateDetail').datepicker("setDate",new Date(data.workDate))
	
	$("#shiftid").val(data.shiftid);
	$("#shiftname").val(data.shiftname);
	$("#shifttype").val(data.shifttype);
	$("#starttime").val(data.starttime);
	$("#endtime").val(data.endtime);
	$("#isusable").val(data.isusable);

}
