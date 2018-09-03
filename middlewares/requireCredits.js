// Export middleware (method) to check
// if user has enough credits
module.exports = (req, res, next) => {
  // Check if user has enough credits
  if (req.user.credits < 1) {
    // Send back status 403 (Forbidden)
    return res.status(403).send({
      error: 'Not enough credits!'
    });
  }

  // Run next middleware
  next();
};
