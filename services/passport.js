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
    callbackURL:  '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // Check if user exists in DB
    User.findOne({
      googleId: profile.id
    })
    .then(existingUser => {
      if (existingUser) {
        // User exists
        done(null, existingUser);
      }
      else {
        // User doesn't exist
        // Create new user object (in MongoDB)
        new User({
          googleId: profile.id
        })
        .save()
        .then(user => {
          done(null, user);
        });
      }
    })


  })
);
