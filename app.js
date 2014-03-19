/** Module dependencies. */
var flash = require('connect-flash');
var express = require('express');

var cheerio = require('cheerio');
var async = require('async');
var request = require('request');
var routes = require('./routes');
var user = require('./routes/user');
var swig = require('swig');
var http = require('http');
var path = require('path');
var passport = require('passport');
var passportExport = require('./passport');
var MongoStore = require('connect-mongo')(express);
var models = require('./models/index');

var crawl = require('./crawler.js');

passportExport(passport);

var app = express();
app.engine('html', swig.renderFile)

//socket.io
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());

app.use(express.cookieParser()); //read cookies
app.use(express.bodyParser()); //get info from html forms
app.use(express.methodOverride());
app.use(express.session({ secret: 'keyboard cat' }));

app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
app.use(flash());
app.use(app.router); //use connect-flash for flash messages
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  swig.setDefaults({ cache: false });
  app.use(express.errorHandler());
}

/** ROUTES */
app.get('/', routes.index);
app.post('/submit', routes.submit_scores);
app.get('/signup', routes.signup_page);
app.post('/signedup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
  })
);
app.get('/login', routes.login);
app.post('/loggedin',
  passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));
    // { failureRedirect: '/login'} ), function(req, res) {res.render('index', {user: req.user, message: req.flash('loginMessage')})});
app.get('/logout', routes.logout);

/** End Routes **/

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


//socket.io shit for Group Scores
io.sockets.on('connection', function(socket){
  socket.on('send scores', function(data){
    models.UserScore.find({"f1": data.f1, "f2": data.f2}, function(err, mongooseData){
      io.sockets.emit('show scores', mongooseData);
    })
  })
})
