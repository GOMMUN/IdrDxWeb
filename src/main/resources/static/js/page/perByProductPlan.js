/**
 * 
 */

$(function() {
	search();
});

function search() {


	$("#endid").change(function() {
		var start = $("input[name=start]").val();
		var end = $("input[name=end]").val();

		var params = {
			start: start,
			end: end
		};


		let url = '/perbyproductplan/search';

		openLoading();
		(async function() {
			try {
				const response = await fetch(url + '?' + new URLSearchParams(params));
				const res = await response.json();
				closeLoading();
				const $table = $('#table');
				$table.bootstrapTable('removeAll');

				res.forEach(function(r) {
				$table.bootstrapTable('append', {
					rownum: r.rownum,
					orderName: r.orderName,
					itemId: r.itemId,
					itemName: r.itemName,
					totalProcessNum: r.totalProcessNum,
					processPerNum: r.processPerNum,
					badNum: r.badNum,
					remaining: r.remaining,
					startTime: r.startTime,
					endTime: r.endTime,
					takenTime: r.takenTime,
					delivery: r.delivery,
					deliveryRate: r.deliveryRate + '%',

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
					orderName: r.orderName,
					itemId: r.itemId,
					itemName: r.itemName,
					totalProcessNum: r.totalProcessNum,
					processPerNum: r.processPerNum,
					badNum: r.badNum,
					remaining: r.remaining,
					startTime: r.startTime,
					endTime: r.endTime,
					takenTime: r.takenTime,
					delivery: r.delivery,
					deliveryRate: r.deliveryRate + '%',

				});
			});
			$table.bootstrapTable('hideLoading')
		});*/

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
