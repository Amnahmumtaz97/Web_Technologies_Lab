const Product = require('../models/Product');

// Helper to build filter query
function buildFilter(query) {
  const filter = {};
  if (query.category) filter.category = query.category;
  if (query.minPrice) filter.price = { ...filter.price, $gte: Number(query.minPrice) };
  if (query.maxPrice) filter.price = { ...filter.price, $lte: Number(query.maxPrice) };
  if (query.q) filter.name = { $regex: query.q, $options: 'i' };
  return filter;
}

exports.listProducts = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1'));
    const limit = Math.max(1, parseInt(req.query.limit || '10'));
    const filter = buildFilter(req.query);

    const total = await Product.countDocuments(filter);
    const pages = Math.ceil(total / limit);
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // categories for filter UI
    const categories = await Product.distinct('category');

    res.render('products/index', {
      title: 'Products',
      products,
      page,
      pages,
      total,
      limit,
      query: req.query,
      categories
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.showProduct = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id).lean();
    if (!p) return res.status(404).render('404', { title: 'Not found' });
    res.render('products/show', { title: p.name, product: p });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Admin controllers
exports.adminList = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    res.render('admin/products/list', { title: 'Admin - Products', products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.renderAdd = (req, res) => {
  res.render('admin/products/add', { title: 'Add Product' });
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    let imagePath = '/images/placeholder.png';
    if (req.file) {
      imagePath = '/uploads/' + req.file.filename;
    }
    const p = new Product({ name, price, category, image: imagePath, description });
    await p.save();
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.status(400).send('Bad request');
  }
};

exports.renderEdit = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id).lean();
    if (!p) return res.status(404).render('404', { title: 'Not found' });
    res.render('admin/products/edit', { title: 'Edit Product', product: p });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    let update = { name, price, category, description };
    if (req.file) {
      update.image = '/uploads/' + req.file.filename;
    } else if (req.body.image) {
      update.image = req.body.image;
    }
    await Product.findByIdAndUpdate(req.params.id, update);
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.status(400).send('Bad request');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
