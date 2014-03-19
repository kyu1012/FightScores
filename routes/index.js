var models = require('../models/index.js');
var passport = require('passport');
var crawl = require('../crawler.js');
var flash = require('connect-flash');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
 // socket = io.connect();
/*
 * GET home page.
 */

var fightArray = [];
// var fighterNames = [];
crawl.getAndCrawlLink(crawl.baseUrl, function(fightList) {
  fightArray = fightList;
});


//Store fighter names in fightSchema, along with fightID


exports.index = function(req, res){
  models.UserScore.find({
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

  // var fightID = 0;
  for (var i = 0; i < fightArray.length; i++ ){
    var f1name = fightArray[i].split("vs.")[0];
    var f2name = fightArray[i].split("vs.")[1];
    var fights = new models.Fight({
      "f1": f1name,
      "f2": f2name
      // "id": fightID++
    }).save();
  }
}

exports.submit_scores = function(req, res){

  var scored_fight = new models.UserScore({
    "f1": req.body.f1,
    "f2": req.body.f2,
    "f1_roundScores": req.body.f1_roundScores,
    "f2_roundScores": req.body.f2_roundScores,
    "f1_score": req.body.f1_score,
    "f2_score": req.body.f2_score,
    "user_email": req.body.user_email
  });

  models.UserScore.find({
    "f1": scored_fight.f1,
    "f2": scored_fight.f2,
    "f1_score": scored_fight.f1_score,
    "f2_score": scored_fight.f2_score,
    "user_email": scored_fight.user_email
  }, function(err, data){
    if (data.length === 0){
      scored_fight.save(function(err, user_fight){
        if (err) {
          return "error";
        }
        else {
          models.UserScore.find({"f1": user_fight.f1, "f2": user_fight.f2}, function(err, allFightScores){
            console.log("from index-routes " +allFightScores);
            io.sockets.on('connection', function(socket) {
              socket.emit('show scores', allFightScores)
            })
            res.send(200);
          })
        }
      })
      //put a callback on the user_scored_fight data, also emit that data with the average scores;
      res.json(scored_fight);
    }
    else if (data[0].f1 === scored_fight.f1 && data[0].f2 === scored_fight.f2 && data[0].user_email === scored_fight.user_email) {
      res.json(200);
      console.log("data already judged.");
    }
  })
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

