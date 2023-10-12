/**
 * 
 */

$(function() {
	search();
});

function search() {
	$(document).ready(function() {
	    // 오늘의 날짜를 얻습니다.
	    var today = new Date();
	    
	    // 날짜를 "YYYY-MM-DD" 형식으로 변환합니다.
	    var year = today.getFullYear();
	    var month = (today.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1이 필요하며, 두 자리 숫자로 만듭니다.
	    var day = today.getDate().toString().padStart(2, '0'); // 날짜도 두 자리 숫자로 만듭니다.
	    var formattedDate = year + '-' + month + '-' + day;
	    
	    // input 요소에 날짜를 설정합니다.
	    $('#startid').val(formattedDate);
	    $('#endid').val(formattedDate);
	});

	$("#endid").change(function() {
		var start = $("input[name=start]").val();
		var end = $("input[name=end]").val();

		var params = {
			start: start,
			end: end
		};


		let url = '/leadtime/search';

		openLoading();
		(async function() {
			try {
				const response = await fetch(url + '?' + new URLSearchParams(params));
				const res = await response.json();
				closeLoading();
				const $table = $('#table');
				$table.bootstrapTable('removeAll');

				// 받아온 데이터를 테이블에 추가
			res.forEach(function(r) {
				$table.bootstrapTable('append', {
					rownum: r.rownum,
					orderId: r.orderId,
					orderName: r.orderName,
					itemId: r.itemId,
					itemName: r.itemName,
					processName: r.processName,
					processTime: r.processTime,
					leadTime: r.leadTime,
					lossTime: r.lossTime

				});
			});
				$table.bootstrapTable('hideLoading');
			} catch (error) {
				console.error('Error:', error);
			}
		})();

/*
		$.get(url + '?' + $.param(params)).then(function(res) {
			$table = $('#table');
			$table.bootstrapTable('removeAll');

			// 받아온 데이터를 테이블에 추가
			res.forEach(function(r) {
				$table.bootstrapTable('append', {
					rownum: r.rownum,
					orderId: r.orderId,
					orderName: r.orderName,
					itemId: r.itemId,
					itemName: r.itemName,
					processName: r.processName,
					processTime: r.processTime,
					leadTime: r.leadTime,
					lossTime: r.lossTime

				});
			});
			$table.bootstrapTable('hideLoading')
		});
*/
	});


}


// 로딩창 키는 함수
function openLoading() {
	//화면 높이와 너비를 구합니다.
	let maskHeight = $(document).height();
	let maskWidth = window.document.body.clientWidth;
	//출력할 마스크를 설정해준다.
	let mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
	// 로딩 이미지 주소 및 옵션
	let loadingImg = '';
	loadingImg += "<div id='loadingImg' style='position:absolute; top: calc(50% - (200px / 2)); width:100%; z-index:99999999;'>";
	loadingImg += " <img src='/static/image/spinner2.gif' style='position: relative; display: block; margin: 0px auto;'/>";
	loadingImg += "</div>";
	//레이어 추가
	$('body')
		.append(mask)
		.append(loadingImg)
	//마스크의 높이와 너비로 전체 화면을 채운다.
	$('#mask').css({
		'width': maskWidth,
		'height': maskHeight,
		'opacity': '0.3'
	});
	//마스크 표시
	$('#mask').show();
	//로딩 이미지 표시
	$('#loadingImg').show();
}

// 로딩창 끄는 함수
function closeLoading() {
	$('#mask, #loadingImg').hide();
	$('#mask, #loadingImg').empty();
}
