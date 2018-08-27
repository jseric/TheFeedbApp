// Import modules
const express       = require('express');
const mongoose      = require('mongoose');
const cookieSession = require('cookie-session');
const passport      = require('passport');

const keys = require('./config/keys.js');

// Note: DON'T change the order of the 2 below requires
// because of mongoose model flow
require('./models/User.js');
require('./services/passport.js');

// Connect to MongoDB using Mongoose
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// Create new express app
const app = express();

// Enable cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys:   [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Import and call authRoutes functions
require('./routes/authRoutes')(app);

// Set port to be dinamical or port 5000
// and listen on it
const PORT = process.env.PORT || 5000;
app.listen(PORT);
