/**
 * 
 */
$(function(){
	setEventListener();
});

function setEventListener(){
	
	let $grid = $("#fairPerformance");							// 작업일보 그리드
	let $gridExcelBtn = $("#excelUpload");					// 작업일보 그리드 add 버튼
	
	let $modalUploadBtn = $("#excelUploadModalBtn");	
	
	
	
	$gridExcelBtn.click(function () {
		$('#excelUploadModal').modal('show');
	});
	
	$modalUploadBtn.click(function () {
		//$('#excelUploadModal').modal('show');
		let formData = new FormData($("#excelUploadForm")[0]);
		
		/* progressbar 정보 */
        let bar = $('.bar');
        let percent = $('.percent');
        let status = $('#status');
        
        $.ajax({
                type : 'POST',
                url : "/simullator/logisticsPerformance/excelUpload",
                dataType: 'text',
                data : formData,
                processData : false,
                contentType : false,
                beforeSend:function(){
                    // progress Modal 열기
                    $('#excelUploadModal').modal('hide');
                    $("#pleaseWaitDialog").modal('show');
// 
                    status.empty();
                    var percentVal = '0%';
                    bar.width(percentVal);
                    percent.html(percentVal);
                    
                    progress = setInterval(excelUploadProgress, 3000);
 
                },
                complete:function(){
                    // progress Modal 닫기
//                    $("#pleaseWaitDialog").modal('hide');
 
                },
                error:function(request,status,error){
//                    alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                },
                success:function(result, status) {
 					clearInterval(progress); 
 					$("#pleaseWaitDialog").modal('hide');
                    
                    $table = $("#fairPerformance");
					$table.bootstrapTable('refresh');
                    
                    alert("저장 되었습니다.");
                    
//                    location.href = getContextPath() + "/admin/board/boardList.do?";
                }
            });
 
	});
}

function excelUploadProgress(){
	/* progressbar 정보 */
    let bar = $('.bar');
    let percent = $('.percent');
    let status = $('#status');
        
    $.ajax({
	    type: "post",
	    url: "/simullator/logisticsPerformance/excelUploadPercent",
	    dataType :"text",
	    success : function(resultData){
			if(!isNaN(resultData)){
				bar.width(resultData+"%");
           		percent.html(resultData+"%");
			}
	    },
	    error: function(e){
	                    
	    }
	});                        
}