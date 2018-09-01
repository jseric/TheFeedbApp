// Import modules
const keys         = require('../config/keys.js');
const requireLogin = require('../middlewares/requireLogin.js');

const stripe = require('stripe')(keys.stripeSecretKey);

// Export routes
module.exports = app => {
  // Route handler for Stripe payments
  // Path: /api/stripe
  // Type: POST
  app.post(
    '/api/stripe',
    requireLogin,
    async (req, res) => {      
      // Charge the user
      const charge = await stripe.charges.create({
        amount:      500,
        currency:    'usd',
        description: '$5.00 for 5 survey credits',
        source:      req.body.id
      });

      // Add credits to user
      req.user.credits += 5;
      const user = await req.user.save();

      res.send(user);
    }
  );
}
