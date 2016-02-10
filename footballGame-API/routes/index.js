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
	if(req.body.password === req.body.confirmPassword){
		Account.register(new Account({ username : req.body.username, favoriteTeam: req.body.favoriteTeam}), req.body.password, function (err, account){
			if(err){
				return res.json({status:'failure'})
			}
			passport.authenticate('local')(req, res, function(){
				return res.json({status: 'success', favTeam : req.body.favoriteTeam})
			})
		})
	}else if(req.body.password !== req.body.confirmPassword){
		res.json({status: "Passwords do not match"})		
	}
})


router.post('/login', function (req, res, next){
	passport.authenticate('local', function (err, user, info){
		if(err){
			return next(err)
		}
		if(!user){
			return res.json({status: 'failure'})
		}
		if(user){
			console.log(user)
			Team.findOne({name: user.favTeam}, function (err, doc){
				return res.json({status:'success',username:user.username,favTeam: doc})
			})
		}
	})
})

module.exports = router;
