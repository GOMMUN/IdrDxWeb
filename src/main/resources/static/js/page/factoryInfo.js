/**
 * 
 */
$(function(){
	
	setEventListener();
});

 function setEventListener (){
	 
	  $factoryinfo = $("#factoryinfo");

	 
	  $factoryinfo.on('click-row.bs.table', function (row, $element, field) {
		aa($element);
	});
};
 
 function aa(data){
//	$("input[name=ruleid]").val(data.rulesysid);
	//$('#workDateDetail').datepicker("setDate",new Date(data.workDate))
	
	$("#companyid").val(data.companyid);
	$("#factoryid").val(data.factoryid);
	$("#factoryname").val(data.factoryname);
	$("#description").val(data.description);
	$("#erpplant").val(data.erpplant);
	$("#factorytype").val(data.factorytype);
	$("#creator").val(data.creator);
	$("#isusable").val(data.isusable);
	$("#tid").val(data.tid);

}
