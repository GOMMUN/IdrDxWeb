/**
 * 
 */
let s_dataTrace = null;

$(function(){
	
	setEventListener();
});

function setEventListener (){
	let $gridM = $("#master");		
	let $grid = $("#data");	

	$gridM.on('check.bs.table', function (row, $element, field) {
	
		if ($gridM.bootstrapTable('getSelections').length == 1) {
			s_dataTrace = $element;
		} else {
			s_dataTrace = null;
		}

		if (s_dataTrace) {
			dataTrace($element);
		}
		
	});
	
};


function dataTrace(data) {
	var url = '/datatrace/find';

	var params = {
		exectid: data.exectid,
	}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#data");
		$table.bootstrapTable('removeAll');
		$table.bootstrapTable('append', res);
	})
}

