var currYardLine = 20;
var bigRunnerEnergy = 100;
var medRunnerEnergy = 100;
var smallRunnerEnergy = 100;
var bigReceiverEnergy = 100;
var medReceiverEnergy = 100;
var smallReceiverEnergy = 100;
$(document).ready(function(){
		
	function drawRun(yards){
		var canvas = $('#field')[0];
		var context = canvas.getContext('2d');
		var currStartYardLine = (currYardLine*6)+88;
		var newStartYardLine = (6*yards) + currStartYardLine;
		context.beginPath();
		context.lineWidth = 10;
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
		context.lineWidth = 10;
		context.moveTo(currStartYardLine,200);
		context.bezierCurveTo(currStartYardLine,180,currStartYardLine+(6*yards),180,currStartYardLine+(6*yards),200)
		context.stroke();
	};
	function checkTouchdown(position){
		if(position>=100){
			$('#home-score').text(Number($('#home-score').text())+7);
			alert('TOUCHDOWN!!!')
			currYardLine = 20;
			var canvas = $('#field')[0];
			var context = canvas.getContext('2d');
			context.clearRect(0,0,1000,1000);

		}
	}
	
	$('#big-back').click(function(){	
		var yards = 50;
		drawRun(yards);
		currYardLine += yards;
		checkTouchdown(currYardLine);
	});
	$('#med-back').click(function(){
		var yards = 7;
		drawRun(yards);
		currYardLine += yards;
		checkTouchdown(currYardLine);
	});
	$('#small-back').click(function(){
		var yards = 3;
		drawRun(yards);
		currYardLine += yards;
		checkTouchdown(currYardLine);
	});
	$('#big-receiver').click(function(){
		var yards = 25;
		drawPass(yards);
		currYardLine += yards;
		checkTouchdown(currYardLine);
	});
	$('#med-receiver').click(function(){
		var yards = 15;
		drawPass(yards);
		currYardLine += yards;
		checkTouchdown(currYardLine);
	});
	$('#small-receiver').click(function(){
		var yards = 5;
		drawPass(yards);
		currYardLine += yards;
		checkTouchdown(currYardLine);
	});

});








