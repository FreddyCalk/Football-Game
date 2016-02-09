var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('../models/account.js');
var Team = require('../models/team.js');

/* GET home page. */
router.get('/', function (req,res,next){
	res.render('index',{title: 'Football API Home'})
})

router.get('/teams', function (req, res, next) {
	Team.find({}, function (err, doc, next){
		// console.log(doc);
  		res.json(doc);
	})
});

router.get('/edit', function (req, res, next){
	res.json({Success: "AWESOME"})
})

router.post('/signup', function (req, res, next){
	console.log(req.body)
	// if(req.body.username){
	// 	Account.register(new Account({ username : req.body.username}), req.body.password, function (err, account){
	// 		if(err){
	// 			return res.json({status:'failure'})
	// 		}
	// 		passport.authenticate('local')(req, res, function(){
	// 		})
	// 	})
	// }
	res.json({status: req.body})
})


router.post('/login', function (req, res, next){
	passport.authenticate('local', function (err, user, info){
		console.log(req.body)


		// Account.findOne({username: req.body.username}, function (err, user){
		// 	if(user){
		// 		res.json({status: 'success', username: user.username, favTeam: user.favTeam})
		// 	}
		// })
		res.json({status: 'success', username: req.body.username})
	})
})

module.exports = router;
