var currYardLine = 20;
var currDown = 1;
var yardsToGo = 10;
var firstDownMarker = currYardLine + yardsToGo;
var latLoc = 190;
var moveRight = false;
var homeAppended = false;
var awayAppended = false;
var startingTeam;


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


var footballApp = angular.module('footballApp',['ngRoute']);
footballApp.config(function ($routeProvider){
	$routeProvider.when('/',{
		templateUrl: 'pages/coinflip.html',
		controller: 'coinFlipController'
	}).
	when('/:firstParam',{
		templateUrl: 'pages/field.html',
		controller: 'footballController'
	}).
	otherwise({
		redirectTo: '/'
	});
});

footballApp.controller('coinFlipController',function ($scope, $routeParams){

	$scope.coinFlip = function (choice){
		var num = Math.floor(Math.random()*6)+10;
		var coin = '';
		if(num % 2){
			coin = 'tails'
		}else{
			coin = 'heads'
		}
		console.log(num,coin,choice)
		if(choice == coin){
			startingTeam = Team2;
			currYardLine = 80;
			firstDownMarker = currYardLine - yardsToGo;
		}else{
			startingTeam = Team1;
		}

		$('#coin').css('transition', 'all '+num*0.2+'s');

		setTimeout(function(){
			$('#coin').css('transform', 'rotateY('+180*num+'deg)');

		},0)

		setTimeout(function(){
			window.location.href = '#/field';
		},(1+num*0.2)*1000)

	}
});
footballApp.controller('footballController', function ($scope){

		$scope.team = startingTeam;
		$scope.homeScore = '00';
		$scope.awayScore = '00';
		$scope.down = currDown;
		$scope.yardsToGo = yardsToGo;
		setYardLine();
	
	$scope.makePlay = function(){	
		var who = $(this)[0].player.id;
		var poss = $(this)[0].player.team;
		var type = $(this)[0].player.playType;
		var speed = $(this)[0].player.speed;
		var strength = $(this)[0].player.strength;
		var yards = 0;
		switch(who){
			case 'big-back':
				yards = bigBack(speed,strength);
				break;
			case 'med-back':
				yards = medBack(speed,strength);
				break;
			case 'small-back':
				yards = smallBack(speed,strength);
				break;
			case 'big-receiver':
				yards = bigReceiver(speed,strength);
				break;
			case 'med-receiver':
				yards = medReceiver(speed,strength);
				break;
			case 'small-receiver':
				yards = smallReceiver(speed,strength);
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
		updateDown(yards,poss);
		checkTouchdown(currYardLine);
		setYardLine();
			
	}
	function checkTouchdown(position){
		if(position >= 100){
			$scope.homeScore = Number($scope.homeScore) + 7;
			if(($scope.homeScore < 10)&&(!homeAppended)){
				$scope.homeScore = '0' + $scope.homeScore;
				homeAppended = true;
			}
			alert('Touchdown!');
			currYardLine = 80;
			$scope.team = Team2;
			firstDownMarker = currYardLine - 10;
			clearField();
			firstDown();
		}else if(position <= 0){
			alert('away team scored');
			$scope.awayScore = Number($scope.awayScore) + 7;
			if(($scope.awayScore < 10)&&(!awayAppended)){
				$scope.awayScore = '0'+$scope.awayScore;
				awayAppended = true;
			}
			currYardLine = 20;
			$scope.team = Team1;
			firstDownMarker = currYardLine + 10;
			clearField();
			firstDown();
		}
	}
	function firstDown(){
		currDown = 1;
		yardsToGo = 10;
		$('#special-teams').hide();
		$scope.down = 1;
		$scope.yardsToGo = 10;
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
				$scope.team = Team2;
				alert('Turnover on Downs');
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
				$scope.team = Team1;
				alert('Turnover on Downs');
				firstDown();
				clearField();
			}
		}
		$scope.down = currDown;
		$scope.yardsToGo = yardsToGo;
	}

	function clearField(){
		var canvas = $('#field')[0];
		var context = canvas.getContext('2d');
		context.clearRect(0,0,1000,1000);
		latLoc = 190;
	}

	function setYardLine(){
		var yardLine = currYardLine;
		if(currYardLine > 50){
			$('.arrow-right').show();
			$('.arrow-left').hide();
			yardLine = 50 - (currYardLine - 50);
		}else if(currYardLine === 50){
			$('.arrow-right').hide();
			$('.arrow-left').hide();
		}else if(currYardLine < 50){
			$('.arrow-right').hide();
			$('.arrow-left').show();
		}
		if(yardLine < 10){
			yardLine = "0" + yardLine;
		}
			
		$scope.yardLine = yardLine;
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

	function bigBack(speed,strength){
		yards = 10;
		return yards;
	}
	function medBack(speed,strength){
		yards = 7;
		return yards;
	}
	function smallBack(speed,strength){
		yards = 3;
		return yards;
	}
	function bigReceiver(speed,strength){
		yards = 10;
		return yards;
	}
	function medReceiver(speed,strength){
		yards = 5;
		return yards;
	}
	function smallReceiver(speed,strength){
		yards = 0;
		return yards;
	}
})

