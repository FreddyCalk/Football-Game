$(document).ready(function(){
	var currYardLine = 20;
	var bigRunnerEnergy = 1;
	var medRunnerEnergy = 1;
	var smallRunnerEnergy = 1;
	var bigReceiverEnergy = 1;
	var medReceiverEnergy = 1;
	var smallReceiverEnergy = 1;
	$('#big-back-energy').text(bigRunnerEnergy*100+"%");
	$('#med-back-energy').text(medRunnerEnergy*100+"%");
	$('#small-back-energy').text(smallRunnerEnergy*100+"%");
	$('#big-receiver-energy').text(bigReceiverEnergy*100+"%");
	$('#med-receiver-energy').text(medReceiverEnergy*100+"%");
	$('#small-receiver-energy').text(smallReceiverEnergy*100+"%");
	var currDown = 1;
	var firstDownMarker = currYardLine + 10;
	var yardsToGo = 10;
	var latLoc = 190;
	var moveRight = false;
	setYardLine();
	
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
		setYardLine();
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
			restoreEnergyPossessionChange();
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
			restoreEnergyPossessionChange();
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
				alert('Turnover on Downs');
				firstDown()
				clearField();
				restoreEnergyPossessionChange();
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
				alert('Turnover on Downs');
				firstDown();
				clearField();
				restoreEnergyPossessionChange();
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
		$('#down').text(currDown);
		$('#yards-to-go').text(yardsToGo);
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
	function updateYardage(yards,poss,chanceOfTurnover,playType){
		lateralLocation()
		if(playType == 'run'){
			drawRun(truncatePlay(yards,poss),poss);
		}else if(playType == 'pass'){
			drawPass(truncatePlay(yards,poss),poss);
		}
		var turnover = false;
		if(poss == 'home'){
		currYardLine += yards;
		}else if(poss== 'away'){
			currYardLine -= yards;
		}
		turnover = checkTurnover(yards,poss,chanceOfTurnover);
		if(!turnover){
			updateDown(yards,poss)
			checkTouchdown(currYardLine);
		}
		setYardLine();		
	}
	function checkTurnover(yards,poss,chanceOfTurnover){
		if((poss === 'home')&&(chanceOfTurnover <= 0.05)&&(yards !== 0)){
			$('.button').attr('poss','away')
			if(currYardLine >= 100){
				currYardLine = 80;
			}
			turnover = true;
			firstDown();
			alert('Turnover!');
			clearField()
			restoreEnergyPossessionChange();
			return true;
		}else if((poss === 'away')&&(chanceOfTurnover <= 0.05)&&(yards !== 0)){
			$('.button').attr('poss','away')
			if(currYardLine <= 0 ){
				currYardLine = 20;
			}
			turnover = true;
			firstDown();
			alert('Turnover!');
			clearField();
			restoreEnergyPossessionChange();
			return true;
		}
	}
	function setYardLine(){
		var yardLine = currYardLine;
		if(currYardLine>50){
			yardLine = 50 - (currYardLine - 50);
			// $('.arrow-right').show();
			// $('.arrow-left').hide();
		}
			// $('.arrow-right').hide();
			// $('.arrow-left').show();
		$('#yard-line').text(yardLine);
	}
	function truncatePlay(yards,poss){
		var potentialYards = 0;
		if(poss == 'home'){
			potentialYards = currYardLine + yards;
			if(potentialYards > 109){
				yards = 109 - currYardLine;
			}
		}else if(poss == 'away'){
			potentialYards = currYardLine - yards;
			if(potentialYards < -9){
				yards = (-9 - currYardLine)*(-1);
			}
		}
		return yards;
	}
	function rollDice(N,S){
		value = 0;
		for(i=0;i<N;i++){
			value+= Math.floor(Math.random()*S)+1;
		}
		return value
	}
	$('#big-back').click(function(){	
		var yards = 0;
		var poss = checkPoss();
		var chanceOfGain = Math.random()*bigRunnerEnergy;
		var chanceOfFumble = Math.random();
		var playType = 'run';
		if(chanceOfGain > 0.05){
			yards += rollDice(2,4);
			bigRunnerEnergy *= 0.9;
			if(chanceOfGain >0.95){
				yards += rollDice(8,8);
				bigRunnerEnergy *= 0.6;
			}else if(chanceOfGain > 0.9){
				yards += rollDice(5,5);
				bigRunnerEnergy *= 0.8;
			}
		}else if(chanceOfGain < 0.015){
			yards -= rollDice(2,5);
			bigRunnerEnergy *= 0.9
		}else{
			yards -= rollDice(1,5);
			bigRunnerEnergy *= 0.95;
		}
		$('#big-back-energy').text(Math.round(bigRunnerEnergy*100)+"%");
		console.log(bigRunnerEnergy)
		updateYardage(yards,poss,chanceOfFumble,playType);
	});
	$('#med-back').click(function(){
		var yards = 0;
		var poss = checkPoss();
		var chanceOfGain = Math.random()*medRunnerEnergy;
		var chanceOfFumble = Math.random();
		var playType = 'run';
		if(chanceOfGain > 0.10){
			yards += rollDice(2,3);
			medRunnerEnergy *= 0.9;
			if(chanceOfGain >0.97){
				yards += rollDice(7,7);
				medRunnerEnergy *= 0.6;
			}else if(chanceOfGain > 0.92){
				yards += rollDice(4,4);
				medRunnerEnergy *= 0.8;
			}
		}else if(chanceOfGain < 0.05){
			yards -= rollDice(3,4);
			medRunnerEnergy *= 0.9;
		}else{
			yards -= rollDice(2,4);
			medRunnerEnergy *= 0.95;
		}
		$('#med-back-energy').text(Math.round(medRunnerEnergy*100)+"%");
		updateYardage(yards,poss,chanceOfFumble,playType);
	});
	$('#small-back').click(function(){
		var yards = 0;
		var poss = checkPoss();
		var chanceOfGain = Math.random()*smallRunnerEnergy;
		var chanceOfFumble = Math.random();
		var playType = 'run';
		if(chanceOfGain > 0.15){
			yards += rollDice(2,4);
			smallRunnerEnergy *= 0.9;
			if(chanceOfGain >0.95){
				yards += rollDice(8,8);
				smallRunnerEnergy *= 0.6;
			}else if(chanceOfGain > 0.9){
				yards += rollDice(5,5);
				smallRunnerEnergy *= 0.8;
			}
		}else if(chanceOfGain < 0.08){
			yards -= rollDice(4,4);
			smallRunnerEnergy *= 0.9;
		}else{
			yards -= rollDice(3,3);
			smallRunnerEnergy *= 0.95;
		}
		$('#small-back-energy').text(Math.round(smallRunnerEnergy*100)+"%");
		updateYardage(yards,poss,chanceOfFumble,playType);
	});
	$('#big-receiver').click(function(){
		var yards = 0;
		var poss = checkPoss();
		var chanceOfGain = Math.random()*bigReceiverEnergy;
		var chanceOfInterception = Math.random();
		var playType = 'pass';
		if(chanceOfGain > 0.3){
			yards += rollDice(3,5);
			bigReceiverEnergy *= 0.95;
			if(chanceOfGain > 0.85){
				yards += rollDice(10,10);
				bigReceiverEnergy *= 0.8;
			}else if(chanceOfGain > 0.8){
				yards += rollDice(7,7);
				bigReceiverEnergy *= 0.9;
			}
		}
		$('#big-receiver-energy').text(Math.round(bigReceiverEnergy*100)+"%");
		updateYardage(yards,poss,chanceOfInterception,playType)
	});
	$('#med-receiver').click(function(){
		var yards = 0;
		var poss = checkPoss();
		var chanceOfGain = Math.random()*medReceiverEnergy;
		var chanceOfInterception = Math.random();
		var playType = 'pass';
		if(chanceOfGain > 0.2){
			yards += rollDice(2,6);
			medReceiverEnergy *= 0.95;
			if(chanceOfGain >0.9){
				yards += rollDice(8,8);
				medReceiverEnergy *= 0.8;
			}else if(chanceOfGain > 0.85){
				yards += rollDice(5,5);
				medReceiverEnergy *= 0.9;
			}
		}
		$('#med-receiver-energy').text(Math.round(medReceiverEnergy*100)+"%");
		updateYardage(yards,poss,chanceOfInterception,playType)
	});
	$('#small-receiver').click(function(){
		var yards = 0;
		var poss = checkPoss();
		var chanceOfGain = Math.random()*smallReceiverEnergy;
		var chanceOfInterception = Math.random();
		var playType = 'pass';
		if(chanceOfGain > 0.1){
			yards += rollDice(3,5);
			smallReceiverEnergy *= 0.95;
			if(chanceOfGain >0.95){
				yards += rollDice(6,6);
				smallReceiverEnergy *= 0.8;
			}else if(chanceOfGain > 0.9){
				yards += rollDice(4,4);
				smallReceiverEnergy *= 0.9;
			}
		}else{
			yards -= rollDice(1,5)
			smallReceiverEnergy *= 0.95;
		}
		$('#small-receiver-energy').text(Math.round(smallReceiverEnergy*100)+"%");
		updateYardage(yards,poss,chanceOfInterception,playType)
	});
	$('#field-goal').click(function(){
		var chances = Math.random()
		console.log(chances)
		var poss = checkPoss();
		if(poss == 'home'){
			if(currYardLine>80){
				$('#home-score').text(Number($('#home-score').text())+3);
				currYardLine = 80;
			}else if((currYardLine>70)&&(chances>0.1)){
				$('#home-score').text(Number($('#home-score').text())+3);
				currYardLine = 80;
			}else if((currYardLine>60)&&(chances>0.4)){
				$('#home-score').text(Number($('#home-score').text())+3);
				currYardLine = 80;
			}else{
				alert("No Good!")
			}
			firstDownMarker = currYardLine - 10;
			firstDown();
			$('.button').attr('poss', 'away');
		}else if(poss == 'away'){
			if(currYardLine<20){
				$('#away-score').text(Number($('#away-score').text())+3);
				currYardLine = 20;
			}else if((currYardLine<30)&&(chances>0.1)){
				$('#away-score').text(Number($('#away-score').text())+3);
				currYardLine = 20;
			}else if((currYardLine<40)&&(chances>0.4)){
				$('#away-score').text(Number($('#away-score').text())+3);
				currYardLine = 20;
			}else{
				alert("No Good!")
			}
			firstDownMarker = currYardLine + 10;
			firstDown();
			$('.button').attr('poss', 'home');
		}
		setYardLine();
		restoreEnergyPossessionChange();
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
			currYardLine += distance;
			if(currYardLine >= 100){
				currYardLine = 80;
			}
			firstDownMarker = currYardLine - 10;
			firstDown();
			$('.button').attr('poss', 'away');
		}else if(poss == 'away'){
			currYardLine -= distance;
			if(currYardLine <= 0){
				currYardLine = 20;
			}
			firstDownMarker = currYardLine + 10;
			firstDown();
			$('.button').attr('poss', 'home');
		}
		setYardLine();
		restoreEnergyPossessionChange();
	})
	function restoreEnergyPossessionChange(){
		bigRunnerEnergy = 1;
		medRunnerEnergy = 1;
		smallRunnerEnergy = 1;
		bigReceiverEnergy = 1;
		medReceiverEnergy = 1;
		smallReceiverEnergy = 1;
		$('#big-back-energy').text(bigRunnerEnergy*100+"%");
		$('#med-back-energy').text(medRunnerEnergy*100+"%");
		$('#small-back-energy').text(smallRunnerEnergy*100+"%");
		$('#big-receiver-energy').text(bigReceiverEnergy*100+"%");
		$('#med-receiver-energy').text(medReceiverEnergy*100+"%");
		$('#small-receiver-energy').text(smallReceiverEnergy*100+"%");
	}
});




