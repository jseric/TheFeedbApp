// Import modules
const express = require('express');

// Create new express app
const app = express();

// Route handler to route '/'
app.get('/', (req, res) => {

  // Send back response to client
  res.send({
    hi: 'there'
  });
});

// Set port to be dinamical or port 5000
// and listen on it
const PORT = process.env.PORT || 5000;
app.listen(PORT);
