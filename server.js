// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8000;
var mongoose = require('mongoose');
var flash    = require('connect-flash');
var passport = require('passport');
var configs = require('./config/configs.js');
var Service = require("./config/service.js");
mongoose.Promise = Promise

var configs = require('./config/configs.js');
var Service= new Service();

// configuration ===============================================================
mongoose.connect(configs.mongoose.url,{ useMongoClient: true }); // connect to our database

app.use(express.static(__dirname + '/public'));
app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({ secret: 'ilovescotchscotchyscotchscotch',
     cookie  : {  secure:false }})); // session secret
	app.use(passport.initialize());

	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

});
// routes ======================================================================
require('./config/routes.js')(app,Service ); 
app.listen(port);
console.log('The magic happens on port ' + port);
