// Import modules
const passport = require('passport');

// Export routes
module.exports = app => {
  // Route handler for Google OAuth
  // Path: /auth/google
  // Type: GET
  app.get(
    '/auth/google',
    // Authenticate user through GoogleStrategy
    passport.authenticate('google', {
      // Profile objects access request
      scope: ['profile', 'email']
    })
  );

  // Route handler for Google OAuth callback
  // Path: /auth/google/callback
  // Type: GET
  app.get(
    '/auth/google/callback',
    // Get user profile from Google
    passport.authenticate('google'),
    (req, res) => {
      // Redirect to /surveys
      res.redirect('/surveys');
    }
  );

  // Route handler for logging out
  // Path: /api/logout
  // Type: GET
  app.get(
    '/api/logout',
    (req, res) => {
      req.logout();
      res.redirect('/');
    }
  );

  // Route handler for checking current user data
  // Path: /api/current_user
  // Type: GET
  app.get(
    '/api/current_user',
    (req, res) => {
      res.send(req.user);
    }
  );
};
