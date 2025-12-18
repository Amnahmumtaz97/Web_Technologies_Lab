const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.renderRegister = (req, res) => {
  res.render('auth/register', { title: 'Register' });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hash });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(400).send('Registration failed');
  }
};

exports.renderLogin = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid credentials');
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send('Invalid credentials');
    // Set session or cookie here
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(400).send('Login failed');
  }
};

exports.logout = (req, res) => {
  // Destroy session or clear cookie here
  res.redirect('/login');
};
