const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Password hashing library

exports.renderRegister = (req, res) => {
  res.render('auth/register', { title: 'Register' });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hash, role });
    await user.save();// database me save karna
    req.flash('success', 'Registration successful! Please log in.');
    res.redirect('/login'); //Session banne ke baad user login rehta hai jab tak logout na kare.
  }
   catch (err) {
    console.error(err);
    req.flash('error', 'Registration failed');
    res.redirect('/register');
  }
};

exports.renderLogin = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      req.flash('error', 'Invalid credentials');
      return res.redirect('/login');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      req.flash('error', 'Invalid credentials');
      return res.redirect('/login');
    }
    req.session.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };
    req.flash('success', 'Login successful!');
    if (user.role === 'admin') {
      res.redirect('/layouts/admin');
    } else {
      res.redirect('/products');
    }
  } catch (err) {
    console.error(err);
    req.flash('error', 'Login failed');
    res.redirect('/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => { //Session destroy hone se user completely logout ho jata hai.
    req.flash('success', 'Logged out successfully.');
    res.redirect('/login');
  });
};
