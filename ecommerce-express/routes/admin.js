const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Admin layout routes
router.get('/', (req, res) => res.redirect('/admin/products'));

router.get('/products', productController.adminList);
router.get('/products/add', productController.renderAdd);
router.post('/products', productController.createProduct);
router.get('/products/:id/edit', productController.renderEdit);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
