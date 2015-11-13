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
	var latLoc = 190;
	var moveRight = false;
	function drawRun(yards,poss){
		var canvas = $('#field')[0];
		var context = canvas.getContext('2d');
		var currStartYardLine = 0;	
		var newStartYardLine = 0;
		context.lineWidth = 10;
		if(poss == 'home'){
			currStartYardLine = (currYardLine*6)+88;
			newStartYardLine = (6*yards) + currStartYardLine;
			context.moveTo(currStartYardLine,latLoc);
			context.lineTo((6*yards)+currStartYardLine,latLoc);
		}else if(poss == 'away'){
			currStartYardLine = (6*currYardLine)+88;
			newStartYardLine = (-6*yards) + currStartYardLine;
			context.moveTo(currStartYardLine,latLoc);
			context.lineTo((-6*yards)+currStartYardLine,latLoc);
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
			context.moveTo(currStartYardLine,latLoc);
			context.bezierCurveTo(currStartYardLine,latLoc-20,currStartYardLine+(6*yards),latLoc-20,currStartYardLine+(6*yards),latLoc);
		}else if(poss == 'away'){
			currStartYardLine = currYardLine*6+88;
			newStartYardLine = (-6*yards) +currStartYardLine;
			context.moveTo(currStartYardLine,latLoc);
			context.bezierCurveTo(currStartYardLine,latLoc-20,currStartYardLine-(6*yards),latLoc-20,currStartYardLine-(6*yards),latLoc);
		
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
			context.moveTo(currStartYardLine,latLoc);
			context.bezierCurveTo(currStartYardLine,latLoc-125,currStartYardLine+(6*yards),latLoc-125,currStartYardLine+(6*yards),latLoc);
		}else if(poss == 'away'){
			currStartYardLine = currYardLine*6+88;
			newStartYardLine = (-6*yards) +currStartYardLine;
			context.moveTo(currStartYardLine,latLoc);
			context.bezierCurveTo(currStartYardLine,latLoc-125,currStartYardLine-(6*yards),latLoc-125,currStartYardLine-(6*yards),latLoc);
		}
		context.stroke();
	}
	function clearField(){
		var canvas = $('#field')[0];
		var context = canvas.getContext('2d');
		context.clearRect(0,0,1000,1000);
		latLoc = 190;
	}
	function checkTouchdown(position){
		if(position>=100){
			$('#home-score').text(Number($('#home-score').text())+7);
			alert('TOUCHDOWN!!!')
			currYardLine = 80;
			firstDownMarker = currYardLine - 10;
			firstDown()
			$('#down').text(currDown);
			clearField();
			$('#yards-to-go').text(yardsToGo);			
			$('.button').attr('poss', 'away')
		}else if(position<=0){
			$('#away-score').text(Number($('#away-score').text())+7);
			alert('The Visitor has Scored');
			currYardLine = 20;
			firstDownMarker = currYardLine + 10;
			firstDown()
			$('#down').text(currDown);
			$('#yards-to-go').text(yardsToGo);
			clearField();
			$('.button').attr('poss', 'home')
		}
	}
	function updateDown(yards,poss){
		if(poss == 'home'){
			if(currYardLine>=firstDownMarker){
				firstDown()
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
				$('#special-teams').show();
			}else if(currDown == 4){
				$('.button').attr('poss','away');
				firstDown()
				clearField();
			}
		}else if(poss == 'away'){
			if(currYardLine<=firstDownMarker){
				firstDown()
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
				firstDown()
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
	function firstDown(){
		currDown = 1;
		yardsToGo = 10;
		$('#special-teams').hide();
	}
	function lateralLocation(){
		console.log(latLoc)
		var leftHash = 150;
		var rightHash = 230;
		if(latLoc === rightHash){
			moveRight = true;
		}else if(latLoc === leftHash){
			moveRight = false;
		}
		if(moveRight){
			latLoc -= 10;
		}else if(!moveRight){
			latLoc += 10;
		}
	}
	function updateRunYardage(yards,poss){
		lateralLocation()
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
		lateralLocation()
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
			firstDown();
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
			firstDown();
			$('.button').attr('poss', 'home');
		}
		$('#down').text(currDown);
		$('#yards-to-go').text(yardsToGo);
		clearField();
	})
	$('#punt').click(function(){
		var goodKick = Math.random();
		var distance = 0;
		if(goodKick<=0.05){
			distance = Math.floor(Math.random()*15)+20;
		}else if(goodKick<=0.9){
			distance = Math.floor(Math.random()*20)+35;
		}else{
			distance = Math.floor(Math.random()*15)+55;
		}		
		var poss = checkPoss();
		drawPunt(distance,poss);
		setTimeout(clearField,2000);
		if(poss == 'home'){
			currYardLine+=distance;
			if(currYardLine>=100){
				currYardLine = 80;
			}
			firstDownMarker = currYardLine - 10;
			firstDown();
			$('.button').attr('poss', 'away');
		}else if(poss == 'away'){
			currYardLine-=distance;
			if(currYardLine<=0){
				currYardLine = 20;
			}
			firstDownMarker = currYardLine + 10;
			firstDown();
			$('.button').attr('poss', 'home');
		}
		$('#down').text(currDown);
		$('#yards-to-go').text(yardsToGo);
	})
});