// Middleware: Prevents access to checkout if cart is empty
module.exports = (req, res, next) => {
  if (!req.session.cart || req.session.cart.length === 0) {
    return res.redirect('/products');
  }
  next();
};
