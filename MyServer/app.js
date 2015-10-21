var express			= require('express');
var path			= require('path');
var favicon			= require('serve-favicon');
var logger			= require('morgan');
var cookieParser	= require('cookie-parser');
var bodyParser		= require('body-parser');
var compression		= require('compression');
var session			= require('express-session');
var csrf			= require('csurf');
var helmet			= require('helmet');
//var flash			= require('flash');
var routes			= require('./routes/index');
var users			= require('./routes/users');

var app				= express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view cache', true);
app.set('x-powered-by', false);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet.frameguard('deny'));
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.noCache());
app.use(helmet.xssFilter({ setOnOldIE: true }));
//app.use(cookieParser());
app.use(compression());

/*app.use(session({
	cookie: { secure: true, httpOnly: true, path: '/', maxAge: 60000 },
	secret: 'a vaca morreu',
	resave: false,
	saveUninitialized: true
}));

app.use(csrf({ 
	cookie: true,
	secure: true,
	httpOnly: true,
	path: '/',
	expire: 0
}));

app.use(function(req, res, next) {
	var token =  req.csrfToken();
	res.cookie('XSRF-TOKEN', token);
	res.locals.csrftoken = token;
	next();
});

app.use(flash());
*/

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/js', express.static(__dirname + '/public/js'));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
	  message: err.message,
	  error: err
	});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
	message: err.message,
	error: {}
  });
});


module.exports = app;
