var currYardLine = 20;

$(document).ready(function(){
		
	function drawRun(yards){
		var canvas = $('#field')[0];
		var context = canvas.getContext('2d');
		var currStartYardLine = (currYardLine*6)+88;
		var newStartYardLine = (6*yards) + currStartYardLine;
		context.beginPath();
		context.lineWidth = 5;
		context.moveTo(currStartYardLine,200);
		context.lineTo((6*yards)+currStartYardLine,200);
		context.stroke();
	}
	function drawPass(yards){
		var canvas = $('#field')[0];
		var context = canvas.getContext('2d');
		var currStartYardLine = (currYardLine*6)+88;
		var newStartYardLine = (6*yards) + currStartYardLine;
		context.beginPath();
		context.lineWidth = 5;
		context.moveTo(currStartYardLine,200);
		context.bezierCurveTo(currStartYardLine,180,currStartYardLine+(6*yards),180,currStartYardLine+(6*yards),200)
		context.stroke();

	}
	
$('#big-back').click(function(){
	var yards = 10;
	drawRun(yards);
	currYardLine += yards;
})
$('#med-back').click(function(){
	var yards = 7;
	drawRun(yards);
	currYardLine += yards;
})
$('#small-back').click(function(){
	var yards = 3;
	drawRun(yards);
	currYardLine += yards;
})
$('#big-receiver').click(function(){
	var yards = 25;
	drawPass(yards);
	currYardLine += yards;
})
$('#med-receiver').click(function(){
	var yards = 15;
	drawPass(yards);
	currYardLine += yards;
})
$('#small-receiver').click(function(){
	var yards = 5;
	drawPass(yards);
	currYardLine += yards;
})

})