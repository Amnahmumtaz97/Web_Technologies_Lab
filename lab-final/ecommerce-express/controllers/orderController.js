const Order = require('../models/Order');
const Product = require('../models/Product');

exports.showCheckout = (req, res) => {
  const cart = req.session.cart || [];
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });
  res.render('checkout', { cart, total, title: 'Checkout' });
};

exports.createOrder = async (req, res) => {
  const { customerName, email } = req.body;
  // Validate checkout form inputs (server-side)
  if (!customerName || customerName.length < 3 || !email || !email.includes('@')) {
    return res.status(400).send('Invalid name or email');
  }
  const cart = req.session.cart || [];
  if (!cart.length) {
    return res.redirect('/cart');
  }
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });
  try {
    const order = new Order({
      customerName,
      email,
      cartItems: cart.map(item => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: total,
      status: 'Pending'
    });
    await order.save();
    req.session.cart = [];
    res.redirect(`/order/confirmation/${order._id}`);
  } catch (err) {
    res.status(500).send('Error creating order');
  }
};

exports.showConfirmation = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('Order not found');
    res.render('orderConfirmation', { order, title: 'Order Confirmation' });
  } catch (err) {
    res.status(500).send('Error loading confirmation');
  }
};
