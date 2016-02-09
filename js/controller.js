var currYardLine = 20;
var currDown = 1;
var yardsToGo = 10;
var firstDownMarker = currYardLine + yardsToGo;
var latLoc = 190;
var mod = 0.4;
var moveUp = false;
var homeAppended = false;
var awayAppended = false;
var startingTeam;
var Team1;
var Team2;
var heads;
var tails;
var homeSymbol;
var awaySymbol;
var homeScore = '00';
var awayScore = '00';
var selectedTeams = [];
var poss;
var possessionCounter = 0;

var footballApp = angular.module('footballApp', ['ngRoute','ngCookies']);
footballApp.config(function ($routeProvider){
	$routeProvider.when('/',{
		templateUrl: 'pages/home.html',
		controller: 'homeController'
	}).
	when('/login',{
		templateUrl: 'pages/login.html',
		controller: 'loginController'
	}).
	when('/signup',{
		templateUrl: 'pages/register.html',
		controller: 'registerController'
	}).
	when('/selectSides',{
		templateUrl: 'pages/selectSides.html',
		controller: 'setupController'
	}).
	when('/coinToss',{
		templateUrl: 'pages/coinflip.html',
		controller: 'coinFlipController'
	}).
	when('/field',{
		templateUrl: 'pages/field.html',
		controller: 'gameController'
	}).
	otherwise({
		redirectTo: '/'
	});
});
var username;
var favTeam;

footballApp.controller('homeController', function ($scope, $http){

})

footballApp.controller('loginController', ['$cookies', '$scope', '$http', function ($scope, $http, $cookies){
	$('#login-wrapper').css('background-color','rgba(0,0,0,.8)')
	$scope.login = function(){
		var url = "http://localhost:3000/login";
		var data = {
			username: $scope.username,
			password: $scope.password
		}
		$http.post(url, data).success(function (data, status) {
			console.log(data.status)
			if(data.err){
				$scope.loggedin = false;
				$scope.message = data.err;

			}
			if(data.status){
				console.log(data);
				$scope.loggedin = true;
				$scope.success = data.status;
				window.location.href = "#/selectSides"
			}
        })
    }
}])

footballApp.controller('registerController', ['$cookies', '$scope', '$http', function ($scope, $http, $cookies){
	var url = "http://localhost:3000/teams";
	$('#register-wrapper').css('background-color','rgba(0,0,0,.8)')
	$http.get(url).success(function (data){
		$scope.teams = data;
	})


	$scope.register = function(){
		var url = "http://localhost:3000/signup";
		var data = {
			username: $scope.username,
			password: $scope.password,
			confirmPassword: $scope.confirmPassword,
			favoriteTeam: $scope.favTeam
		}
		$http.post(url, data).success(function (data, status) {
			if(data.err){
				$scope.loggedin = false;
				$scope.message = data.err;

			}
			if(data.status){
				console.log("success");
				$scope.loggedin = true;
				$scope.success = data.status;
				window.location.href = "#/selectSides"
			}
        })
    }
}])

footballApp.directive('homeClick', function(){
	var lastElement;
	var lastTeam;
	var clicks = 0;
	return{
		link: function ($scope, element){
			element.bind('click',function(){
				if(clicks > 0){
					lastElement.css('background-color','#000080');
					selectedTeams.splice(selectedTeams.indexOf(lastTeam),1);
					lastTeam.players.team = undefined;
				}
				clicks++;
				if(!$scope.team.players.team){
					Team1 = $scope.team;
					$scope.team.players.team = 'home';
					$(this).css('background-color','white');
					$(this).css('border-radius','10px');
					lastElement = $(this);
					lastTeam = $scope.team;
					selectedTeams.push($scope.team);
				}else{
					clicks = 0;
				}
				
			})
		}
	}
})

