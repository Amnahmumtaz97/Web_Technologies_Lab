const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send('Product not found');
    const cart = req.session.cart || [];
    // Prevent duplicate products in cart
    const existing = cart.find(item => item._id.toString() === productId);
    if (existing) {
      existing.quantity += parseInt(quantity);
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        quantity: parseInt(quantity)
      });
    }
    // Recalculate cart total on server
    req.session.cart = cart;
    res.redirect('/checkout');
  } catch (err) {
    res.status(500).send('Error adding to cart');
  }
};
