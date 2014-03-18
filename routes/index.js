var models = require('../models/index.js');
var passport = require('passport');
var crawl = require('../crawler.js');
var flash = require('connect-flash');
var io = require('socket.io');
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
  models.Fight.find({
    "fighter1": req.body.gf1_name,
    "fighter2": req.body.gf2_name
  },
  function(err, data){
    res.render('index', {
      title: 'Express',
      user: req.user,
      headline: fightArray,
      "fighter1": req.body.gf1_name,
      "fighter2": req.body.gf2_name
    });
  });
}

exports.submit_scores = function(req, res){

  var scored_fight = new models.Fight({
    "f1": req.body.f1,
    "f2": req.body.f2,
    "f1_roundScores": req.body.f1_roundScores,
    "f2_roundScores": req.body.f2_roundScores,
    "f1_score": req.body.f1_score,
    "f2_score": req.body.f2_score,
    "user_email": req.body.user_email
  });


  models.Fight.find({
    "f1": scored_fight.f1,
    "f2": scored_fight.f2,
    "f1_score": scored_fight.f1_score,
    "f2_score": scored_fight.f2_score,
    "user_email": scored_fight.user_email
  }, function(err, fightCard){
    console.log(fightCard)
    if (fightCard.length === 0){
      scored_fight.save();
      // res.send("Scores submitted!");
    }
    else if (fightCard[0].f1 === scored_fight.f1 && fightCard[0].f2 === scored_fight.f2 && fightCard[0].user_email === scored_fight.user_email) {
      res.send(200);
      console.log("Fightcard already judged.");
    }
  })

  // models.Fight.find({"f1": scored_fight.f1, "f2": scored_fight.f2}, function(err, fight){
  //   fight.length;
  // });
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

