const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const adminController = require('../controllers/adminController');
const multer = require('multer');
const path = require('path');
const adminOnly = require('../middleware/adminOnly');

// Multer config for image upload
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../public/uploads'));
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		cb(null, uniqueSuffix + path.extname(file.originalname));
	}
});
const upload = multer({ storage });



// Admin layout routes
router.get('/', (req, res) => res.redirect('/admin/products'));

router.get('/products', productController.adminList);
router.get('/products/add', productController.renderAdd);
router.post('/products', upload.single('image'), productController.createProduct);
router.get('/products/:id/edit', productController.renderEdit);
router.put('/products/:id', upload.single('image'), productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Admin orders dashboard routes
router.get('/orders', adminOnly, adminController.listOrders);
router.post('/orders/:id/confirm', adminOnly, adminController.confirmOrder);
router.post('/orders/:id/cancel', adminOnly, adminController.cancelOrder);

module.exports = router;
