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

		$.get(url + '?' + $.param(params)).then(function(res) {
			$table = $('#table');
			$table.bootstrapTable('removeAll');

			// 받아온 데이터를 테이블에 추가
			res.forEach(function(r) {
				$table.bootstrapTable('append', {
					rownum:r.rownum,
					orderName: r.orderName,
					itemId:  r.itemId,
					itemName: r.itemName,
					totalProcessNum: r.totalProcessNum,
					processPerNum: r.processPerNum,
					badNum: r.badNum ,
					remaining: r.remaining,
					startTime: r.startTime,
					endTime: r.endTime,
					takenTime: r.takenTime,
					delivery: r.delivery,
					deliveryRate: r.deliveryRate+'%',

				});
			});
			$table.bootstrapTable('hideLoading')
		});

	});


}


