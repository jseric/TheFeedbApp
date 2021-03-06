// Import modules
const express       = require('express');
const mongoose      = require('mongoose');
const cookieSession = require('cookie-session');
const passport      = require('passport');
const bodyParser    = require('body-parser');

const keys = require('./config/keys.js');

// Note: DON'T change the order of the below requires
// because of mongoose model flow
require('./models/User.js');
require('./models/Survey.js');
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
require('./routes/authRoutes.js')(app);
require('./routes/billingRoutes.js')(app);
require('./routes/surveyRoutes.js')(app);

// Production code
if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  // Serve production assets using Express
  app.use(express.static('client/build'));

  // Serve index.html using Express
  // if route is not recognised by Express
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
