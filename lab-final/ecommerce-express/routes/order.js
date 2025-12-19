const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/checkout', orderController.showCheckout);
router.post('/checkout', orderController.createOrder);
router.get('/order/confirmation/:id', orderController.showConfirmation);

module.exports = router;
