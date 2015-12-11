var currYardLine = 20;
var currDown = 1;
var yardsToGo = 10;
var firstDownMarker = currYardLine + yardsToGo;
var latLoc = 190;
var moveRight = false;
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

function Player (name, position, speed, strength, id, playType){
	this.name = name;
	this.position = position;
	this.speed = speed;
	this.strength = strength;
	this.id = id;
	this.playType = playType;
}

function Team (name, players, logo, symbol){
	this.name = name;
	this.players = players;
	this.logo = logo;
	this.symbol = symbol;
}
Player.prototype.energy = 100;
var teams = [];
var AuburnPlayers = [];
var GeorgiaPlayers = [];
var AlabamaPlayers = [];
var LSUPlayers = [];
var ArkansasPlayers = [];
var OleMissPlayers = [];
var MissStatePlayers = [];
var TexasAMPlayers = [];
var FloridaPlayers = [];
var SouthCarolinaPlayers = [];
var VanderbiltPlayers = [];
var MizzouPlayers = [];
var KentuckyPlayers = [];
var TennesseePlayers = [];

// Auburn
AuburnPlayers.push(new Player('Jovon Robinson','running back',95,89,'big-back','run'));
AuburnPlayers.push(new Player('Peyton Barber','running back',90,95,'med-back','run'));
AuburnPlayers.push(new Player('Kerryon Johnson','running back',90,85,'small-back','run'));
AuburnPlayers.push(new Player('Ricardo Louis','receiver',90,85,'big-receiver','pass'));
AuburnPlayers.push(new Player('Jason Smith','receiver',85,85,'med-receiver','pass'));
AuburnPlayers.push(new Player('Tony Stevens','receiver',85,95,'small-receiver','pass'));
// Georgia
GeorgiaPlayers.push(new Player('Nick Chubb','running back',95,90,'big-back','run'));
GeorgiaPlayers.push(new Player('Sony Michel','running back',93,85,'med-back','run'));
GeorgiaPlayers.push(new Player('Keith Marshall','running back',85,85,'small-back','run'));
GeorgiaPlayers.push(new Player('Malcolm Mitchell','receiver',85,85,'big-receiver','pass'));
GeorgiaPlayers.push(new Player('Justin Scott-Wesley','receiver',80,90,'med-receiver','pass'));
GeorgiaPlayers.push(new Player('Terry Godwin','receiver',90,80,'small-receiver','pass'));
// Alabama
AlabamaPlayers.push(new Player('Derrick Henry','running back',95,90,'big-back','run'));
AlabamaPlayers.push(new Player('Kenyan Drake','running back',95,80,'med-back','run'));
AlabamaPlayers.push(new Player('Bo Scarbrough','running back',90,80,'small-back','run'));
AlabamaPlayers.push(new Player('Ardarius Stewart','receiver',90,90,'big-receiver','pass'));
AlabamaPlayers.push(new Player('Calvin Ridley','receiver',90,85,'med-receiver','pass'));
AlabamaPlayers.push(new Player('Richard Mullaney','receiver',80,90,'small-receiver','pass'));
// LSU
LSUPlayers.push(new Player('Leonard Fournette','running back',95,90,'big-back','run'));
LSUPlayers.push(new Player('Darrell Williams','running back',95,80,'med-back','run'));
LSUPlayers.push(new Player('Derrius Guice','running back',90,80,'small-back','run'));
LSUPlayers.push(new Player('Travin Dural','receiver',90,90,'big-receiver','pass'));
LSUPlayers.push(new Player('Malachi Dupre','receiver',90,85,'med-receiver','pass'));
LSUPlayers.push(new Player('John Diarse','receiver',80,90,'small-receiver','pass'));
// Arkansas
ArkansasPlayers.push(new Player('Alex Collins','running back',95,90,'big-back','run'));
ArkansasPlayers.push(new Player('Kody Walker','running back',95,80,'med-back','run'));
ArkansasPlayers.push(new Player('Johnathan Williams','running back',90,80,'small-back','run'));
ArkansasPlayers.push(new Player('Jared Cornelius','receiver',90,90,'big-receiver','pass'));
ArkansasPlayers.push(new Player('Drew Morgan','receiver',90,85,'med-receiver','pass'));
ArkansasPlayers.push(new Player('Hunter Henry','receiver',80,90,'small-receiver','pass'));
// Ole Miss
OleMissPlayers.push(new Player('Jaylen Walton','running back',95,90,'big-back','run'));
OleMissPlayers.push(new Player('Jordan Wilkins','running back',95,80,'med-back','run'));
OleMissPlayers.push(new Player('Akeem Judd','running back',90,80,'small-back','run'));
OleMissPlayers.push(new Player('Laquon Treadwell','receiver',90,90,'big-receiver','pass'));
OleMissPlayers.push(new Player('Cody Core','receiver',90,85,'med-receiver','pass'));
OleMissPlayers.push(new Player('Evan Engram','receiver',80,90,'small-receiver','pass'));
// Miss State
MissStatePlayers.push(new Player('Brandon Holloway','running back',95,90,'big-back','run'));
MissStatePlayers.push(new Player('Ashton Shumpert','running back',95,80,'med-back','run'));
MissStatePlayers.push(new Player('Aeris Williams','running back',90,80,'small-back','run'));
MissStatePlayers.push(new Player("De'Runnya Wilson",'receiver',90,90,'big-receiver','pass'));
MissStatePlayers.push(new Player('Joe Morrow','receiver',90,85,'med-receiver','pass'));
MissStatePlayers.push(new Player('Fred Ross','receiver',80,90,'small-receiver','pass'));
// Texas A&M
TexasAMPlayers.push(new Player('Tra Carson','running back',95,90,'big-back','run'));
TexasAMPlayers.push(new Player('James White','running back',95,80,'med-back','run'));
TexasAMPlayers.push(new Player('Kyler Murray','running back',90,80,'small-back','run'));
TexasAMPlayers.push(new Player('Josh Reynolds','receiver',90,90,'big-receiver','pass'));
TexasAMPlayers.push(new Player('Speedy Noil','receiver',90,85,'med-receiver','pass'));
TexasAMPlayers.push(new Player('Christian Kirk','receiver',80,90,'small-receiver','pass'));
// Florida
FloridaPlayers.push(new Player('Kelvin Taylor','running back',95,90,'big-back','run'));
FloridaPlayers.push(new Player('Jordan Cronkrite','running back',95,80,'med-back','run'));
FloridaPlayers.push(new Player('Jordan Scarlett','running back',90,80,'small-back','run'));
FloridaPlayers.push(new Player('Demarcus Robinson','receiver',90,90,'big-receiver','pass'));
FloridaPlayers.push(new Player('Antonio Callaway','receiver',90,85,'med-receiver','pass'));
FloridaPlayers.push(new Player('Brandon Powell','receiver',80,90,'small-receiver','pass'));
// South Carolina
SouthCarolinaPlayers.push(new Player('Brandon Wilds','running back',95,90,'big-back','run'));
SouthCarolinaPlayers.push(new Player('David Williams','running back',95,80,'med-back','run'));
SouthCarolinaPlayers.push(new Player('Shon Carson','running back',90,80,'small-back','run'));
SouthCarolinaPlayers.push(new Player('Pharoh Cooper','receiver',90,90,'big-receiver','pass'));
SouthCarolinaPlayers.push(new Player('Deebo Samuel','receiver',90,85,'med-receiver','pass'));
SouthCarolinaPlayers.push(new Player('Terry Googer','receiver',80,90,'small-receiver','pass'));
// Vanderbilt
VanderbiltPlayers.push(new Player('Ralph Webb','running back',95,90,'big-back','run'));
VanderbiltPlayers.push(new Player('Dallas Rivers','running back',95,80,'med-back','run'));
VanderbiltPlayers.push(new Player('Josh Crawford','running back',90,80,'small-back','run'));
VanderbiltPlayers.push(new Player('Trent Sherfield','receiver',90,90,'big-receiver','pass'));
VanderbiltPlayers.push(new Player('Caleb Scott','receiver',90,85,'med-receiver','pass'));
VanderbiltPlayers.push(new Player('Steven Scheu','receiver',80,90,'small-receiver','pass'));
// Mizzou
MizzouPlayers.push(new Player('Russell Hansbrough','running back',95,90,'big-back','run'));
MizzouPlayers.push(new Player('Ish Witter','running back',95,80,'med-back','run'));
MizzouPlayers.push(new Player('Morgan Steward','running back',90,80,'small-back','run'));
MizzouPlayers.push(new Player('Wesley Leftwich','receiver',90,90,'big-receiver','pass'));
MizzouPlayers.push(new Player('Nate Brown','receiver',90,85,'med-receiver','pass'));
MizzouPlayers.push(new Player('Emanuel Hall','receiver',80,90,'small-receiver','pass'));
// Kentucky
KentuckyPlayers.push(new Player('Boom Williams','running back',95,90,'big-back','run'));
KentuckyPlayers.push(new Player('Jojo Kemp','running back',95,80,'med-back','run'));
KentuckyPlayers.push(new Player('Mikel Horton','running back',90,80,'small-back','run'));
KentuckyPlayers.push(new Player('Jeff Badet','receiver',90,90,'big-receiver','pass'));
KentuckyPlayers.push(new Player('Dorian Baker','receiver',90,85,'med-receiver','pass'));
KentuckyPlayers.push(new Player('Garrett Johnson','receiver',80,90,'small-receiver','pass'));
// Tennessee
TennesseePlayers.push(new Player('Jalen Hurd','running back',95,90,'big-back','run'));
TennesseePlayers.push(new Player('Alvin Kamara','running back',95,80,'med-back','run'));
TennesseePlayers.push(new Player('Josh Dobbs','running back',90,80,'small-back','run'));
TennesseePlayers.push(new Player('Josh Smith','receiver',90,90,'big-receiver','pass'));
TennesseePlayers.push(new Player('Von Pearson','receiver',90,85,'med-receiver','pass'));
TennesseePlayers.push(new Player('Josh Malone','receiver',80,90,'small-receiver','pass'));
// Team Array Assembly
teams.push(new Team('Alabama',AlabamaPlayers,'media/Alabama\ Logo.png','AL'));
teams.push(new Team('Arkansas',ArkansasPlayers,'media/arkansasLogo.png','AR'));
teams.push(new Team('Auburn',AuburnPlayers,'media/Auburn\ Logo.png','AU'));
teams.push(new Team('Florida',FloridaPlayers,'media/FloridaLogo.png','UF'));
teams.push(new Team('Georgia',GeorgiaPlayers,'media/Georgia\ Logo.png','UGA'));
teams.push(new Team('Kentucky',KentuckyPlayers,'media/kentuckyLogo.png','UK'));
teams.push(new Team('LSU',LSUPlayers,'media/LSULogo.png','LSU'));
teams.push(new Team('Ole Miss',OleMissPlayers,'media/oleMissLogo.png','MISS'));
teams.push(new Team('Miss State',MissStatePlayers,'media/MissStateLogo.png','MSST'));
teams.push(new Team('Mizzou',MizzouPlayers,'media/mizzouLogo.png','MZ'));
teams.push(new Team('S. Car',SouthCarolinaPlayers,'media/SouthCarolinaLogo.png','SC'));
teams.push(new Team('Tenn',TennesseePlayers,'media/tennesseeLogo.png','UT'));
teams.push(new Team('Tex A&M',TexasAMPlayers,'media/TexasAMLogo.png','TAMU'));
teams.push(new Team('Vandy',VanderbiltPlayers,'media/vanderbiltLogo.png','VANDY'));



