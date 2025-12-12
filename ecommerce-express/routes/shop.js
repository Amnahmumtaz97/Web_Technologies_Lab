const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', (req, res) => res.redirect('/products'));
router.get('/project', (req, res) => res.render('index', { title: 'Main Page' }));
router.get('/checkout', (req, res) => res.render('checkout', { title: 'Checkout Page' }));
router.get('/crud', (req, res) => res.render('crud', { title: 'CRUD Operations' }));
router.get('/products', productController.listProducts);
router.get('/products/:id', productController.showProduct);

module.exports = router;
