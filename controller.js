function Player (name, position, speed, strength, team){
	this.name = name;
	this.position = position;
	this.speed = speed;
	this.strength = strength;
}
Player.prototype.energy = 100;

var Team1 = [];
var Team2 = [];
// Auburn
Team1.push(new Player('Jovon Robinson','running back',95,89,'home'));
Team1.push(new Player('Peyton Barber','running back',90,95,'home'));
Team1.push(new Player('Kerryon Johnson','running back',90,85,'home'));
Team1.push(new Player('Ricardo Louis','receiver',90,85,'home'));
Team1.push(new Player('Jason Smith','receiver',85,85,'home'));
Team1.push(new Player('Tony Stevens','receiver',85,95,'home'));
// Georgia
Team2.push(new Player('Nick Chubb','running back',95,90,'away'));
Team2.push(new Player('Sony Michel','running back',93,85,'away'));
Team2.push(new Player('Keith Marshall','running back',85,85,'away'));
Team2.push(new Player('Malcolm Mitchell','receiver',85,85,'away'));
Team2.push(new Player('Justin Scott-Wesley','receiver',80,90,'away'));
Team2.push(new Player('Terry Godwin','receiver',90,80,'away'));


angular.module('footballApp',[]).controller('footballController',function ($scope){

		$scope.team = Team1
		console.log($scope.team);		
	

	})
})