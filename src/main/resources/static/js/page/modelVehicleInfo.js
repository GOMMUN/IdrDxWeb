/**
 * 
 */
$(function(){
	
	setEventListener();
});

 function setEventListener (){
	 
	  $mvinfo = $("#mvinfo");

	 
	  $mvinfo.on('click-row.bs.table', function (row, $element, field) {
		aa($element);
	});
};
 
 function aa(data){
//	$("input[name=ruleid]").val(data.rulesysid);
	//$('#workDateDetail').datepicker("setDate",new Date(data.workDate))
	
	$("#modelid").val(data.modelid);
	$("#modelnm").val(data.modelnm);
	$("#modeldesc").val(data.modeldesc);
	$("#useyn").val(data.useyn);


}
