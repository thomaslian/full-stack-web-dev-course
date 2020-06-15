var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

// Verify the user with the username and password that passport will extract from the incoming request
exports.local = passport.use(new LocalStrategy(User.authenticate()));
// User information will be serialized and deserialized
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());