
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

	function drawRun(yards,poss){
		var canvas = $('#field')[0];
		var context = canvas.getContext('2d');
		var currStartYardLine = 0;	
		var newStartYardLine = 0;
		context.lineWidth = 10;
		if(poss == 'home'){
			currStartYardLine = (currYardLine*6)+88;
			newStartYardLine = (6*yards) + currStartYardLine;
			context.moveTo(currStartYardLine,200);
			context.lineTo((6*yards)+currStartYardLine,200);
		}else if(poss == 'away'){
			currStartYardLine = (6*currYardLine)+88;
			newStartYardLine = (-6*yards) + currStartYardLine;
			context.moveTo(currStartYardLine,200);
			context.lineTo((-6*yards)+currStartYardLine,200);
		}
		context.stroke();
	}
	function drawPass(yards,poss){
		var canvas = $('#field')[0];
		var context = canvas.getContext('2d');
		var currStartYardLine = 0;
		var newStartYardLine = 0;
		context.beginPath();
		context.lineWidth = 10;
		if(poss == 'home'){
			currStartYardLine = (currYardLine*6)+88;
			newStartYardLine = (6*yards) + currStartYardLine;	
			context.moveTo(currStartYardLine,200);
			context.bezierCurveTo(currStartYardLine,180,currStartYardLine+(6*yards),180,currStartYardLine+(6*yards),200);
		}else if(poss == 'away'){
			currStartYardLine = currYardLine*6+88;
			newStartYardLine = (-6*yards) +currStartYardLine;
			context.moveTo(currStartYardLine,200);
			context.bezierCurveTo(currStartYardLine,180,currStartYardLine-(6*yards),180,currStartYardLine-(6*yards),200);
		
		}
		context.stroke();
	};
	function drawPunt(yards,poss){
		var canvas = $('#field')[0];
		var context = canvas.getContext('2d');
		var currStartYardLine = 0;
		var newStartYardLine = 0;
		context.beginPath();
		context.lineWidth = 10;
		console.log(currYardLine)
		if(poss == 'home'){
			currStartYardLine = (currYardLine*6)+88;
			newStartYardLine = (6*yards) + currStartYardLine;	
			context.moveTo(currStartYardLine,200);
			context.bezierCurveTo(currStartYardLine,75,currStartYardLine+(6*yards),75,currStartYardLine+(6*yards),200);
		}else if(poss == 'away'){
			currStartYardLine = currYardLine*6+88;
			newStartYardLine = (-6*yards) +currStartYardLine;
			context.moveTo(currStartYardLine,200);
			context.bezierCurveTo(currStartYardLine,75,currStartYardLine-(6*yards),75,currStartYardLine-(6*yards),200);
		}
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
			$('#special-teams').hide();
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
			$('#special-teams').hide();
		}
	}
	function updateDown(yards,poss){
		if(poss == 'home'){
			if(currYardLine>=firstDownMarker){
				currDown = 1;
				yardsToGo = 10;
				firstDownMarker = currYardLine + yardsToGo;
				$('#special-teams').hide();	
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
				$('#special-teams').show();
			}else if(currDown == 4){
				$('.button').attr('poss','away');
				currDown = 1;
				yardsToGo = 10;
				clearField();
				$('#special-teams').hide();
			}
		}else if(poss == 'away'){
			if(currYardLine<=firstDownMarker){
				currDown = 1;
				yardsToGo = 10;
				firstDownMarker = currYardLine - yardsToGo;
				$('#special-teams').hide();
			}else if(currDown == 1){
				currDown = 2;
				yardsToGo = yardsToGo - yards;
			}else if(currDown == 2){
				currDown = 3;
				yardsToGo = yardsToGo - yards;
			}else if(currDown == 3){
				currDown = 4;
				yardsToGo = yardsToGo - yards;
				$('#special-teams').show();
			}else if(currDown == 4){
				$('.button').attr('poss','home');
				currDown = 1;
				yardsToGo = 10;
				clearField();
				$('#special-teams').hide();
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
		drawRun(yards,poss);
		if(poss == 'home'){
		currYardLine += yards;
		}else if(poss== 'away'){
			currYardLine -= yards;
		}
		updateDown(yards,poss)
		checkTouchdown(currYardLine);
		
	}
	function updatePassYardage(yards,poss){
		drawPass(yards,poss);
		if(poss == 'home'){
			currYardLine += yards;
		}else if(poss = 'away'){
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
		console.log(currYardLine)
		console.log(poss)
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
	$('#field-goal').click(function(){
		var chances = Math.random()
		console.log(chances)
		var poss = checkPoss();
		if(poss == 'home'){
			if(currYardLine>80){
				$('#home-score').text(Number($('#home-score').text())+3);
				currYardLine = 80;
			}else if((currYardLine>70)&&(chances<0.90)){
				$('#home-score').text(Number($('#home-score').text())+3);
				currYardLine = 80;
			}else if((currYardLine>60)&&(chances<0.6)){
				$('#home-score').text(Number($('#home-score').text())+3);
				currYardLine = 80;
			}
			firstDownMarker = currYardLine - 10;
			currDown = 1;
			yardsToGo = 10;
			$('.button').attr('poss', 'away');
		}else if(poss == 'away'){
			if(currYardLine<20){
				$('#away-score').text(Number($('#away-score').text())+3);
				currYardLine = 20;
			}else if((currYardLine<30)&&(chances<0.90)){
				$('#away-score').text(Number($('#away-score').text())+3);
				currYardLine = 20;
			}else if((currYardLine<40)&&(chances<0.6)){
				$('#away-score').text(Number($('#away-score').text())+3);
				currYardLine = 20;
			}
			firstDownMarker = currYardLine + 10;
			currDown = 1;
			yardsToGo = 10;
			$('.button').attr('poss', 'home');
		}
		$('#down').text(currDown);
		$('#yards-to-go').text(yardsToGo);
		$('#special-teams').hide();
		clearField();
	})
	$('#punt').click(function(){
		var distance = Math.floor(Math.random()*20)+40;
		var poss = checkPoss();
		drawPunt(distance,poss);
		setTimeout(clearField,2000);
		if(poss == 'home'){
			currYardLine+=distance;
			if(currYardLine>=100){
				currYardLine = 80;
			}
			firstDownMarker = currYardLine - 10;
			currDown = 1;
			yardsToGo = 10;
			$('.button').attr('poss', 'away');
		}else if(poss == 'away'){
			currYardLine-=distance;
			if(currYardLine<=0){
				currYardLine = 20;
			}
			firstDownMarker = currYardLine + 10;
			currDown = 1;
			yardsToGo = 10;
			$('.button').attr('poss', 'home');
		}
		$('#down').text(currDown);
		$('#yards-to-go').text(yardsToGo);
		$('#special-teams').hide();
	})
});








