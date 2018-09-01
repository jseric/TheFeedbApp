// Export middleware (method) to check if user is logged in
module.exports = (req, res, next) => {
  // Check if user is logged in
  if (!req.user) {
    // Send back status 401 (Unauthorized)
    return res.status(401).send({
      error: 'You must log in!'
    });
  }

  // Run next middleware
  next();
};
