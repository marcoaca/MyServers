var express = require('express');
var fs		= require('fs'); 		
var router 	= express.Router();
var bcrypt	= require('bcryptjs');

function authenticate(req, res, next) {
	if (!req.body) {
		return res.sendStatus(400);
	} else {
		if (req.body.username) {
			if (req.body.password) {
				if (users[req.body.username] === req.body.password) {
					next();
				} else {
					req.flash("error","Username and Password do not match!");
					res.render('/login', { csrfToken : req.csrfToken() });
				}
			}
		}
	}
};

var users = JSON.parse(fs.readFileSync(__dirname + "/../data/users.json", 'utf-8'));

function VerifyAndCreateUser(user){
	for (var int = 0; int < users.length; int++) {
		if (users[int].email === user.email){
			throw Error("O utilizador já existe!");
		}
	}
	var passwordHash = bcrypt.hashSync(user.password);
	users.push({
		id: users.length,
		email: user.email,
		password: passwordHash
	});
	fs.writeFileSync(__dirname + '/../data/users.json', JSON.stringify(users), 'utf-8');
};

router.get('*', function(req, res, next) {
	res.locals.loggedIn = (req.user) ? true : false;
	next();
});

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});
router.post('/createuser', function(req,res){
	var user = {
		email: req.body.email,
		password: req.body.password
	};
	console.log(user);
	VerifyAndCreateUser(user);
	res.redirect(200, '/');
});

router.get('/login', function(req, res) {
    res.render('login', { csrfToken : req.csrfToken() });
});

router.post('/login', function(req,res){
	res.render('/profile', {user:req.user});
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/createrestaurant', function(req,res) {
	try{
	console.log(req.body);
	var name = req.body.name ? req.body.name :'';
	var imageUrl = req.body.imageUrl ? req.body.imageUrl : '';
	var siteUrl = req.body.siteUrl ? req.body.siteUrl : '';
	var keywords = req.body.keywords ? req.body.keywords.split(',') : '';
	var images = req.body.images ? req.body.images : '';
	console.log(req.body);
	var jsonString = fs.readFileSync(__dirname + "/../data/restaurants.json", 'utf-8');
	var restaurants = JSON.parse(jsonString);
	console.log(jsonString);
	var new_restaurant = {
			"id" :  restaurants.length,
			"name" : name,
			"imageUrl" : imageUrl
	};
	var details = {
			keywords: keywords,
			images: images
	};
	var filename = "restaurant-" + restaurants.length + ".json"; 
	restaurants.push(new_restaurant);
	console.log(restaurants);
	fs.writeFileSync(__dirname + '/../data/restaurants.json', JSON.stringify(restaurants), 'utf-8');
	fs.writeFileSync(__dirname + "/../data/details/" + filename, JSON.stringify(details), 'utf-8');
	res.redirect('/');
	}
	catch(err){
		console.log(err);
		throw(err);
	}
});

router.get('/restaurants', function(req,res){
	var file = fs.readFileSync(__dirname + "/../data/restaurants.json", 'utf-8');
    res.send(JSON.parse(file));
});

module.exports = router;

