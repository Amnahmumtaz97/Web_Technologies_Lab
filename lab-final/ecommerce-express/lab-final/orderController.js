const Order = require('./Order');
const Product = require('../../models/Product');

exports.showCheckout = (req, res) => {
  const cart = req.session.cart || [];
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
  });
  res.render('lab-final/checkout', { cart, total });
};

exports.createOrder = async (req, res) => {
  const { customerName, email } = req.body;
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
    res.redirect(`/lab-final/order/confirmation/${order._id}`);
  } catch (err) {
    res.status(500).send('Error creating order');
  }
};

exports.showConfirmation = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).send('Order not found');
    res.render('lab-final/orderConfirmation', { order });
  } catch (err) {
    res.status(500).send('Error loading confirmation');
  }
};
