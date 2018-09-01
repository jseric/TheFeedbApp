// Import modules
const express       = require('express');
const mongoose      = require('mongoose');
const cookieSession = require('cookie-session');
const passport      = require('passport');
const bodyParser    = require('body-parser');

const keys = require('./config/keys.js');

// Note: DON'T change the order of the 2 below requires
// because of mongoose model flow
require('./models/User.js');
require('./services/passport.js');

// Connect to MongoDB using Mongoose
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

// Create new express app
const app = express();

// Enable body parser middleware
app.use(bodyParser.json());

// Enable cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys:   [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Import routes
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// Production code
if (process.env.NODE_ENV === 'production') {
  // Serve production assets using Express
  app.use(express.static('client/build'));

  // Serve index.html using Express
  // if route is not recognised by Express
  const path = require('path');
  app.get(
    '*',
    (req, res) => {
      res.sendFile(
        path.resolve(__dirname, 'client',
                     'build', 'index.html')
      );
  });
}


// Set port to be dinamical or port 5000
// and listen on it
const PORT = process.env.PORT || 5000;
app.listen(PORT);
