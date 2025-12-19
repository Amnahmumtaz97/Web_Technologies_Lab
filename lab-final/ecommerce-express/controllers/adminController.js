const Order = require('../models/Order');

// Route: List all orders for admin dashboard
exports.listOrders = async (req, res) => {
  try {
    const status = req.query.status;
    let orders;
    if (status) {
      orders = await Order.find({ status });
    } else {
      orders = await Order.find();
    }
    res.render('admin/orders', { orders, title: 'Admin Orders' });
  } catch (err) {
    res.status(500).send('Error loading orders');
  }
};

// Mark order as Confirmed
exports.confirmOrder = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { status: 'Confirmed' });
    res.redirect('/admin/orders');
  } catch (err) {
    res.status(500).send('Error updating order');
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, { status: 'Cancelled' });
    res.redirect('/admin/orders');
  } catch (err) {
    res.status(500).send('Error updating order');
  }
};
