// Import modules
const passport       = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose       = require('mongoose');

const keys = require('../config/keys.js');
const User = mongoose.model('users');


// Create unique ID for user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieve user data from ID
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  });
});

// Register new Google OAuth strategy
passport.use(
  new GoogleStrategy({
    clientID:     keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy:       true
  },
  async (accessToken, refreshToken, profile, done) => {
    // Check if user exists in DB
    const existingUser = await User.findOne({
      googleId: profile.id
    });

    if (existingUser) {
      // User exists
      return done(null, existingUser);
    }

    // User doesn't exist
    // Create new user object (in MongoDB)
    const user = await new User({
      googleId: profile.id
    }).save();

    done(null, user);
  })
);
