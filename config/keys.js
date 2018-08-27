// Choose between development and production keys
if (process.env.NODE_ENV == 'production') {
  // Production
  // Export production keys from prod.js file
  module.export = require('./prod.js');
}
else {
  // Development
  // Export development keys from dev.js file
  module.exports = require('./dev.js');
}
