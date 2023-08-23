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
					생산계획명: r.생산계획명,
					자재코드:  r.자재코드,
					자재명: r.자재명,
					총공정수: r.총공정수,
					공정수행횟수: r.공정수행횟수,
					불량횟수: r.불량횟수 ,
					남은횟수: r.남은횟수,
					시작시간: r.시작시간,
					종료시간: r.종료시간,
					소요시간: r.소요시간,
					납기: r.납기,
					납기준수율: r.납기준수율+'%',

				});
			});
			$table.bootstrapTable('hideLoading')
		});

	});


}


