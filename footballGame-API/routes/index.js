var express = require('express');
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
	// if((req.body.password === req.body.passwordConfirm)&&(req.body.password.length >= 7)){
	// 	Account.register(new Account(
	// 			{username: req.body.username,
	// 			favTeam: req.body.favTeam}),
	// 			req.body.password,
	// 		function (err, account){
	// 			if(err){
	// 				return res.render('register', {err: "That username is already in use", passErr: false, username: "",
	// 					firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email })
	// 			}
	// 				passport.authenticate('local') (req, res, function (){
	// 					req.session.username = req.body.username;
	// 					res.redirect('/choices')
	// 			})
	// 		}
	// 	)
	// }else if(req.body.password !== req.body.passwordConfirm){
	// 	var message = 'Your Passwords did not match';
	// 	res.render('register', {err: false, passErr: message, username: req.body.username,
	// 					firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email });
	// }else if(req.body.password.length < 7){
	// 	var message = 'Your password must be at least 7 characters long';
	// 	res.render('register', {err: false, passErr: message, username: req.body.username,
	// 					firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email });
	// }
	console.log(req.body)
	res.json({status: 'success', favTeam: req.body.favTeam})
})


router.post('/login', function (req, res, next){
	console.log(req.body)
	res.json({status: 'success', favTeam: 'Auburn'})
	// Account.find({})
})

module.exports = router;
