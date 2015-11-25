var currYardLine = 20;
var latLoc = 190;
var moveRight = false;
var homeAppended = false;
var awayAppended = false;


function Player (name, position, speed, strength, team, id, playType){
	this.name = name;
	this.position = position;
	this.speed = speed;
	this.team = team;
	this.strength = strength;
	this.id = id;
	this.playType = playType;
}

Player.prototype.energy = 100;

var Team1 = [];
var Team2 = [];
// Auburn
Team1.push(new Player('Jovon Robinson','running back',95,89,'home','big-back','run'));
Team1.push(new Player('Peyton Barber','running back',90,95,'home','med-back','run'));
Team1.push(new Player('Kerryon Johnson','running back',90,85,'home','small-back','run'));
Team1.push(new Player('Ricardo Louis','receiver',90,85,'home','big-receiver','pass'));
Team1.push(new Player('Jason Smith','receiver',85,85,'home','med-receiver','pass'));
Team1.push(new Player('Tony Stevens','receiver',85,95,'home','small-receiver','pass'));
// Georgia
Team2.push(new Player('Nick Chubb','running back',95,90,'away','big-back','run'));
Team2.push(new Player('Sony Michel','running back',93,85,'away','med-back','run'));
Team2.push(new Player('Keith Marshall','running back',85,85,'away','small-back','run'));
Team2.push(new Player('Malcolm Mitchell','receiver',85,85,'away','big-receiver','pass'));
Team2.push(new Player('Justin Scott-Wesley','receiver',80,90,'away','med-receiver','pass'));
Team2.push(new Player('Terry Godwin','receiver',90,80,'away','small-receiver','pass'));


angular.module('footballApp',[]).controller('footballController',function ($scope){

		$scope.team = Team1
		$scope.homeScore = '00';
		$scope.awayScore = '00';
	
	$scope.makePlay = function(){	
		var who = $(this)[0].player.id;
		var poss = $(this)[0].player.team;
		var type = $(this)[0].player.playType;
		var yards = 0;
		switch(who){
			case 'big-back':
				yards = bigBack(poss);
				break;
			case 'med-back':
				yards = medBack(poss);
				break;
			case 'small-back':
				yards = smallBack(poss);
				break;
			case 'big-receiver':
				yards = bigReceiver(poss);
				break;
			case 'med-receiver':
				yards = medReceiver(poss);
				break;
			case 'small-receiver':
				yards = smallReceiver(poss);
				break;
		}
		
		if(type == 'run'){
			drawRun(yards,poss);
		}else if(type == 'pass'){
			drawPass(yards,poss);
		}	
		if(poss == 'home'){
			currYardLine += yards;
		}else if(poss == 'away'){
			currYardLine -= yards;
		}
		lateralLocation();
		checkTouchdown(currYardLine)
			
	}
	function checkTouchdown(position){
		if(position >= 100){
			$scope.homeScore = Number($scope.homeScore) + 7;
			if(($scope.homeScore < 10)&&(!homeAppended)){
				$scope.homeScore = '0'+$scope.homeScore;
				homeAppended = true;
			}
			alert('Touchdown!');
			currYardLine = 80;
			$scope.team = Team2;
			clearField()
		}else if(position <= 0){
			alert('away team scored');
			$scope.awayScore = Number($scope.awayScore) + 7;
			if(($scope.awayScore < 10)&&(!awayAppended)){
				$scope.awayScore = '0'+$scope.awayScore;
				awayAppended = true;
			}
			currYardLine = 20;
			$scope.team = Team1;
			clearField()
		}
	}
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

	function clearField(){
		var canvas = $('#field')[0];
		var context = canvas.getContext('2d');
		context.clearRect(0,0,1000,1000);
		latLoc = 190;
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

	function bigBack(poss){
		yards = 10;
		return yards;
	}
	function medBack(poss){
		yards = 7;
		return yards;
	}
	function smallBack(poss){
		yards = 3;
		return yards;
	}
	function bigReceiver(poss){
		yards = 10;
		return yards;
	}
	function medReceiver(poss){
		yards = 5;
		return yards;
	}
	function smallReceiver(poss){
		yards = 0;
		return yards;
	}
})

