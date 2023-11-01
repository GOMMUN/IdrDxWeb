/**
 * 
 */

let planqtySum;
let firsttimegoodqtySum;
let firsttimefailqtySum;

$(function(){
	initSetting();
});

function initSetting() {
	localStorage.setItem("plant", $("#parameterPlant").val());
	localStorage.setItem("username", $("#parameterUsername").val());
	
}


function planqtySumFormatter(data) {
	field = this.field;
    planqtySum = data.map(function (row) {
      return (row[field] ? +row[field] : 0); // 데이터가 null인 경우 0으로 대체
    }).reduce(function (sum, i) {
      return sum + i
    }, 0);
    
    return planqtySum;
}

function firsttimegoodqtySumFormatter(data) {
	field = this.field;
	firsttimegoodqtySum =  data.map(function (row) {
       return (row[field] ? +row[field] : 0); // 데이터가 null인 경우 0으로 대체
    }).reduce(function (sum, i) {
      return sum + i
    }, 0);
    
    return firsttimegoodqtySum;
}

function firsttimefailqtySumFormatter(data) {
	field = this.field;
	firsttimefailqtySum = data.map(function (row) {
       return (row[field] ? +row[field] : 0); // 데이터가 null인 경우 0으로 대체
    }).reduce(function (sum, i) {
      return sum + i
    }, 0);
    
    return firsttimefailqtySum;
}

function percent1Formatter() {

	return ((firsttimegoodqtySum/planqtySum)*100).toFixed(2);
}

function percent2Formatter() {
	
	return ((firsttimefailqtySum/(firsttimefailqtySum+firsttimegoodqtySum))*100).toFixed(2);
}