footballApp.directive('awayClick', function(){
	var lastElement;
	var lastTeam;
	var clicks = 0;
	return{
		link: function ($scope, element){
			element.bind('click',function(){
				if(clicks > 0){
					lastElement.css('background-color','#000080');
					selectedTeams.splice(selectedTeams.indexOf(lastTeam),1)
					lastTeam.players.team = undefined;
				}
				clicks++;
				if(!$scope.team.players.team){
					Team2 = $scope.team;
					$scope.team.players.team = 'away';
					$(this).css('background-color','white');
					$(this).css('border-radius','10px');
					lastElement = $(this);
					lastTeam = $scope.team;
					selectedTeams.push($scope.team);
				}else{
					clicks = 0;
				}
			})
		}
	}
})


footballApp.controller('setupController', ['$cookies', '$scope', '$http', function ($scope, $http, $cookies){
	var url = "http://localhost:3000/teams";
	$http.get(url).success(function (data){
		$scope.teams = data;
	})
}])

footballApp.controller('coinFlipController', ['$cookies', '$scope', '$http', function ($scope, $http, $cookies){
	$scope.tails = Team2.logo;
	$scope.heads = Team1.logo;
	$scope.homeSymbol = Team1.symbol;
	$scope.awaySymbol = Team2.symbol;
	$scope.teamName = Team2.name;
	$scope.coinFlip = function (choice){
		var num = Math.floor(Math.random()*6)+10;
		var coin = '';
		if(num % 2){
			coin = 'tails'
		}else{
			coin = 'heads'
		}
		if(choice == coin){
			startingTeam = Team2.players;
			currYardLine = 80;
			firstDownMarker = currYardLine - yardsToGo;
		}else{
			startingTeam = Team1.players;
		}

		$('#coin').css('transition', 'all '+num*0.2+'s');

		setTimeout(function(){
			$('#coin').css('transform', 'rotateY('+180*num+'deg)');

		},0);

		setTimeout(function(){
			window.location.href = '#/field';
		},(1+num*0.2)*1000);

	}
}]);
footballApp.controller('gameController', ['$cookies', '$scope', '$http', function ($scope, $http, $cookies){
		clearField();

		$scope.team = startingTeam;
		console.log(startingTeam);
		$scope.homeTeam = Team1.name;
		$scope.awayTeam = Team2.name;
	$scope.makePlay = function(){	
		var who = $(this)[0].player.id;
		poss = this.$parent.team.team;
		console.log(poss)
		var type = $(this)[0].player.playType;
		var speed = $(this)[0].player.speed;
		var strength = $(this)[0].player.strength;
		var energy = $(this)[0].player.energy;
		var chanceOfTurnover = Math.random();
		var yards = 0;
		switch(who){
			case 'big-back':
				yards = bigBack(speed,strength,energy);
				break;
			case 'med-back':
				yards = medBack(speed,strength,energy);
				break;
			case 'small-back':
				yards = smallBack(speed,strength,energy);
				break;
			case 'big-receiver':
				yards = bigReceiver(speed,strength,energy);
				break;
			case 'med-receiver':
				yards = medReceiver(speed,strength,energy);
				break;
			case 'small-receiver':
				yards = smallReceiver(speed,strength,energy);
				break;
		};
		if(yards < 30){
			$(this)[0].player.energy = Math.floor($(this)[0].player.energy*((100 - (1.5*yards + 5))/100));
		}else{
			$(this)[0].player.energy = Math.floor($(this)[0].player.energy*((100-30)/100));
		}
		regenerateEnergy();
		if(type == 'run'){
			drawRun(truncatePlay(yards,poss),poss);
		}else if(type == 'pass'){
			drawPass(truncatePlay(yards,poss),poss);
		};	
		if(poss == 'home'){
			currYardLine += yards;
			
		}else if(poss == 'away'){
			currYardLine -= yards;
		};
		lateralLocation();
		var turnover = false;
		turnover = checkTurnover(yards,poss,chanceOfTurnover,type);
		if(!turnover){
			updateDown(yards,poss)
			checkScore(currYardLine,poss);
		}
		setYardLine();
		checkGameEnd(homeScore,awayScore);	
	};
	$scope.fieldGoal = function(){
		var chances = Math.random()
		console.log(poss);
		if(poss == 'home'){
			if(currYardLine>80){
				homeScore = (Number(homeScore)+3);
				currYardLine = 80;
			}else if((currYardLine>70)&&(chances>0.1)){
				homeScore = (Number(homeScore)+3);
				currYardLine = 80;
			}else if((currYardLine>60)&&(chances>0.4)){
				homeScore = (Number(homeScore)+3);
				currYardLine = 80;
			}else{
				alert("No Good!")
				var miss = true;
			}
			firstDownMarker = currYardLine - 10;
			firstDown();
			$scope.team = Team2.players;
			if((homeScore < 10)&&(!homeAppended)&&(!miss)){
				homeScore = '0'+homeScore;
				homeAppended = true;
			}
		}else if(poss == 'away'){
			if(currYardLine<20){
				awayScore = (Number(awayScore)+3)
				currYardLine = 20;
			}else if((currYardLine<30)&&(chances>0.1)){
				awayScore = (Number(awayScore)+3)
				currYardLine = 20;
			}else if((currYardLine<40)&&(chances>0.4)){
				awayScore = (Number(awayScore)+3)
				currYardLine = 20;
			}else{
				alert("No Good!")
				var miss = true;
			}
			firstDownMarker = currYardLine + 10;
			firstDown();
			$scope.team = Team1.players;
			if((awayScore < 10)&&(!awayAppended)&&(!miss)){
				awayScore = '0'+awayScore;
				awayAppended = false;
			}
		}
		setScore()
		setYardLine();
		clearField();
		possessionCounter++;

	}
	$scope.punt = function(){
		var goodKick = Math.random();
		var distance = 0;
		if(goodKick<=0.05){
			distance = Math.floor(Math.random()*15)+25;
		}else if(goodKick<=0.9){
			distance = Math.floor(Math.random()*18)+40;
		}else{
			distance = Math.floor(Math.random()*15)+55;
		}		
		drawPunt(distance,poss);
		setTimeout(clearField,2000);
		if(poss == 'home'){
			currYardLine += distance;
			if(currYardLine >= 100){
				currYardLine = 80;
			}
			firstDownMarker = currYardLine - 10;
			firstDown();
			$scope.team = Team2.players;
		}else if(poss == 'away'){
			currYardLine -= distance;
			if(currYardLine <= 0){
				currYardLine = 20;
			}
			firstDownMarker = currYardLine + 10;
			firstDown();
			$scope.team = Team1.players;
		}
		setYardLine();
		possessionCounter++;
	}
	function regenerateEnergy(){
		$.each(Team1.players,function(){
			this.energy += Math.round((100-this.energy+9)*0.05);
			if(this.energy > 100){
				this.energy = 100;
			}
		})
		$.each(Team2.players,function(){
			this.energy += Math.round((100-this.energy+9)*0.05);
			if(this.energy > 100){
				this.energy = 100;
			}
		})
	}
	function checkScore(position, poss){
		if(position >= 100){
			if(poss == 'home'){
				homeScore = Number(homeScore) + 7;
				alert('Touchdown!');
				if((homeScore < 10)&&(!homeAppended)){
						homeScore = '0' + homeScore;
						homeAppended = true;
				};
				currYardLine = 80;
				$scope.team = Team2.players;
				firstDownMarker = currYardLine - 10;
				clearField();
				firstDown();
				possessionCounter++;
			}else{
				awayScore = Number(awayScore) + 2;
				alert('Safety!');
				if((awayScore < 10)&&(!awayAppended)){
					awayScore = '0'+awayScore;
					awayAppended = true;
				};
				currYardLine = 20;
				$scope.team = Team1.players;
				firstDownMarker = currYardLine + 10;
				clearField();
				firstDown();
				possessionCounter++;
			}
			
		}else if(position <= 0){
			if(poss == 'away'){
				awayScore = Number(awayScore) + 7;
				alert('away team scored');
				if((awayScore < 10)&&(!awayAppended)){
					awayScore = '0'+awayScore;
					awayAppended = true;
				};
				currYardLine = 20;
				$scope.team = Team1.players;
				firstDownMarker = currYardLine + 10;
				clearField();
				firstDown();
				possessionCounter++;
			}else{
				homeScore = Number(homeScore) + 2;
				alert('Safety!');
				if((homeScore < 10)&&(!homeAppended)){
						homeScore = '0' + homeScore;
						homeAppended = true;
				};
				currYardLine = 80;
				$scope.team = Team2.players;
				firstDownMarker = currYardLine - 10;
				clearField();
				firstDown();
				possessionCounter++;
			}
			
		};
		setScore();
	};
	function setScore(){
		$scope.homeScore = homeScore;
		$scope.awayScore = awayScore;
	}
	function firstDown(){
		currDown = 1;
		yardsToGo = 10;
		$('#special-teams').hide();
		$scope.down = 1;
		$scope.yardsToGo = 10;
	};
	function drawRun(yards,poss){
		var canvas = $('#field')[0];
		var context = canvas.getContext('2d');
		var currStartYardLine = 0;	
		var newStartYardLine = 0;
		context.beginPath();
		context.lineWidth = 10;
		currStartYardLine = (6*currYardLine)+88;
		if(poss == 'home'){
			newStartYardLine = (6*yards) + currStartYardLine;
			context.moveTo(currStartYardLine,latLoc);
			context.lineTo((6*yards)+currStartYardLine,latLoc);
		}else if(poss == 'away'){
			newStartYardLine = (-6*yards) + currStartYardLine;
			context.moveTo(currStartYardLine,latLoc);
			context.lineTo((-6*yards)+currStartYardLine,latLoc);
		}
		context.stroke();
	};

	function drawPass(yards,poss){
		var canvas = $('#field')[0];
		var context = canvas.getContext('2d');
		var currStartYardLine = 0;
		var newStartYardLine = 0;
		context.beginPath();
		context.lineWidth = 10;
		currStartYardLine = (6*currYardLine)+88;
		if(poss == 'home'){
			newStartYardLine = (6*yards) + currStartYardLine;	
			context.moveTo(currStartYardLine,latLoc);
			context.bezierCurveTo(currStartYardLine,latLoc-20,currStartYardLine+(6*yards),latLoc-20,currStartYardLine+(6*yards),latLoc);
		}else if(poss == 'away'){
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
				$scope.team = Team2.players;
				alert('Turnover on Downs');
				firstDown()
				clearField();
				possessionCounter++;
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
				$scope.team = Team1.players;
				alert('Turnover on Downs');
				firstDown();
				clearField();
				possessionCounter++;
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
		$scope.currentYardLine = yardLine;
	}

	function lateralLocation(){
		var leftHash = 150;
		var rightHash = 230;
		if(latLoc === rightHash){
			moveUp = true;
		}else if(latLoc === leftHash){
			moveUp = false;
		}
		if(moveUp){
			latLoc -= 10;
		}else if(!moveUp){
			latLoc += 10;
		}
	};

	function bigBack(speed,strength,energy){
		var combinedChanceOfGain = (speed*mod + strength*mod + energy*mod)*Math.random();
		if(combinedChanceOfGain > 90){
			yards = rollDice(10,10);
		}else if(combinedChanceOfGain > 80){
			yards = rollDice(6,6);
		}else if(combinedChanceOfGain > 50){
			yards = rollDice(4,4);
		}else if(combinedChanceOfGain > 20){
			yards = rollDice(2,2);
		}else{
			yards = -rollDice(1,2);
		}
		yards = -40;
		return yards;
	};
	function medBack(speed,strength,energy){
		var combinedChanceOfGain = (speed*mod + strength*mod + energy*mod)*Math.random();
		if(combinedChanceOfGain > 90){
			yards = rollDice(10,5);
		}else if(combinedChanceOfGain > 80){
			yards = rollDice(5,3);
		}else if(combinedChanceOfGain > 50){
			yards = rollDice(2,3);
		}else if(combinedChanceOfGain > 20){
			yards = rollDice(1,3);
		}else{
			yards = -rollDice(1,3);
		}
		return yards;
	};
	function smallBack(speed,strength,energy){
		var combinedChanceOfGain = (speed*mod + strength*mod + energy*mod)*Math.random();
		if(combinedChanceOfGain > 90){
			yards = rollDice(7,5);
		}else if(combinedChanceOfGain > 80){
			yards = rollDice(4,3);
		}else if(combinedChanceOfGain > 50){
			yards = rollDice(3,3);
		}else if(combinedChanceOfGain > 20){
			yards = rollDice(1,2);
		}else{
			yards = -rollDice(1,5);
		}
		return yards;
	};
	function bigReceiver(speed,strength,energy){
		var combinedChanceOfGain = (speed*mod + strength*mod + energy*mod)*Math.random();
		if(combinedChanceOfGain > 90){
			yards = rollDice(10,10);
		}else if(combinedChanceOfGain > 80){
			yards = rollDice(6,6);
		}else if(combinedChanceOfGain > 45){
			yards = rollDice(4,4);
		}else if(combinedChanceOfGain > 25){
			yards = 0;
		}else{
			yards = -rollDice(1,1);
		}
		return yards;
	};
	function medReceiver(speed,strength,energy){
		var combinedChanceOfGain = (speed*mod + strength*mod + energy*mod)*Math.random();
		if(combinedChanceOfGain > 90){
			yards = rollDice(9,8);
		}else if(combinedChanceOfGain > 80){
			yards = rollDice(5,5);
		}else if(combinedChanceOfGain > 45){
			yards = rollDice(3,5);
		}else if(combinedChanceOfGain > 25){
			yards = 0;
		}else{
			yards = -rollDice(1,3);
		}
		return yards;
	};
	function smallReceiver(speed,strength,energy){
		var combinedChanceOfGain = (speed*mod + strength*mod + energy*mod)*Math.random();
		if(combinedChanceOfGain > 90){
			yards = rollDice(8,7);
		}else if(combinedChanceOfGain > 80){
			yards = rollDice(4,5);
		}else if(combinedChanceOfGain > 50){
			yards = rollDice(2,5);
		}else if(combinedChanceOfGain > 30){
			yards = 0;
		}else{
			yards = -rollDice(1,5);
		}
		return yards;
	};
	function rollDice(N,S){
		value = 0;
		for(i=0;i<N;i++){
			value+= Math.floor(Math.random()*S)+1;
		}
		return value
	};
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
	function checkTurnover(yards,poss,chanceOfTurnover,playType){
		if((poss === 'home')&&(chanceOfTurnover <= 0.03)&&(yards !== 0)){
			$('.button').attr('poss','away')
			if(currYardLine >= 100){
				currYardLine = 80;
			}
			firstDown();
			$scope.team = Team2.players;
			if(playType == 'run'){
				alert('Fumble!')
			}else if(playType == 'pass'){
				alert('Interception!')
			}
			clearField()
			possessionCounter++;
			return true;
		}else if((poss === 'away')&&(chanceOfTurnover <= 0.03)&&(yards !== 0)){
			$('.button').attr('poss','home')
			if(currYardLine <= 0 ){
				currYardLine = 20;
			}
			firstDown();
			$scope.team = Team1.players;
			if(playType == 'run'){
				alert('Fumble!')
			}else if(playType == 'pass'){
				alert('Interception!')
			}
			clearField();
			possessionCounter++;
			return true;
		}
	}

	function checkGameEnd(homeScore,awayScore){
		if(possessionCounter > 24){
			// Game Ends
			$('#field-wrapper').empty();
			
			if(homeScore > awayScore){
				console.log(homeScore,awayScore)
				var html = '<div id="win-message>'+Team1.name+' has won the game!</div>';
				alert("Game Over! "+Team1.name+ " has won the game.");
				$('#field-wrapper').append(html);
			}
			if(awayScore > homeScore){
				console.log(homeScore,awayScore)
				var html = '<div id="win-message>'+Team2.name+' has won the game!</div>';
				alert("Game Over! "+Team2.name+ " has won the game.");
				$('#field-wrapper').append(html);
			}
			if(awayScore == homeScore){
				console.log(homeScore,awayScore)
				var html = '<div id="win-message>The game ended in a tie!</div>';
				alert("The game ended in a tie!");
				$('#field-wrapper').append(html);
			}
		}
	}

}]);