var footballApp = angular.module('footballApp',['ngRoute']);
footballApp.config(function ($routeProvider){
	$routeProvider.when('/',{
		templateUrl: 'pages/selectSides.html',
		controller: 'setupController'
	}).
	when('/:firstParam',{
		templateUrl: 'pages/coinflip.html',
		controller: 'coinFlipController'
	}).
	when('/:firstParam/:secondParam',{
		templateUrl: 'pages/field.html',
		controller: 'gameController'
	}).
	otherwise({
		redirectTo: '/'
	});
});

footballApp.directive('homeClick', function(){
	var lastElement;
	var clicks = 0;
	return{
		link: function ($scope, element){
			element.bind('click',function(){
				if(clicks > 0){
					lastElement.css('background-color','#000080');
					selectedTeams.splice(selectedTeams.indexOf(lastElement),1)
				}
				clicks++;
				Team1 = $scope.team;
				$scope.team.players.team = 'home';
				$(this).css('background-color','white');
				$(this).css('border-radius','10px');
				lastElement = $(this);
				selectedTeams.push($(this))
			})
		}
	}
})
footballApp.directive('awayClick', function(){
	var lastElement;
	var clicks = 0;
	return{
		link: function ($scope, element){
			element.bind('click',function(){
				if(clicks > 0){
					lastElement.css('background-color','#000080');
					selectedTeams.splice(selectedTeams.indexOf(lastElement),1)
				}
				clicks++;
				Team2 = $scope.team;
				$scope.team.players.team = 'away';
				$(this).css('background-color','white');
				$(this).css('border-radius','10px');
				lastElement = $(this);
				selectedTeams.push($(this))
			})
		}
	}
})


