var currYardLine = 20;
var yardsGained = 15;

$(document).ready(function(){
		
	function drawRun(){
		var canvas = $('#field')[0];
		var context = canvas.getContext('2d');
		var currStartYardLine = (currYardLine*6)+88;
		var newStartYardLine = (6*yardsGained) + currStartYardLine;
		context.beginPath();
		context.lineWidth = 5;
		context.moveTo(currStartYardLine,200);
		context.lineTo((6*yardsGained)+currStartYardLine,200);
		context.stroke();
	}
	function drawPass(){
		var canvas = $('#field')[0];
		var context = canvas.getContext('2d');
		var currStartYardLine = (currYardLine*6)+88;
		var newStartYardLine = (6*yardsGained) + currStartYardLine;
		context.beginPath();
		context.lineWidth = 5;
		context.moveTo(currStartYardLine,200);
		context.bezierCurveTo(currStartYardLine,180,currStartYardLine+(6*yardsGained),180,currStartYardLine+(6*yardsGained),200)
		context.stroke();

	}
	
$('#big-back').click(function(){
	drawRun();
	currYardLine += yardsGained;
})
$('#big-receiver').click(function(){
	drawPass();
	currYardLine += yardsGained;
})

})