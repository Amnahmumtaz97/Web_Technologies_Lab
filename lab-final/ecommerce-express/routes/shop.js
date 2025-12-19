const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const checkCartNotEmpty = require('../middleware/checkCartNotEmpty');

router.get('/', (req, res) => res.redirect('/products'));
router.get('/project', (req, res) => res.render('index', { title: 'Main Page' }));
router.get('/checkout', checkCartNotEmpty, require('../controllers/orderController').showCheckout);
router.post('/checkout', checkCartNotEmpty, require('../controllers/orderController').createOrder);
router.get('/crud', (req, res) => res.render('crud', { title: 'CRUD Operations' }));
router.get('/products', productController.listProducts);
router.get('/products/:id', productController.showProduct);
// Route: Add to cart
// Adds a product to the user's session cart, increasing quantity if already present.
router.post('/cart/add', cartController.addToCart);

module.exports = router;