footballApp.controller('setupController', function ($scope){
	$scope.teams = teams;


	// $scope.checkSelectedTeams = function(){
	// 	if(selectedTeams.length > 1){
	// 		return  true;
	// 	}else{
	// 		return  false;
	// 	}
	// }

})

footballApp.controller('coinFlipController',function ($scope, $routeParams){
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
			window.location.href = '#/game/field';
		},(1+num*0.2)*1000);

	}
});
footballApp.controller('gameController', function ($scope){
		clearField();
		$scope.team = startingTeam;
		$scope.homeTeam = Team1.name;
		$scope.awayTeam = Team2.name;
	$scope.makePlay = function(){	
		var who = $(this)[0].player.id;
		var poss = this.$parent.team.team;
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
		};
		$(this)[0].player.energy = Math.floor($(this)[0].player.energy*((100 - (1.5*yards))/100));
		regenerateEnergy();
		if(type == 'run'){
			drawRun(yards,poss);
		}else if(type == 'pass'){
			drawPass(yards,poss);
		};	
		if(poss == 'home'){
			currYardLine += yards;
			setYardLine();
		}else if(poss == 'away'){
			currYardLine -= yards;
			setYardLine();
		};
		lateralLocation();
		updateDown(yards,poss);
		checkTouchdown(currYardLine);
			
	};
	function regenerateEnergy(){
		$.each(Team1.players,function(){
			this.energy += Math.round((100-this.energy)*0.05);
			if(this.energy > 100){
				this.energy = 100;
			}
		})
		$.each(Team2.players,function(){
			this.energy += Math.round((100-this.energy)*0.05);
			if(this.energy > 100){
				this.energy = 100;
			}
		})
	}
	function checkTouchdown(position){
		if(position >= 100){
			homeScore = Number(homeScore) + 7;
			if((homeScore < 10)&&(!homeAppended)){
				homeScore = '0' + homeScore;
				homeAppended = true;
			};
			alert('Touchdown!');
			currYardLine = 80;
			$scope.team = Team2.players;
			firstDownMarker = currYardLine - 10;
			clearField();
			firstDown();
		}else if(position <= 0){
			alert('away team scored');
			awayScore = Number(awayScore) + 7;
			if((awayScore < 10)&&(!awayAppended)){
				awayScore = '0'+awayScore;
				awayAppended = true;
			};
			currYardLine = 20;
			$scope.team = Team1.players;
			firstDownMarker = currYardLine + 10;
			clearField();
			firstDown();
		};
		$scope.homeScore = homeScore;
		$scope.awayScore = awayScore;
	};
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
		console.log(yardLine)
		$scope.currentYardLine = yardLine;
	}

	function lateralLocation(){
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
	};

	function bigBack(speed,strength){
		yards = 10;
		return yards;
	};
	function medBack(speed,strength){
		yards = 7;
		return yards;
	};
	function smallBack(speed,strength){
		yards = 3;
		return yards;
	};
	function bigReceiver(speed,strength){
		yards = 10;
		return yards;
	};
	function medReceiver(speed,strength){
		yards = 5;
		return yards;
	};
	function smallReceiver(speed,strength){
		yards = 0;
		return yards;
	};
});

