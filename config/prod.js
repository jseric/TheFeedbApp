module.exports = {
  // Google OAuth Keys
  googleClientID:     process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,

  // mLab MongoDB URI
  mongoURI: process.env.MONGO_URI,

  // Cookie Key
  cookieKey: process.env.COOKIE_KEY,

  // Stripe Keys
  stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey:      process.env.STRIPE_SECRET_KEY
};
