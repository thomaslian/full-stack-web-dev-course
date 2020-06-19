var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function (req, res, next) {
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    // If there is an error
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({ err: err });
    }
    // If there is no error
    else {
      // Ensure that the user registration was successfull
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, status: 'Registration successful!' });
      });
    }
  })
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
 
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, token: token, status: 'You are successfully logged in!' });
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
