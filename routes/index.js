var models = require('../models/index.js');
var passport = require('passport');
var crawl = require('../crawler.js');
var flash = require('connect-flash');

/*
 * GET home page.
 */

var fightArray = [];
// var fighterNames = [];
crawl.getAndCrawlLink(crawl.baseUrl, function(fightList) {
  fightArray = fightList;
  // fighterNames = fightArray.split("vs. ");
});

exports.index = function(req, res){
  console.log(req.user);
  res.render('index', { title: 'Express' , user: req.user, headline: fightArray});
};

exports.submit_scores = function(req, res){

  var scored_fight = new models.Fight({
    "f1": req.body.f1,
    "f2": req.body.f2,
    "f1_score": req.body.f1_score,
    "f2_score": req.body.f2_score,
    "user_email": req.body.user_email
  });
  scored_fight.save();
  res.send("Scores submitted!");
}

//New User
exports.signup_page = function(req, res){
  res.render('signup');
};

exports.login = function(req, res){
  res.render('login', {"user": req.user, message: req.flash('loginMessage') });
}

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
}




