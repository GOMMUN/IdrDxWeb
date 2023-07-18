/**
 * 안성민 - 이화면은 사용 할지 몰라서 일단은 조회성으로만 만듬
 */
$(function(){
	
	setEventListener();
});

function setEventListener (){	 
	let $grid = $("#scenarioList");				//scenarioList 조회
	let $gridGroup = $("#scenarioGroup");		//scenarioGroup 조회
	let $gridAddBtn = $("#addDvcModel");		//행추가
	let $gridSaveBtn = $("#saveDvcModel");		//수정
	let $gridRemoveBtn = $("#removeDvcModel");	//삭제

	$grid.on('check.bs.table', function (row, $element, field) {	//axis조회
	
		if ($grid.bootstrapTable('getSelections').length == 1) {
			s_sgroup = $element;
		} else {
			s_sgroup = null;
		}

		if (s_sgroup) {
			sgroup($element);
		}
		
		gridData($element);
	});		

};

function sgroup(data) {
	var url = '/scenario/find2';

	var params = {
		scenarioid: data.scenarioid,
	}

	$.get(url + '?' + $.param(params)).then(function(res) {
		$table = $("#scenarioGroup");
		$table.bootstrapTable('removeAll');
		$table.bootstrapTable('append', res);
	})
}

function gridData(data){ //Axis 값 수정 불가
	if(data.axisid){
		$("#axisid").val(data.axisid);
		$("#axisnm").val(data.axisnm);
		$("#groupingid").val(data.groupingid);
		$("#groupingnm").val(data.groupingnm);
	}else{
		$("#groupingid").val(data.groupingid);
		$("#groupingnm").val(data.groupingnm);
	}


}
