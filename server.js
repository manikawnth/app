var port = process.env.PORT||8080;


var express = require('express');
var app = express();
app.use(express.static(__dirname + '/client'));



var cookieParser = require('cookie-parser');
app.use(cookieParser());


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


var session = require('express-session');
app.use(session({secret:'some secret'}));


var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());


var user = require('./user');
app.use('/user',user);


/* Passport.js documentation below: 

1. First define the strategy. 
  --------> You should always return a document (or whatever you need to pass) if successful

2. serializeUser will be called so that the returned doc in the above step is the argument to the function
  --------> done(null,doc1) method is invoked. the doc1 will be stored in the session data

3/ deserialize User will be called to deserlialize it


*/

var LocalStrategy = require('passport-local').Strategy;
var auth = require('./auth.js');
passport.use(new LocalStrategy(auth.localAuth));

passport.serializeUser(function(username, done) {
  done(null, username);
});

passport.deserializeUser(function(username, done) {
    done(username);
});



app.get('/',function(req,res){
  res.redirect('/login');
})

var options = {root:__dirname+'/client/'}
app.get('/login',function(req,res){
  res.sendFile('login.html',options);
})


app.post('/login', passport.authenticate('local', { successRedirect: '/user',
                                                    failureRedirect: '/login' }));




app.listen(port,function(){
	console.log("I'm listening on " + port);
});

