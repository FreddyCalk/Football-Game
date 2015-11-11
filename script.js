	
$(document).ready(function(){
	var currYardLine = 20;
	// var bigRunnerEnergy = 100;
	// var medRunnerEnergy = 100;
	// var smallRunnerEnergy = 100;
	// var bigReceiverEnergy = 100;
	// var medReceiverEnergy = 100;
	// var smallReceiverEnergy = 100;
	var currDown = 1;
	var firstDownMarker = currYardLine + 10;
	var yardsToGo = 10;

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
		context.bezierCurveTo(currStartYardLine,180,currStartYardLine+(6*yards),180,currStartYardLine+(6*yards),200);
		context.stroke();
	};
	function drawAwayPass(yards){
		var canvas = $('#field')[0];
		var context = canvas.getContext('2d');
		var currStartYardLine = currYardLine*6+88;
		var newStartYardLine = (-6*yards) +currStartYardLine;
		context.beginPath();
		context.lineWidth = 10;
		context.moveTo(currStartYardLine,200);
		context.bezierCurveTo(currStartYardLine,180,currStartYardLine-(6*yards),180,currStartYardLine-(6*yards),200);
		context.stroke();
	}
	function drawAwayRun(yards){
		var canvas = $('#field')[0];
		var context = canvas.getContext('2d');
		var currStartYardLine = (6*currYardLine)+88;
		var newStartYardLine = (-6*yards) + currStartYardLine;
		context.beginPath();
		context.lineWidth = 10;
		context.moveTo(currStartYardLine,200);
		context.lineTo((-6*yards)+currStartYardLine,200);
		context.stroke();
	}
	function clearField(){
		var canvas = $('#field')[0];
		var context = canvas.getContext('2d');
		context.clearRect(0,0,1000,1000);
	}
	function checkTouchdown(position){
		if(position>=100){
			$('#home-score').text(Number($('#home-score').text())+7);
			alert('TOUCHDOWN!!!')
			currYardLine = 80;
			firstDownMarker = currYardLine - 10;
			currDown = 1;
			yardsToGo = 10;
			$('#down').text(currDown);
			clearField();
			$('#yards-to-go').text(yardsToGo);			
			$('.button').attr('poss', 'away')
		}else if(position<=0){
			$('#away-score').text(Number($('#away-score').text())+7);
			alert('The Visitor has Scored');
			currYardLine = 20;
			firstDownMarker = currYardLine + 10;
			currDown = 1;
			yardsToGo = 10;
			$('#down').text(currDown);
			$('#yards-to-go').text(yardsToGo);
			clearField();
			$('.button').attr('poss', 'home')
		}
	}
	function updateDown(yards,poss){
		if(poss == 'home'){
			if(currYardLine>=firstDownMarker){
				currDown = 1;
				yardsToGo = 10;
				firstDownMarker = currYardLine + yardsToGo;	
			}
			else if(currDown == 1){
				currDown = 2;
				yardsToGo = yardsToGo - yards;
			}else if(currDown == 2){
				currDown = 3;
				yardsToGo = yardsToGo - yards;
			}else if(currDown == 3){
				currDown = 4
				yardsToGo = yardsToGo - yards;
			}else if(currDown == 4){
				$('.button').attr('poss','away');
				currDown = 1;
				yardsToGo = 10;
				clearField();
			}
		}else if(poss == 'away'){
			if(currYardLine<=firstDownMarker){
				currDown = 1;
				yardsToGo = 10;
				firstDownMarker = currYardLine - yardsToGo;
			}else if(currDown == 1){
				currDown = 2;
				yardsToGo = yardsToGo - yards;
			}else if(currDown == 2){
				currDown = 3;
				yardsToGo = yardsToGo - yards;
			}else if(currDown == 3){
				currDown = 4;
				yardsToGo = yardsToGo - yards;
			}else if(currDown == 4){
				$('.button').attr('poss','home');
				currDown = 1;
				yardsToGo = 10;
				clearField();
			}
		}
		$('#down').text(currDown);
		$('#yards-to-go').text(yardsToGo);
	}

	function checkPoss(){
		var possession = $('#big-back').attr('poss');
		return possession;
	}

	function updateRunYardage(yards,poss){
		if(poss == 'home'){
			drawRun(yards);
			currYardLine += yards;
		}else if(poss == 'away'){
			drawAwayRun(yards);
			currYardLine -= yards;
		}
		updateDown(yards,poss)
		checkTouchdown(currYardLine);
		
	}
	function updatePassYardage(yards,poss){
		if(poss == 'home'){
			drawPass(yards);
			currYardLine += yards;
		}else if(poss == 'away'){
			drawAwayPass(yards);
			currYardLine -= yards;
		}
		updateDown(yards,poss)
		checkTouchdown(currYardLine);
		
	}
	$('#big-back').click(function(){	
		var yards = 7;
		var poss = checkPoss();
		updateRunYardage(yards,poss);
	});
	$('#med-back').click(function(){
		var yards = 3;
		var poss = checkPoss();
		updateRunYardage(yards,poss);
	});
	$('#small-back').click(function(){
		var yards = 1;
		var poss = checkPoss();
		updateRunYardage(yards,poss);
	});
	$('#big-receiver').click(function(){
		var yards = 25;
		var poss = checkPoss();
		updatePassYardage(yards,poss)
	});
	$('#med-receiver').click(function(){
		var yards = 15;
		var poss = checkPoss();
		updatePassYardage(yards,poss)
	});
	$('#small-receiver').click(function(){
		var yards = 5;
		var poss = checkPoss();
		updatePassYardage(yards,poss)
	});

});








