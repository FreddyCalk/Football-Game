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

router.post('/register', function (req, res, next){
	Account.register(new Account({ username: req.body.username }), req.body.password, function (err, account) {
  	console.log(err)
    if (err) {
      return res.json({err: err.message});
    }
    passport.authenticate('local')(req, res, function () {
      return res.json({status: 'Registration successful!'});
    });
  });
})


router.get('/login', function (req, res, next){
	console.log(req.params)
	res.json({status: 'Login successful!'})
	// Account.find({})
})

module.exports = router;
