// Middleware: Allows access only if user email is admin@shop.com
// This middleware checks the session for a user object and verifies the email.
// If the user is not admin, it sends a 403 Forbidden response.
module.exports = (req, res, next) => {
  if (req.session.user && req.session.user.email === 'admin@shop.com') {
    return next();
  }
  res.status(403).send('Access denied');
};
