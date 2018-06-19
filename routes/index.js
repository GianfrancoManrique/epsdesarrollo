var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require("passport");

var estaAutenticado = function (req, res, next) {
  if (req.isAuthenticated()) return next();
   res.redirect('/');
}

router.post('/loguear', 

		passport.authenticate('local', 
			{ successRedirect: '/principal',
			  failureRedirect: '/' 
			}
));

router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
  	res.render("principal", req.user);
  } else {
  	res.render('index');	
  }
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
})

module.exports = router;
