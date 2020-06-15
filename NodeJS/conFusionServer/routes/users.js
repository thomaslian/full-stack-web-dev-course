var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function (req, res, next) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      // If username already exists
      if (user != null) {
        var err = new Error('User ' + req.body.username + ' already exists!');
        err.status = 403;
        next(err);
      }
      // Username does not exist
      else {
        return User.create({
          username: req.body.username,
          password: req.body.password
        })
      }
    })
    // Show statuscode
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ status: 'Registration successful!', user: user });
    }, (err) => next(err))
    .catch((err) => next(err));
});

router.post('/login', (req, res, next) => {
  // Check if the signed cookie does not contain the user property (user not logged in)
  if (!req.session.user) {
    var authHeader = req.headers.authorization;

    // Check if the authorization header is not avilable
    if (!authHeader) {
      var err = new Error('You are not authenticated!');

      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      // Reject access and make the user enter the username and password
      return next(err);
    }

    // Splits the base64 from the string and stores it in auth
    // Split it again to get the username and password. 
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');

    var username = auth[0];
    var password = auth[1];

    User.findOne({ username: username })
      .then((user) => {
        // If username does not exist
        if (user === null) {
          var err = new Error('User ' + username + ' does not exist!');
          err.status = 403;
          return next(err);
        }
        // If password is wrong
        else if (user.password !== password) {
          var err = new Error('Your password is incorrect!');
          err.status = 403;
          return next(err);
        }
        // Check if username and password is correct
        else if (username === username && user.password === password) {
          // Setup the cookie/session
          req.session.user = 'authenticated';
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('You are authenticated!')
        }
      })
      .catch((err) => next(err));
  }
  // User is already logged in
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('You are already authenticated!');
  }
});

router.get('/logout', (req, res) => {
  // Check if the user is logged in
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  // User is not logged in
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
